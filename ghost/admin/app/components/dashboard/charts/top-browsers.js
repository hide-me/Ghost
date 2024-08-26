"use client";

import Component from "@glimmer/component";
import React from "react";
import config from "ghost-admin/config/environment";
import moment from "moment-timezone";
import { PieChart } from "@tinybirdco/charts";

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

        const endDate = moment().endOf("day");
        const startDate = moment()
            .subtract(chartDays - 1, "days")
            .startOf("day");

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
            date_from: startDate.format("YYYY-MM-DD"),
            date_to: endDate.format("YYYY-MM-DD"),
        };

        return (
            <PieChart
                endpoint="https://api.tinybird.co/v0/pipes/top_browsers.json"
                token={config.tinybirdToken}
                index="browser"
                categories={["hits"]}
                colorPalette={[
                    "#27F795",
                    "#008060",
                    "#0EB1B9",
                    "#9263AF",
                    "#5A6FC0",
                    "#86BFDB",
                    "#FFC145",
                    "#FF6B6C",
                    "#DC82C8",
                    "#FFC0F1",
                ]}
                height="500px"
                params={params}
            />
        );
    };
}
