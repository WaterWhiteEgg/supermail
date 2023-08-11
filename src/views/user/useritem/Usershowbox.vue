<template>
    <div class="usershowbox">
        <!-- 虽然考虑过for循环生成，但是数据实在是没有，等到有数据能整合到一个对象里再说 -->
        <span>
            <p class="usershowbox_number">0元</p>
            <p>余额</p>
        </span>
        <span>
            <p class="usershowbox_number">
                {{ $store.state.cartListStarsData.length }}个
            </p>
            <p>收藏</p>
        </span>
        <span>
            <p class="usershowbox_number">{{ $store.state.cartListsData.length }}个</p>
            <p>购买</p>
        </span>
    </div>
</template>

<script>
import ALLCONST from "../../../common/const";

import { cartListsSelect } from "../../../network/cart";
import { favoriteStarsSelect } from "../../../network/favoriteStars";
export default {
    name: "Usershowbox",

    data() {
        return {
            // userValue:['余额','收藏','购买'],
        };
    },

    mounted() {
        // 获取收藏栏信息
        favoriteStarsSelect(ALLCONST.codes.token)
            .then((res) => {
                // 提供给vuex
                this.$store.commit(
                    "pushCartListStarsData",
                    JSON.parse(res.data.data.data)
                );
            })
            .catch((err) => {});
        // 获取购物车栏信息
        cartListsSelect(ALLCONST.codes.token)
            .then((res) => {
                // 提供给vuex
                // console.log(res.data.data.data);
                this.$store.commit("pushCartListsData", res.data.data.data);
            })
            .catch((err) => {});
    },

    methods: {},
};
</script>

<style scoped>
.usershowbox {
    display: flex;
    text-align: center;
    margin-bottom: 2vh;
    background-color: #fff;
}
.usershowbox span {
    flex: 1;
}
.usershowbox span p {
    margin: 0 0 2vh 0;
    font-size: 0.5rem;
}
.usershowbox span .usershowbox_number {
    margin: 2vh 0 1vh 0;
    font-size: 1rem;
    font-weight: 900;
}
</style>