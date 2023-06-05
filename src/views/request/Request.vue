<template>
    <div>登录</div>
</template>

<script>
export default {
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
</style>