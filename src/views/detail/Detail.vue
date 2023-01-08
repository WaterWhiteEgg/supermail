<template>
    <div>
        <detail-navbar></detail-navbar>
        <detail-swiper :topImg="topImg"></detail-swiper>
        {{ iid }}
    </div>
</template>

<script>
import { getdetailItem } from "../../network/detail";

import detailNavbar from "./detailitem/detailNavbar.vue";
import detailSwiper from "./detailitem/detailSwiper.vue";
export default {
    name: "Detail",
    // 移除了保持活跃
    components: {
        detailNavbar,
        detailSwiper,
    },

    data() {
        return {
            iid: null,
            topImg: [],
        };
    },
    destroyed() {},
    created() {
        // if (!(this.iid === this.$route.query.iid)) {
        // 如果iid已经相同则不需要再次请求网络
        this.iid = this.$route.query.iid;
        getdetailItem(this.iid).then((res) => {
            console.log(res);
            this.topImg = res.data.result.itemInfo.topImages;
            console.log(Array.from(res.data.result.itemInfo.topImages));
        });
        // }
    },
    activated() {},
    mounted() {},

    methods: {},
};
</script>

<style lang="scss" scoped>
</style>