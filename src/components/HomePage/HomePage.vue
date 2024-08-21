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

<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import ActivityBar from "./ActivityBar.vue";
import AvatarBar from "./AvatarBar.vue";
import LogBar from "./LogBar.vue";
import NavBar from "./NavBar.vue";
import RecentBar from "./RecentBar.vue";

onMounted(() => {
    getMobileVh();
    window.addEventListener('resize', getMobileVh);
})

onBeforeUnmount(() => {
    getMobileVh();
    window.removeEventListener('resize', getMobileVh);
})

const getMobileVh = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
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
    height: calc(var(--vh, 1vh) * 100);
}
.mobilebar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color: transparent;
    display: none;
    /* background-color: rgba(0, 0, 0, 0.1) !important; */
    /* backdrop-filter: blur(5px) !important; */
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

@media screen and (max-width: 1024px) {
    .center {
        width: 95%;
    }
    .activitydiv {
        display: none;
    }
    .logdiv {
        width: 100%;
    }
}

@media screen and (max-width: 425px) {
    .center {
        flex-flow: column;
        align-items: center;
        gap: 10px;
    }
    .navdiv {
        display: none;
    }
    .sidediv {
        width: 90%;
    }
    .avatardiv {
        height: 100%;
    }
    .recentdiv {
        display: none;
    }
    .maindiv {
        width: 100%;
        margin-bottom: 20px;
    }
    .upperdiv {
        height: 100%;
    }
    .logdiv {
        width: 100%;
        padding-left: 5px;
        height: 100%;
    }
    .wrapper {
        flex-flow: column;
    }
    .mobilebar {
        display: block;
    }
}
</style>