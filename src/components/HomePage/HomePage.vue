<template>
    <div class="wrapper">
        <div class="center">
            <div class="sidediv">
                <div class="avatardiv"><AvatarBar></AvatarBar></div>
                <div class="navdiv"><NavBar></NavBar></div>
            </div>
            <div class="maindiv">
                <div class="upperdiv">
                    <div class="logdiv"><LogBar></LogBar></div>
                    <div class="activitydiv"><ActivityBar></ActivityBar></div>
                </div>
                <div class="lowerdiv">
                    <div class="recentdiv"><RecentBar></RecentBar></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ActivityBar from "./ActivityBar.vue";
import AvatarBar from "./AvatarBar.vue";
import LogBar from "./LogBar.vue";
import NavBar from "./NavBar.vue";
import RecentBar from "./RecentBar.vue";
export default {
    name: "HomePage",
    components: {NavBar, AvatarBar, ActivityBar, LogBar, RecentBar}
}
</script>

<style scoped>
div {
    width: 100%;
    height: 100vh;
    background-color: transparent;
}
h1 {
    margin: 0%;
}
.wrapper {
    display: flex;
    width: 100%;
    height: 100vh;
}
.center {
    display: flex;
    width: 80%;
    height: 80%;
    margin: auto;
    background-color: transparent;
}
.sidediv {
    display: flex;
    flex-flow: column nowrap;
    width: 20%;
    height: 100%;
    background-color: transparent;
}
.avatardiv {
    width: 100%;
    height: 40%;
    background-color: transparent;
}
.navdiv {
    padding-top: 10px;
    width: 100%;
    height: 60%;
    background-color: transparent;
}
.maindiv {
    display: flex;
    flex-flow: column;
    width: 80%;
    height: 100%;
    background-color: transparent;
}
.upperdiv {
    display: flex;
    width: 100%;
    height: 40%;
    background-color: transparent;
}
.lowerdiv {
    display: flex;
    width: 100%;
    height: 60%;
    background-color: transparent;
}
.logdiv {
    width: 50%;
    height: 100%;
    padding-left: 10px;
    padding-right: 5px;
    background-color: transparent;
}
.activitydiv {
    width: 50%;
    height: 100%;
    padding-left: 5px;
    background-color: transparent;
}
.recentdiv {
    padding-left: 10px;
    padding-top: 10px;
    width: 100%;
    height: 100%;
    background-color: transparent;
}
</style>