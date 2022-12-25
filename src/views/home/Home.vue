<template>
    <div id="home">
        <navbar class="home_navbar">
            <template #center>购物街破解版</template>
        </navbar>
        <scroll
            class="scroll"
            ref="scroll"
            :probeType="3"
            @scrollCheck="scrollCheck"
        >
            <banner
                :imageBanner="bannerimage"
                :linkBanner="bannerlink"
                :titleBanner="bannertitle"
                class="home_banner"
            >
                <!-- 轮播图 -->
                <!-- {{ banner }} -->
                <!-- :heightBanner="bannerheight" -->
                <!-- 由于高度属性太丑，即使做了，也不要传了 -->
            </banner>
            <home-recommend :listRecommend="recommend.list"></home-recommend>
            <home-feature></home-feature>
            <tab-control
                :giveArray="giveArray"
                @pushIndex="haveIndex"
                class="tab_control"
            ></tab-control>

            <goods-item :homeGoods="goods[baseGoodsType].list"></goods-item>
        </scroll>
        <in-back-top @click.native="homeBackTop" v-show="isShow"></in-back-top>
    </div>
</template>


<script>
import Navbar from "components/common/navbar/Navbar.vue";
import Banner from "components/common/swiper/Swiper.vue";
import HomeRecommend from "./homeComps/HomeRecommend.vue";
import TabControl from "components/common/tabcontrol/TabControl.vue";

import { getHomeData, getGoodsHome } from "../../network/home";
import HomeFeature from "./homeComps/HomeFeature.vue";
import GoodsItem from "../../components/content/goods/GoodsItem.vue";
import Scroll from "../../components/common/better_scroll/Scroll.vue";
import InBackTop from "../../components/content/backtop/InBackTop.vue";

export default {
    name: "Home",
    data() {
        return {
            banner: [],
            bannerimage: [],
            bannerlink: [],
            bannertitle: [],
            bannerheight: [],
            // 其实，也可以不分的。。。直接写.xxx,但这样好看一点
            // dKeyword: {},
            // keywords: {},
            recommend: {},
            // 网络请求
            giveArray: [],
            goods: {
                pop: { page: 0, list: [] },
                new: { page: 0, list: [] },
                sell: { page: 0, list: [] },
            },
            baseGoodsType: "pop",
            isShow: false,
        };
    },
    components: {
        Navbar,
        Banner,
        HomeRecommend,
        HomeFeature,
        TabControl,
        GoodsItem,
        Scroll,
        InBackTop,
    },

    mounted() {
        // 创建完实例后执行
    },
    created() {
        // 抽离到methods出来也有好处，可以传参，节省逻辑判断
        this.togetHomeData();

        this.togetGoodsHome("pop");
        this.togetGoodsHome("new");
        this.togetGoodsHome("sell");
    },
    updated() {},
    methods: {
        // 这里放主要逻辑，看起来分工明显点
        togetHomeData() {
            getHomeData()
                .then((res) => {
                    this.banner = res.data.data.banner.list;
                    // this.dKeyword = res.data.data.dKeyword;
                    // this.keywords = res.data.data.keywords;
                    this.recommend = res.data.data.recommend;
                    // console.log(this.banner);
                    // console.log(res);
                    // console.log(this.recommend);
                    this.banner.map((value) => {
                        // 遍历数据以便swiper模块化
                        this.bannerimage.push(value.image);
                        this.bannerlink.push(value.link);
                        this.bannertitle.push(value.title);
                        // this.bannerheight.push(value.height);
                        // 太丑了不要
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        togetGoodsHome(type) {
            const page = ++this.goods[type].page;
            // 获取页码时使其+1,因为从0开始
            getGoodsHome(type, page).then((res) => {
                this.goods[type].list.push(...res.data.data.list);
                this.giveArray = [];
                // 先进行清除防止多压
                res.data.data.filter.list.map((item) => {
                    this.giveArray.push(item.title);
                });
            });
        },

        haveIndex(index) {
            // 用switch判断数字，因为是这里特有的功能所以不模块化一点也可以
            switch (index) {
                case 0:
                    this.baseGoodsType = "pop";
                    break;
                case 1:
                    this.baseGoodsType = "new";
                    break;
                case 2:
                    this.baseGoodsType = "sell";
                    break;
                default:
                    this.togetGoodsHome = "";
                    break;
            }
        },

        homeBackTop() {
            this.$refs.scroll.backTop();
        },

        scrollCheck(position) {
            console.log(-position.y);

            -position.y > 1000 ? (this.isShow = true) : (this.isShow = false);
        },
    },
};
</script>

<style scoped>
#home {
    height: 100vh;
}
.home_navbar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    box-shadow: 0px 3px #ababab18;
    background-color: #a5d6ff;
}

.scroll {
    height: calc(100% - 93px);
    z-index: 1;
}
</style>