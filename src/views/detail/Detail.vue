<template>
    <div>
        <p>{{iid}}</p>
    </div>
</template>

<script>
export default {
    name: "Detail",

    data() {
        return {
            iid: null,
        };
    },

    created() {
        this.iid = this.$route.query.iid;
    },
    mounted() {},

    methods: {},
};
</script>

<style lang="scss" scoped>
</style>