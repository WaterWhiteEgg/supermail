<template>
    <div>
        <Navbar class="home_navbar">
            <template #center>购物街破解版</template>
        </Navbar>
        <Banner
            :imageBanner="bannerimage"
            :linkBanner="bannerlink"
            :titleBanner="bannertitle"
        >
            <!-- 轮播图 -->
            <!-- {{ banner }} -->
            <!-- :heightBanner="bannerheight" -->
            <!-- 由于高度属性太丑，即使做了，也不要传了 -->
        </Banner>
        <HomeRecommend :listRecommend="recommend.list"></HomeRecommend>
    </div>
</template>


<script>
import Navbar from "components/common/navbar/Navbar.vue";
import Banner from "components/common/swiper/Swiper.vue";
import HomeRecommend from "./homeComps/HomeRecommend.vue"

import { getHomeData } from "../../network/home";
export default {
    name: "Home",
    data() {
        return {
            banner: [],
            bannerimage: [],
            bannerlink: [],
            bannertitle: [],
            bannerheight: [],
            // 太丑了不要
            // 其实，也可以不分的。。。直接写.xxx,但这样好看一点
            dKeyword: {},
            keywords: {},
            recommend: {},
            // 网络请求
        };
    },
    components: {
        Navbar,
        Banner,
        HomeRecommend,
    },
    mounted() {
        // 创建完实例后执行
    },
    created() {
        getHomeData()
            .then((res) => {
                this.banner = res.data.data.banner.list;
                this.dKeyword = res.data.data.dKeyword;
                this.keywords = res.data.data.keywords;
                this.recommend = res.data.data.recommend;
                // console.log(this.banner);
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
};
</script>

<style>
.home_navbar {
    box-shadow: 0px 3px #ababab18;
    background-color: #a5d6ff;
}
</style>