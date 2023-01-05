<template>
    <div id="app">
        <keep-alive>
            <router-view />
        </keep-alive>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from "components/common/tabbar/Tabbar.vue";
export default {
    name: "App",
    components: {
        Tabbar,
    },
};
</script>
<style>
@import url("assets/css/base.css");
/* 这里起别名了 */
</style>
