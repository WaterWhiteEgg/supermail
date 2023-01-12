<template>
    <div id="home">
        <navbar class="home_navbar">
            <template #center>购物街破解版</template>
        </navbar>
        <tab-control
            :giveArray="giveArray"
            @pushIndex="haveIndex"
            v-show="isTop"
            class="tab_control_hide"
            ref="tabControlHide"
        ></tab-control>

        <scroll
            class="scroll"
            ref="scroll"
            :probeType="3"
            :needPullUpLoad="true"
            :needPullDownRefresh="true"
            @scrollCheck="scrollCheck"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
        >
            <banner
                :imageBanner="bannerimage"
                :linkBanner="bannerlink"
                :titleBanner="bannertitle"
                class="home_banner"
                @swiperImgLoad="swiperImgLoad"
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
                ref="tabControlShow"
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
import { debounce } from "../../common/utils.js";
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
            isTop: false,
            tabContOffSetTop: 0,
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
    updated() {
        // 这是更新后获得的505高度，但是用更新生命周期探测太不优雅了，尝试别的？
    },
    activated() {
        // 活跃时触发
        this.$refs.scroll.bs.refresh();
        // console.log(this.$refs.scroll.ToScrollY());
    },
    deactivated() {
        // 不活跃时触发
        // 可以利用这个记录离开时scroll y的高度，到达活跃时再次使用这个高度
        // 但这里的bug新版本已经解决，不需要再次 bs.refresh()重定向
        // console.log(this.$refs.scroll.ToScrollY());
    },
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
                    this.baseGoodsType = "";
                    break;
            }
            // 让这两个都改为相同的isactive
            this.$refs.tabControlHide.isactive = index;
            this.$refs.tabControlShow.isactive = index;
        },

        homeBackTop() {
            this.$refs.scroll.backTop();
        },

        scrollCheck(position) {
            // 检查InBackTop
            -position.y > 1000 ? (this.isShow = true) : (this.isShow = false);
            // 检查TabControl
            let addOtherHeight = this.tabContOffSetTop - 43;
            -position.y >= addOtherHeight
                ? (this.isTop = true)
                : (this.isTop = false);
        },

        pullingDown() {
            debounce(() => {
                console.log("down");
            }, 10);
        },

        pullingUp() {
            debounce(() => {
                this.togetGoodsHome(this.baseGoodsType);
            }, 300);
        },

        swiperImgLoad() {
            this.tabContOffSetTop = this.$refs.tabControlShow.$el.offsetTop;
            // 获取获得轮播图图片后的banner对页面的高度
            // 要获取原生属性的话要写$el
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
.tab_control_hide {
    width: 100%;
    position: fixed;
    z-index: 9;
}
</style>