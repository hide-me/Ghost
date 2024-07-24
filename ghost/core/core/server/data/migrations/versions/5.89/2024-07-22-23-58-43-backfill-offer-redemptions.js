// For information on writing migrations, see https://www.notion.so/ghost/Database-migrations-eb5b78c435d741d2b34a582d57c24253

const logging = require('@tryghost/logging');
const {default: ObjectID} = require('bson-objectid');

// For DML - data changes
const {createTransactionalMigration} = require('../../utils');

module.exports = createTransactionalMigration(
    async function up(knex) {
        // Backfill missing offer redemptions
        // Select all subscriptions that have an `offer_id` but don't have a matching row in the `offer_redemptions` table
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
        const rows = result[0];
        if (rows.length > 0) {
            // Generate IDs for each row
            const offerRedemptions = rows.map((row) => {
                return {
                    id: new ObjectID().toHexString(),
                    ...row
                };
            });
            // Bulk insert rows into the offer_redemptions table
            await knex('offer_redemptions').insert(offerRedemptions);
        }
    },
    async function down() {
        // We don't want to un-backfill data, so do nothing here.
        logging.warn('No rollback for migration');
    }
);