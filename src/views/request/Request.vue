<template>
    <div class="request">
        <request-back></request-back>
        <requestbox></requestbox>
    </div>
</template>

<script>
import RequestBack from "./requestitem/RequestBack.vue";
import Requestbox from "./requestitem/Requestbox.vue";
export default {
    components: { Requestbox, RequestBack },
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
@media screen and (max-width: 768px) {
    .request {
        flex-direction: row !important;
    }
}
.request {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>