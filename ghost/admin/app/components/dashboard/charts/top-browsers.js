'use client';

import Component from '@glimmer/component';
import React, {useEffect} from 'react';
import config from 'ghost-admin/config/environment';
import moment from 'moment-timezone';
import {DonutChart, useQuery} from '@tinybirdco/charts';

export default class TopBrowsers extends Component {
    /**
     * @param {Object} params
     * @param {string} params.cid
     * @param {string} [params.date_from]
     * @param {string} [params.date_to]
     * @returns {JSX.Element}
     */
    ReactComponent = (props) => {
        let chartDays = props.chartDays;

        const endDate = moment().endOf('day');
        const startDate = moment()
            .subtract(chartDays - 1, 'days')
            .startOf('day');

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

        const {data, meta, error, loading, refetch} = useQuery({
            endpoint: 'https://api.tinybird.co/v0/pipes/top_browsers.json',
            token: config.tinybirdToken,
            params
            // refreshInterval: 60000
        });

        useEffect(() => {
            const handleVisibilityChange = () => {
                if (!document.hidden) {
                    refetch();
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);

            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            };
        }, [refetch]);

        return (
            <DonutChart
                data={data}
                meta={meta}
                loading={loading}
                error={error}
                index="browser"
                categories={['hits']}
                colorPalette={['#B78AFB', '#7FDE8A', '#FBCE75', '#F97DB7', '#6ED0FB']}
                backgroundColor="transparent"
                fontSize="13px"
                textColor="#AEB7C1"
                showLegend={true}
                height="280px"
                params={params}
            />
        );
    };
}
