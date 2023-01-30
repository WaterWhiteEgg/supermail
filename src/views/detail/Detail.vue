<template>
    <div class="detail">
        <detail-navbar></detail-navbar>
        <scroll
            class="scroll"
            ref="scroll"
            :needPullDownRefresh="true"
            @pullingDown="pullingDown"
        >
            <detail-swiper :topImg="topImg"></detail-swiper>
            <detail-basedata :allGoodsItem="allGoodsItem"></detail-basedata>
            <detail-shop-info :allShopInfo="allShopInfo"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
            <detail-goods-param :goodsParams="goodsParams"></detail-goods-param>
            <detail-comment-info
                :commentInfo="commentInfo"
            ></detail-comment-info>
            <goods-item :AllGoods="recommends"></goods-item>
        </scroll>
    </div>
</template>

<script>
import {
    getdetailItem,
    GoodsItemNet,
    ShopInfo,
    GoodsParam,
    getdetailRecommend,
} from "../../network/detail";

import Scroll from "../../components/common/better_scroll/Scroll.vue";
import detailBasedata from "./detailitem/detailBasedata.vue";
import detailNavbar from "./detailitem/detailNavbar.vue";
import detailShopInfo from "./detailitem/detailShopInfo.vue";
import detailSwiper from "./detailitem/detailSwiper.vue";
import detailGoodsInfo from "./detailitem/detailGoodsInfo.vue";
import detailGoodsParam from "./detailitem/detailGoodsParam.vue";
import detailCommentInfo from "./detailitem/detailCommentInfo.vue";
import GoodsItem from "../../components/content/goods/GoodsItem.vue";
import { debounce } from "../../common/utils.js";
import { sorollRefresh } from "../../common/mixin.js";
export default {
    name: "Detail",
    // 移除了保持活跃
    mixins: [sorollRefresh],
    components: {
        detailNavbar,
        detailSwiper,
        detailBasedata,
        detailShopInfo,
        detailGoodsInfo,
        Scroll,
        detailGoodsParam,
        detailCommentInfo,
        GoodsItem,
    },

    data() {
        return {
            iid: null,
            topImg: [],
            allGoodsItem: {},
            allShopInfo: {},
            itemInfo: {},
            shopInfo: {},
            detailInfo: {},
            goodsParams: {},
            commentInfo: {},
            recommends: [],
        };
    },
    beforeDestroy() {
        // 当销毁前再次把vueX托管的值改变
        this.$store.state.needTabber = true;
    },
    deactivated() {},
    updated() {},

    created() {
        this.$store.state.needTabber = false;
        // 改变vueX的needTabber使其不显示

        // if (!(this.iid === this.$route.query.iid)) {
        // 如果iid已经相同则不需要再次请求网络
        this.iid = this.$route.query.iid;
        getdetailItem(this.iid)
            .then((res) => {
                // console.log(res);
                this.topImg = res.data.result.itemInfo.topImages;
                this.itemInfo = res.data.result.itemInfo;
                this.shopInfo = res.data.result.shopInfo;
                this.columns = res.data.result.columns;
                this.detailInfo = res.data.result.detailInfo;
                this.itemParams = res.data.result.itemParams;
                this.commentInfo = res.data.result.rate;
                // 传入三个数据给类
                this.allGoodsItem = new GoodsItemNet(
                    this.itemInfo,
                    this.columns,
                    this.shopInfo.services
                );

                // 传入一个数据给类
                this.allShopInfo = new ShopInfo(this.shopInfo);
                // console.log(this.allGoodsItem);

                this.goodsParams = new GoodsParam(
                    this.itemParams.info,
                    this.itemParams.rule
                );
            })
            .catch((err) => {
                console.log(err);
            });
        getdetailRecommend()
            .then((res) => {
                // console.log(res);
                this.recommends = res.data.data && res.data.data.list;
                // console.log(this.recommends);
            })
            .catch((err) => {
                console.log(err);
            });
        // }
    },
    mounted() {},

    methods: {
        pullingDown() {
            debounce(() => {
                this.$refs.scroll.bs.refresh();
                console.log("down");
            }, 10);
        },
    },
};
</script>

<style  scoped>
.detail {
    height: 100vh;
}
.scroll {
    height: calc(100% - 44px);
}
</style>