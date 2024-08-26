'use client';

import Component from '@glimmer/component';
import React from 'react';
import config from 'ghost-admin/config/environment';
import moment from 'moment-timezone';
import {AreaChart} from '@tinybirdco/charts';

export default class KpisComponent extends Component {
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

        return (
            <AreaChart
                endpoint="https://api.tinybird.co/v0/pipes/kpis.json"
                token={config.tinybirdToken}
                index="date"
                categories={[props.selected]}
                colorPalette={['#8E42FF', '#7FDE8A', '#FBCE75', '#F97DB7', '#6ED0FB']}
                backgroundColor="transparent"
                fontSize="13px"
                textColor="#AEB7C1"
                height="300px"
                params={params}
                options={{
                    xAxis: {
                        type: 'time',
                        min: startDate.toISOString(),
                        max: endDate.toISOString(),
                        axisLabel: {
                            formatter: chartDays <= 7 ? '{ee}' : '{dd} {MMM}'
                        }
                    }
                }}
            />
        );
    };
}
