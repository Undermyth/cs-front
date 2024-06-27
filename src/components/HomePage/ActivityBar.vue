<template>
    <div class="activity-wrapper">
        <h2>活动记录</h2>
        <div class="line"></div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
h2 {
    margin: 0;
}
.activity-wrapper {
    padding-left: 20px;
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
</style>