'use client';

import Component from '@glimmer/component';
import React from 'react';
import config from 'ghost-admin/config/environment';
import moment from 'moment-timezone';
import {BarList, useQuery} from '@tinybirdco/charts';

export default class TopPages extends Component {
    ReactComponent = (props) => {
        let chartDays = props.chartDays;

        const endDate = moment().endOf('day');
        const startDate = moment().subtract(chartDays - 1, 'days').startOf('day');

        /**
         * @typedef {Object} Params
         * @property {string} cid
         * @property {string} [date_from]
         * @property {string} [date_to]
         * @property {number} [limit]
         * @property {number} [skip]
         */
        const params = {
            cid: config.tinybirdCid,
            date_from: startDate.format('YYYY-MM-DD'),
            date_to: endDate.format('YYYY-MM-DD')
        };

        const {data, meta, error, loading} = useQuery({
            endpoint: 'https://api.tinybird.co/v0/pipes/top_pages.json',
            token: config.tinybirdToken,
            params
        });

        return (
            <BarList
                data={data}
                meta={meta}
                loading={loading}
                error={error}
                index="pathname"
                categories={['visits', 'hits', 'logged_in_hits', 'logged_out_hits']}
                colorPalette={['#DC82C8', '#FFC0F1', '#DC82C8', '#FFC0F1']}
                height="300px"
            />
        );
    };
}
