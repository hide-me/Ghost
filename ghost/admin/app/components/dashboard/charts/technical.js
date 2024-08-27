'use client';

import Component from '@glimmer/component';
import React from 'react';
import config from 'ghost-admin/config/environment';
import moment from 'moment-timezone';
import {DonutChart, useQuery} from '@tinybirdco/charts';

export default class KpisComponent extends Component {
    ReactComponent = (props) => {
        let chartDays = props.chartDays;

        // @TODO: ATM there's a two day worth gap (padding) on the right side
        // of the chart. endDate needs to be adjusted to get rid of it
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
            endpoint: 'https://api.tinybird.co/v0/pipes/top_browsers.json',
            token: config.tinybirdToken,
            params
        });

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
                options={{
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: '#fff',
                        textStyle: {
                            color: '#15171A'
                        },
                        axisPointer: {
                            type: 'line',
                            z: 1
                        },
                        extraCssText: 'border: none !important; box-shadow: 0px 100px 80px 0px rgba(0, 0, 0, 0.07), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.05), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.02);'
                    }
                }}
            />
        );
    };
}
