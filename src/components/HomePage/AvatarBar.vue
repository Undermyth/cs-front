<template>
    <div class="avatar-wrapper">
        <div class="pad"></div>
        <Avatar :size="128" src="https://s2.loli.net/2024/06/27/P9HVKweLqvRCJhb.jpg"></Avatar>
        <h1>chensy</h1>
        <div class="statistic">
            <StatisticalUtil title="文章数" value="10"></StatisticalUtil>
            <StatisticalUtil title="专栏数" value="10"></StatisticalUtil>
            <StatisticalUtil title="日志数" value="10"></StatisticalUtil>
        </div>
    </div>
</template>

<script>
import StatisticalUtil from "./StatisticUtil.vue";
export default {
    name: "AvatarBar",
    components: {StatisticalUtil}
}
</script>

<style scoped>
.avatar-wrapper {
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 35px;
    align-items: center;
    color: white;
}
.pad {
    height: 20px;
}
h1 {
    margin: 0;
    padding: 10px;
}
.statistic {
    display: flex;
    flex-flow: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>