<template>
    <div class="detail">
        <detail-navbar></detail-navbar>
        <detail-swiper :topImg="topImg"></detail-swiper>
        <datail-basedata :allGoodsItem="allGoodsItem"></datail-basedata>
        <detail-shop-info :allShopInfo="allShopInfo"></detail-shop-info>
        {{ iid }}
    </div>
</template>

<script>
import { getdetailItem, GoodsItem, ShopInfo } from "../../network/detail";

import datailBasedata from "./detailitem/datailBasedata.vue";
import detailNavbar from "./detailitem/detailNavbar.vue";
import DetailShopInfo from "./detailitem/detailShopInfo.vue";
import detailSwiper from "./detailitem/detailSwiper.vue";
export default {
    name: "Detail",
    // 移除了保持活跃

    components: {
        detailNavbar,
        detailSwiper,
        datailBasedata,
        DetailShopInfo,
    },

    data() {
        return {
            iid: null,
            topImg: [],
            allGoodsItem: {},
            allShopInfo: {},
            itemInfo: {},
            shopInfo: {},
        };
    },
    destroyed() {
        // 当销毁时再次把vueX托管的值改变
        this.$store.state.needTabber = true;
    },

    created() {
        this.$store.state.needTabber = false;
        // 改变vueX的needTabber使其不显示

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

            // 传入一个数据给类
            this.allShopInfo = new ShopInfo(this.shopInfo);
            // console.log(this.allGoodsItem);
        });
        // }
    },
    mounted() {},

    methods: {},
};
</script>

<style  scoped>
</style>