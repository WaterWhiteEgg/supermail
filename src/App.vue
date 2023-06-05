<template>
    <div id="app">
        <keep-alive exclude="Detail,Request">
            <router-view />
        </keep-alive>
        <Tabbar v-show="$store.state.needTabber"></Tabbar>
    </div>
</template>

<script>
import Tabbar from "components/common/tabbar/Tabbar.vue";
export default {
    name: "App",
    created() {},
    components: {
        Tabbar,
    },
};
</script>
<style>
@import url("assets/css/base.css");
/* 这里起别名了 */
</style>
