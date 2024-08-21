<template>
    <div class="heatmap" @mousemove="updateTooltipPosition">
        <div class="week" v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <div
                class="day"
                v-for="(day, dayIndex) in week"
                :key="dayIndex"
                :style="dayStyle(day)"
                @mouseover="showTooltip(day)"
                @mouseleave="hideTooltip">
            </div>
        </div>
        <div v-if="tooltip.visible" class="tooltip" :style="tooltipStyle">
            <div>{{ tooltip.content }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, reactive } from 'vue';

const props = defineProps({
    history: {
        type: Array,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    }
});

const maxSeconds = computed(() =>
    Math.max(...props.history.map(day => day.grand_total.total_seconds))
);

const weeks = computed(() => {
    const days = Array(16)
        .fill(null)
        .map(() => Array(7).fill(null));
    let index = 0;

    for (let week = 15; week >= 0; week--) {
        for (let day = 6; day >= 0; day--) {
            if (props.history[props.history.length - index - 1]) {
                days[week][day] = props.history[props.history.length - index - 1];
            }
            index++;
        }
    }
    return days;
});

const dayStyle = day => {
    if (!day) return {
        backgroundColor: '#f0f0f0', // 设置无数据的默认背景色
        width: props.size + 'px',
        height: props.size + 'px',
        margin: '2px',
    };

    const intensity = day.grand_total.total_seconds / maxSeconds.value || 0;
    let color = `rgba(148, 226, 213, ${intensity})`; // 蓝色着色

    if (intensity === 0) {
        color = `rgb(205, 214, 244)`;
    }

    return {
        backgroundColor: color,
        width: props.size + 'px',
        height: props.size + 'px',
        margin: '2px',
    };
};

// 悬浮容器的状态
const tooltip = reactive({
    visible: false,
    content: '',
    x: 0,
    y: 0,
});

// 显示悬浮容器
const showTooltip = day => {
    if (day) {
        tooltip.content = `日期: ${day.range.date}\n时长: ${day.grand_total.text}`;
    } else {
        tooltip.content = 'No data available';
    }

    tooltip.visible = true;

    // 设置初始位置和透明度
    tooltipStyle.value.transform = 'translate(10px, -10px)';
    tooltipStyle.value.opacity = '0';
    
    // 动画进入
    requestAnimationFrame(() => {
        tooltipStyle.value.transform = 'translate(0, 0)';
        tooltipStyle.value.opacity = '1';
    });
};


// 隐藏悬浮容器
const hideTooltip = () => {
    tooltip.visible = false;
};


const updateTooltipPosition = event => {
    const heatmapRect = event.currentTarget.getBoundingClientRect();
    tooltip.x = event.clientX - heatmapRect.left + 10; // 相对于容器左上角
    tooltip.y = event.clientY - heatmapRect.top;  // 相对于容器左上角
};


const tooltipStyle = computed(() => ({
    left: `${tooltip.x}px`,
    top: `${tooltip.y}px`,
    position: 'absolute',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    pointerEvents: 'none',
    zIndex: 1000,
    fontSize: '12px',
    transform: 'translate(0, 0)', // 初始状态
    opacity: '1', // 初始状态
    minWidth: '120px', // 固定最小宽度，适应最长一行文字
    maxWidth: '120px', // 固定最大宽度，防止自动调整
}));
</script>

<style scoped>
.heatmap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 80%;
}

.week {
    display: flex;
    flex-direction: column;
}

.day {
    display: inline-block;
    border-radius: 3px;
}

.tooltip {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    font-family: "LXGW WenKai", sans-serif;
    transition: transform 0.3s ease, opacity 0.3s ease;
    font-size: 16px;
}
</style>