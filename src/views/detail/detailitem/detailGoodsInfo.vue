<template>
    <div class="goodsinfo">
        <div class="goodsinfo_desc">{{ detailInfo.desc }}</div>
        <div class="goodinfo_title">{{ title }}</div>
        <div class="goodinfo_image">
            <a :href="item" v-for="item in image" :key="item">
                <img :src="item" :alt="item" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailGoodsInfo",
    props: {
        detailInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        title() {
            // 容错处理
            return (
                this.detailInfo.detailImage &&
                this.detailInfo.detailImage[0].key
            );
        },

        image() {
            return (
                this.detailInfo.detailImage &&
                this.detailInfo.detailImage[0].list
            );
        },
    },
    data() {
        return {};
    },
    updated() {
        console.log(this.detailInfo.detailImage[0]);
    },
    mounted() {},

    methods: {},
};
</script>

<style  scoped>
.goodinfo_image{
    width: 100vw;
}
.goodsinfo_image a img {
    height: 100%;
    width: 100%;
}
</style>