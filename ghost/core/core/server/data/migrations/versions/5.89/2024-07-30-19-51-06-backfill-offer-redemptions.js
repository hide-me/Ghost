// For information on writing migrations, see https://www.notion.so/ghost/Database-migrations-eb5b78c435d741d2b34a582d57c24253

const logging = require('@tryghost/logging');
const {default: ObjectID} = require('bson-objectid');

// For DML - data changes
const {createTransactionalMigration} = require('../../utils');

module.exports = createTransactionalMigration(
    async function up(knex) {
        // Backfill missing offer redemptions
        try {
            // Select all subscriptions that have an `offer_id` but don't have a matching row in the `offer_redemptions` table
            logging.info('Selecting subscriptions with missing offer redemptions');
            const result = await knex.raw(`
                SELECT
                    mscs.id AS subscription_id,
                    mscs.offer_id,
                    mscs.start_date AS created_at,
                    m.id AS member_id
                FROM
                    members_stripe_customers_subscriptions mscs
                        JOIN 
                    members_stripe_customers msc ON mscs.customer_id = msc.customer_id
                        JOIN
                    members m ON msc.member_id = m.id
                        LEFT JOIN
                    offer_redemptions r ON r.subscription_id = mscs.id
                WHERE
                    mscs.offer_id IS NOT NULL and r.id IS NULL;
            `);
            // knex.raw() returns a different result depending on the database. We need to handle either case
            let rows = [];
            // CASE: MySQL returns an array with two elements: the first element is an array of rows, the second element is metadata
            if (result && result.length > 0 && Array.isArray(result[0])) {
                rows = result[0];
            // CASE: SQLite returns an array of rows
            } else if (result && result.length > 0 && Object.prototype.hasOwnProperty.call(result[0], 'subscription_id')) {
                rows = result;
            }
            if (rows && rows.length > 0) {
                logging.info(`Backfilling ${rows.length} offer redemptions`);
                // Generate IDs for each row
                const offerRedemptions = rows.map((row) => {
                    return {
                        id: new ObjectID().toHexString(),
                        ...row
                    };
                });
                // Batch insert rows into the offer_redemptions table
                await knex.batchInsert('offer_redemptions', offerRedemptions, 1000);
            } else {
                logging.info('No offer redemptions to backfill');
            }
        } catch (error) {
            logging.error(`Error backfilling offer redemptions: ${error.message}`);
        }
    },
    async function down() {
        // We don't want to un-backfill data, so do nothing here.
    }
);