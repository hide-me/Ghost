'use client';

import Component from '@glimmer/component';
import React from 'react';
import config from 'ghost-admin/config/environment';
import {BarList} from '@tinybirdco/charts';

export default class TopPages extends Component {
    /**
     * @param {Object} params
     * @param {string} params.cid
     * @param {string} [params.date_from]
     * @param {string} [params.date_to]
     * @returns {JSX.Element}
     */
    ReactComponent = (params) => {
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
