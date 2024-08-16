<template>
    <div class="activity-wrapper">
        <h2>活动记录</h2>
        <div class="line"></div>
        <div class="heatmap">
            <div class="map">
                <HeatMap v-if="history" :history="history"></HeatMap>
            </div>
            <v-chart class="chart" :option="option" />
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref, provide } from 'vue';
import HeatMap from './HeatMap.vue';

import { PieChart } from "echarts/charts";
import {
    LegendComponent,
    TitleComponent,
    TooltipComponent
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);

provide(THEME_KEY, "dark");

const history = ref(null);
const option = ref(null);

onMounted(async () => {
    const response = await axios.get("https://wakatime.com/share/@b222afd4-2077-4056-8b2b-59337e624f65/0512830d-7109-4068-a05e-24b38aa850da.json");
    history.value = response.data.data;
    const pie = await axios.get("https://wakatime.com/share/@b222afd4-2077-4056-8b2b-59337e624f65/3d01702d-6bac-40e0-b5be-cc1f894ed2de.json");
    const pie_data = pie.data.data;
    const chart_data = pie_data.map(item => ({
        value: item.percent,
        name: item.name,
    }));
    option.value = {
        backgroundColor: "transparent",
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c}%",
            extraCssText: `
                background-color: rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(10px);
                font-family: "LXGW WenKai", sans-serif;
                color: white;
            `
        },
        series: [
            {
                type: "pie",
                radius: "90%",
                center: ["50%", "50%"],
                data: chart_data,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ]
    }
})

</script>
<style scoped>
h2 {
    margin: 0;
}
.activity-wrapper {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 35px;
    color: white;
}
.line {
    width: 95%;
    height: 1px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
}
.heatmap {
    width: 100%;
    display: flex;
    height: 70%;
    /* justify-content: center; */
    align-items: center;
}
.map {
    width: 60%;
    padding-right: 5px;
}
.chart {
    width: 40%;
}
</style>