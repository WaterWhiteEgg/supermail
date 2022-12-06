<template>
    <div>
        <Navbar class="home_navbar">
            <template #center>购物街破解版</template>
        </Navbar>
        <Banner :allBanner="banner" ></Banner>
        <div>
            <!-- 轮播图 -->
            <!-- {{ banner }} -->
        </div>
    </div>
</template>


<script>
import Navbar from "components/common/navbar/Navbar.vue";
import Banner from "components/common/swiper/Swiper.vue";

import { getHomeData } from "../../network/home";
export default {
    name: "Home",
    data() {
        return {
            banner: [],
            dKeyword: {},
            keywords: {},
            recommend: {},
            // 网络请求
        };
    },
    components: {
        Navbar,
        Banner,
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
                console.log(this.banner);
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