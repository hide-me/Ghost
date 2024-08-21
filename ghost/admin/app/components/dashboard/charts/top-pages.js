'use client';

import Component from '@glimmer/component';
import React from 'react';
import config from 'ghost-admin/config/environment';
import moment from 'moment-timezone';
import {BarList} from '@tinybirdco/charts';

export default class TopPages extends Component {
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
            <BarList
                endpoint={ 'https://api.tinybird.co/v0/pipes/top_pages.json?cid=' + config.tinybirdCid }
                token={config.tinybirdToken}
                index="pathname"
                categories={['hits', 'visits']}
                colorPalette={['#DC82C8', '#FFC0F1']}
                height="300px"
                params={params}
            />
        );
    };
}
