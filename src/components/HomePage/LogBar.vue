<template>
    <div class="log-wrapper">
        <h2>主日志</h2>
        <div class="line"></div>
    </div>
</template>
<script>
export default {
    name: "LogBar"
}
</script>
<style scoped>
h2 {
    margin: 0;
}
.log-wrapper {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 35px;
    color: white;
    padding-top: 20px;
    padding-left: 20px;
}
.line {
    width: 95%;
    height: 1px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>