<template>
    <div>{{goodsParams}}</div>
</template>

<script>
export default {
    name: "DetailGoodsParam",
    props: {
        goodsParams: {
            type: Object,
            default() {
                return {};
            },
        },
        
    },
    updated(){
        console.log(this.goodsParams);
    },
    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style lang="scss" scoped>
</style>