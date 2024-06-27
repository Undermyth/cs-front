<template>
    <div class="statistic-container">
        <p><b>{{ title }}</b></p>
        <div class="line"></div>
        <p><b>{{ value }}</b></p>
    </div>
</template>
<script>
export default {
    name : "StatisticUtil",
    props: ['title', 'value']
}
</script>
<style scoped>
.statistic-container {
    display: flex;
    flex-flow: column;
    gap: 3px;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
}
th, td {
  text-align: center;
}
.line {
    width: 100%;
    height: 1px;
    background-color: white;
}
</style>