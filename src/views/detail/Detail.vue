<template>
    <div class="detail">
        <detail-navbar
            :navbarOffsetTop="navbarOffsetTop"
            ref="navbar"
            :navbarChange="navbarChange"
            @goOffsetTop="goOffsetTop"
        ></detail-navbar>

        <scroll
            class="scroll"
            ref="scroll"
            :needPullDownRefresh="true"
            @pullingDown="pullingDown"
            @scrollCheck="scrollCheck"
            probeType:2
        >
            <detail-swiper :topImg="topImg" ref="swiper"></detail-swiper>
            <detail-basedata
                :allGoodsItem="allGoodsItem"
                ref="basedata"
            ></detail-basedata>
            <detail-shop-info :allShopInfo="allShopInfo"></detail-shop-info>
            <detail-goods-info
                :detailInfo="detailInfo"
                @loadGoodsInfo="loadGoodsInfo"
            ></detail-goods-info>
            <detail-goods-param
                :goodsParams="goodsParams"
                ref="param"
            ></detail-goods-param>
            <detail-comment-info
                :commentInfo="commentInfo"
                ref="comment"
            ></detail-comment-info>
            <goods-item :AllGoods="recommends" ref="recommends"></goods-item>
        </scroll>
        <in-back-top @click.native="BackTop" v-show="isShow"></in-back-top>

        <detail-bottom-bar
            @changeCar="changeCar"
            @changeStar="changeStar"
            :isCartlistIid="isCartlistIid"
            :isStarIid="isStarIid"
        ></detail-bottom-bar>
    </div>
</template>

<script>
import {
    getdetailItem,
    GoodsItemNet,
    ShopInfo,
    GoodsParam,
    getdetailRecommend,
    Product,
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
import { sorollRefresh, mixinBackTop } from "../../common/mixin.js";
import DetailBottomBar from "./detailitem/detailBottomBar.vue";
import {
    cartListsPush,
    cartListsRemove,
    cartListsSelect,
} from "../../network/cart";
import {
    favoriteStarsPush,
    favoriteStarsRemove,
    favoriteStarsSelect,
} from "../../network/favoriteStars";

import ALLCONST from "../../common/const";
export default {
    name: "Detail",
    // 移除了保持活跃
    mixins: [sorollRefresh, mixinBackTop],
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
        DetailBottomBar,
    },

    data() {
        return {
            iid: "",
            cartListsPushStatus: 1,
            cartListsStatus: 0,
            cartListStarStatus: 0,
            cartListStarPushStatus: 1,

            topImg: [],
            allGoodsItem: {},
            allShopInfo: {},
            itemInfo: {},
            shopInfo: {},
            detailInfo: {},
            goodsParams: {},
            commentInfo: {},
            recommends: [],
            product: {},
            navbarOffsetTop: [],
            navbarChange: 0,
            popup: false,
            RecalculateScroll: 0,
            cartListsData: [],
            cartListStarsData: [],
            isCartlistIid: false,
            isStarIid: false,
        };
    },
    watch: {
        iid(newdata, olddata) {
            this.$store.commit("needChangeShopcar", newdata);
            this.$store.commit("needChangeStar", newdata);
        },
        cartListsData(newval, oldval) {
            // 将值循环判断是否有对应iid，有的话那就转化变删除按钮

            for (let obj of newval) {
                if (obj.iid === this.iid) {
                    this.isCartlistIid = true;
                    return 0;
                } else {
                    this.isCartlistIid = false;
                }
            }
        },

        cartListStarsData(newval, oldval) {
            // 将值循环判断是否有对应iid，有的话那就转化变取消收藏按钮
            // console.log(newval);

            for (let obj of newval) {
                if (obj.iid === this.iid) {
                    this.isStarIid = true;
                    return 0;
                } else {
                    this.isStarIid = false;
                }
            }
        },
        // "$refs.scroll": {
        //     handler(newValue, oldValue) {
        //         console.log(newValue, oldValue);
        //     },
        //     deep: true,
        // },
    },
    computed: {
        offsetTop() {
            --this.RecalculateScroll;
            return [
                this.$refs.swiper && this.$refs.swiper.$el.offsetTop,
                this.$refs.param && this.$refs.param.$el.offsetTop,
                this.$refs.comment && this.$refs.comment.$el.offsetTop,
                this.$refs.recommends && this.$refs.recommends.$el.offsetTop,
                // 这个MAX_VALUE能获取js的最大数值，用于for循环的对比，不过记得循环该数组时长度减一
                // 不然这个数据也会被循环到
                Number.MAX_VALUE,
            ];
        },
        // 判断this.product是否有内容
        isProductNull() {
            return Object.keys(this.product).length == 0;
        },
    },

    beforeDestroy() {
        // 当销毁前再次把vueX托管的值改变
        this.$store.commit("changeNeedTabber");
    },
    deactivated() {},
    updated() {
        // this.navbarOffsetTop = this.ToTop;
        // console.log(this.$refs.recommends && this.$refs.recommends.$el.offsetTop);
        // this.navbarOffsetTop = [];
        // console.log(this.navbarOffsetTop);
    },

    created() {
        this.$store.commit("changeNeedTabber");
        // 改变vueX的needTab    其不显示

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

                // 传入两个数据给类
                this.goodsParams = new GoodsParam(
                    this.itemParams.info,
                    this.itemParams.rule
                );

                this.product = new Product(this.topImg, this.itemInfo);
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
    mounted() {
        // 查询购物车的数据
        this.selectCartLists();
        // 查询收藏的数据
        this.selectFavoriteStars();
    },
    activated() {},

    methods: {
        pullingDown() {
            debounce(() => {
                this.$refs.scroll.bs.refresh();
                console.log("down");
            }, 10);
        },
        scrollCheck(position) {
            // console.log(this.navbarOffsetTop.length==0);
            if (this.navbarOffsetTop.length === 0) {
                this.navbarOffsetTop = this.offsetTop;
                // console.log(this.navbarOffsetTop);
                // console.log(1);
            }
            // 减少判断加强性能
            // 这个判断比if else显然不如性能好，但是代码执行效率以及观感好很多
            for (let i = 0; i < this.navbarOffsetTop.length - 1; i++) {
                if (
                    this.navbarChange !== i &&
                    -position.y >= this.navbarOffsetTop[i] &&
                    -position.y <= this.navbarOffsetTop[i + 1]
                ) {
                    this.navbarChange = i;
                }
            }
            // 判断什么时候显示backtop
            if (this.navbarChange >= 1) {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
            // if (-position.y <= this.navbarOffsetTop[1]) {
            //     this.navbarChange = 0;
            // } else if (
            //     -position.y >= this.navbarOffsetTop[1] &&
            //     -position.y <= this.navbarOffsetTop[2]
            // ) {
            //     this.navbarChange = 1;
            // } else if (
            //     -position.y >= this.navbarOffsetTop[2] &&
            //     -position.y <= this.navbarOffsetTop[3]
            // ) {
            //     this.navbarChange = 2;
            // } else if (-position.y >= this.navbarOffsetTop[3]) {
            //     this.navbarChange = 3;
            // }
        },
        // 查询购物车的数据
        selectCartLists() {
            cartListsSelect(ALLCONST.codes.token).then((res) => {
                // 发送给子元素
                // console.log(res.data.data.data);
                //  记录购物车搜索出来的状态

                this.cartListsStatus = res.data.status;
                if (!res.data.status) {
                    this.cartListsData = res.data.data.data;
                }
            });
        },
        // 搜索收藏的数据
        selectFavoriteStars() {
            favoriteStarsSelect(ALLCONST.codes.token).then((res) => {
                // console.log(res);
                //  记录收藏的状态
                this.cartListStarStatus = res.data.status;
                // 加载成功就解析出来赋值
                if (!res.data.status) {
                    this.cartListStarsData = JSON.parse(res.data.data.data);
                }
            });
        },
        goOffsetTop(index) {
            this.navbarOffsetTop = this.offsetTop;
            // console.log(this.navbarOffsetTop);
            this.$refs.scroll.backTop(0, -(this.navbarOffsetTop[index] + 1));
        },

        changeCar(istrue, callbackStatus, callbackLoadState) {
            // 如果没有内容的话以及来自搜索出错就不执行了
            if (this.isProductNull) {
                return 0;
            }
            // 以及来自搜索出错就不执行还有跳转
            if (this.cartListsStatus) {
                // 跳转到登录
                this.$router.push("/request");
                return 0;
            }
            // 防抖
            debounce(() => {
                // 加载动画播放
                callbackLoadState(true);
                // 判断这是什么状态的提交

                if (istrue) {
                    // 提交到数据库
                    // 状态默认是1，这个状态用于给子组件识别
                    this.submitCartListsPush()
                        .then((res) => {
                            this.handleSubmitResponseCartlists(res);
                        })
                        .catch((err) => {
                            this.handleError(err, "cartListsPushStatus");
                        })
                        .finally(() => {
                            // 无论如何都执行
                            // 提交状态
                            // console.log(this.cartListsPushStatus);
                            callbackStatus(this.cartListsPushStatus);
                            // 结束加载动画
                            callbackLoadState(false);
                            // 执行搜索函数(重新查找渲染)
                            this.selectCartLists();
                        });
                    // this.$store.dispatch("shopcarData", this.product);
                } else {
                    // 如果是删除请求
                    this.removeFromCartLists()
                        .then((res) => {
                            this.handleSubmitResponseCartlists(res);
                        })
                        .catch((err) => {
                            this.handleError(err, "cartListsPushStatus");
                        })
                        .finally(() => {
                            // 无论如何都执行
                            // 提交状态
                            callbackStatus(this.cartListsPushStatus);
                            // 结束加载动画
                            callbackLoadState(false);
                            // 执行搜索函数(重新查找渲染)
                            this.selectCartLists();
                        });

                    // this.$store.commit("delShopcar", this.iid);
                }

                // this.$store.commit("needChangeShopcar", this.iid);
            }, 300);
            // 加载事件
        },
        // 提交到cartlists数据库
        submitCartListsPush() {
            // 状态默认是1，这个状态用于给子组件识别
            return cartListsPush(ALLCONST.codes.token, this.product);
        },
        // 提交到cartliststars数据库
        submitFavoriteStarsPush() {
            // 状态默认是1，这个状态用于给子组件识别
            return favoriteStarsPush(ALLCONST.codes.token, this.product);
        },
        //cartlists 删除请求
        removeFromCartLists() {
            return cartListsRemove(ALLCONST.codes.token, this.product);
        },
        //cartliststars 删除请求
        removeFromFavoriteStars() {
            return favoriteStarsRemove(ALLCONST.codes.token, this.product);
        },
        // 记录购物车状态并提交
        handleSubmitResponseCartlists(res) {
            console.log(res);
            // 将状态记录
            this.cartListsPushStatus = res.data.status;
        },
        // 记录收藏状态并提交

        handleSubmitResponseStar(res) {
            console.log(res);
            // 记录状态
            this.cartListStarPushStatus = res.data.status;
        },
        // err的状态提交
        handleError(err, errStatusName) {
            console.log(err);
            // 记录状态
            this[errStatusName] = 1;
        },
        changeStar(istrue, changeStarLoadingCallback, changeStarCallback) {
            // 如果没有内容的话以及来自搜索出错就不执行了
            if (this.isProductNull) {
                return 0;
            }
            // 加载动画
            changeStarLoadingCallback(true);
            // 在加载页面时候记录的状态，判断未登录
            if (this.cartListStarStatus) {
                this.$router.push("/request");
            }
            // 防抖
            debounce(() => {
                if (istrue) {
                    // 收藏提交
                    this.submitFavoriteStarsPush()
                        .then((res) => {
                            this.handleSubmitResponseStar(res);
                        })
                        .catch((err) => {
                            this.handleError(err, "cartListStarStatus");
                        })
                        .finally(() => {
                            // 取消动画
                            changeStarLoadingCallback(false);
                            // 回调状态
                            changeStarCallback(this.cartListStarPushStatus);
                            // 重新搜索改变
                            this.selectFavoriteStars();
                        });
                    // this.$store.dispatch("changeStar", this.iid);
                } else {
                    // 删除收藏
                    this.removeFromFavoriteStars()
                        .then((res) => {
                            this.handleSubmitResponseStar(res);
                        })
                        .catch((err) => {
                            this.handleError(err, "cartListStarStatus");
                        })
                        .finally(() => {
                            // 取消动画
                            changeStarLoadingCallback(false);
                            // 回调状态
                            changeStarCallback(this.cartListStarPushStatus);
                            // 重新搜索改变
                            this.selectFavoriteStars();
                        });
                    // this.$store.commit("delStar", this.iid);
                }
                // this.$store.commit("needChangeStar", this.iid);
            }, 300);
        },
        // 用于检测图片加载goodsinfo图片
        loadGoodsInfo() {
            ++this.RecalculateScroll;
        },
    },
};
</script>

<style  scoped>
.detail {
    height: 100vh;
    overflow: hidden;
}
.scroll {
    height: calc(100% - 44px - 48px);
}
</style>