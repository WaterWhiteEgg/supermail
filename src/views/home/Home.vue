<template>
    <div>
        <Navbar class="home_navbar">
            <template #center>购物街破解版</template>
        </Navbar>
        <div>
            轮播图
            {{banner }}
        </div>
    </div>
</template>


<script>
import Navbar from "components/common/navbar/Navbar.vue";

import { getHomeData } from "../../network/home";
export default {
    name: "Home",
    data() {
        return {
            banner: {},
            dKeyword: {},
            keywords: {},
            recommend: {},
            // 网络请求
        };
    },
    components: {
        Navbar,
    },
    created() {
        getHomeData()
            .then((res) => {
                this.banner = res.data.data.banner;
                this.dKeyword = res.data.data.dKeyword;
                this.keywords = res.data.data.keywords;
                this.recommend = res.data.data.recommend;
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