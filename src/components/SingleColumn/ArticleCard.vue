<template>
    <div class="column-card-container">
        <h2>{{ title }}</h2>
        <div class="addition-info">
            <p>
                <i class='bx bx-time-five' style='color:rgba(0,0,0,0.5)'  ></i>
                发布/更新时间：{{ date }}
            </p>
            <p>
                <i class='bx bx-book-open' style='color:rgba(0,0,0,0.5)' ></i>
                内容长度：{{ length }}
            </p>
        </div>
        <div class="line"></div>
        <div class="abstract">{{ abstract }}</div>
    </div>
</template>
<script>
export default {
    name: "ColumnCard",
    props: ['title', 'date', 'length', 'abstract'],
}
</script>
<style scoped>
.column-card-container {
    padding-top: 30px;
    padding-left: 30px;
    display: flex;
    flex-flow: column;
    flex: 1;
    flex-shrink: 0;
    width: 100%;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.8);
}
.addition-info {
    display: flex;
    flex-flow: row;
    gap: 20px;
    width: 100%;
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.5);
    font-family: "LXGW WenKai", sans-serif;
}

.line {
    width: 95%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.5);
    margin-top: 10px;
    margin-bottom: 10px;
}

.abstract {
    width: 95%;
    font-family: "LXGW WenKai", sans-serif;
}
</style>
