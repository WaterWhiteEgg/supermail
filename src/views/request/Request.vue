<template>
    <div class="request">
        <requestbox></requestbox>
    </div>
</template>

<script>
import Requestbox from "./requestitem/Requestbox.vue";
export default {
    components: { Requestbox },
    name: "Request",

    data() {
        return {};
    },
    methods: {},
    created() {
        this.$store.commit("changeNeedTabber");
        // 改变vueX的needTab    其不显示
    },
    beforeDestroy() {
        // 当销毁前再次把vueX托管的值改变
        this.$store.commit("changeNeedTabber");
    },
    mounted() {},
};
</script>

<style  scoped>
.request {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>