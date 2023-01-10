<template>
    <div>
        <detail-navbar></detail-navbar>
        <detail-swiper :topImg="topImg"></detail-swiper>
        <datail-basedata :allGoodsItem="allGoodsItem"></datail-basedata>
        {{ iid }}
    </div>
</template>

<script>
import { getdetailItem, GoodsItem } from "../../network/detail";

import datailBasedata from "./detailitem/datailBasedata.vue";
import detailNavbar from "./detailitem/detailNavbar.vue";
import detailSwiper from "./detailitem/detailSwiper.vue";
export default {
    name: "Detail",
    // 移除了保持活跃

    components: {
        detailNavbar,
        detailSwiper,
        datailBasedata,
    },

    data() {
        return {
            iid: null,
            topImg: [],
            allGoodsItem: {},
            itemInfo: {},
            shopInfo: {},
        };
    },
    destroyed() {},
    created() {
        // if (!(this.iid === this.$route.query.iid)) {
        // 如果iid已经相同则不需要再次请求网络
        this.iid = this.$route.query.iid;
        getdetailItem(this.iid).then((res) => {
            // console.log(res);
            this.topImg = res.data.result.itemInfo.topImages;
            this.itemInfo = res.data.result.itemInfo;
            this.shopInfo = res.data.result.shopInfo;
            this.columns = res.data.result.columns;
            // 传入三个数据给类
            this.allGoodsItem = new GoodsItem(
                this.itemInfo,
                this.columns,
                this.shopInfo.services
            );
            // console.log(this.allGoodsItem);
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