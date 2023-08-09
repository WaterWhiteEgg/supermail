<template >
    <div class="cart">
        <cart-navbar :cartLists="cartLists"></cart-navbar>
        <scroll class="scroll" ref="scroll">
            <cart-item-data
                :cartLists="cartLists"
                @removeCartitems="removeCartitems"
                class="cart_list"
            ></cart-item-data>
        </scroll>
        <cart-bottom-bar :cartLists="cartLists"></cart-bottom-bar>
    </div>
</template>

<script>
import Scroll from "../../components/common/better_scroll/Scroll.vue";
import { sorollRefresh, mixinBackTop } from "../../common/mixin.js";
import {
    cartListsPush,
    cartListsRemove,
    cartListsSelect,
} from "../../network/cart";
import ALLCONST from "../../common/const";
import CartItemData from "./cartitem/CartItemData.vue";
import CartBottomBar from "./cartitem/CartBottomBar.vue";
import CartNavbar from "./cartitem/CartNavbar.vue";

export default {
    name: "Cart",
    components: { Scroll, CartItemData, CartBottomBar, CartNavbar },
    data() {
        return {
            cartLists: [],
        };
    },
    mixins: [sorollRefresh, mixinBackTop],
    watch: {
        // cartLists: {
        //     handler(newName, oldName) {
        //         this.$refs &&
        //             this.$refs.scroll &&
        //             this.$refs.scroll.bs.refresh();
        //             console.log(1);
        //     },
        //     immediate: true,
        // },
    },
    updated() {},
    activated() {
        // 活跃时就请求购物列表
        cartListsSelect(ALLCONST.codes.token)
            .then((res) => {
                if (!res.data.status) {
                    // 验证成功后提供数组
                    // console.log(res);
                    // console.log(res.data.data.data);
                    this.cartLists = res.data.data.data;
                } else {
                    // 否则跳转到登录界面
                    this.$router.push("/request");
                }
            })
            .catch();
    },
    mounted() {},
    methods: {
        // 请求删除数据库
        removeCartitems(item, callback) {
        // 请求删除数据库的组件

            cartListsRemove(ALLCONST.codes.token, item).then((result) => {
                // console.log(result);
                // 删除后再次cartListsSelect请求
                cartListsSelect(ALLCONST.codes.token).then((result) => {
                    // 不需要再次验证token的错误
                    this.cartLists = result.data.data.data;
                    // 回调状态
                    callback(false);
                });
            });
        },
    },
};
</script>

<style>
@media screen and (max-width: 768px) {
}
.cart {
    height: 100vh;
    overflow: hidden;
}
.scroll {
    height: calc(100% - 43px - 65px - 48px);
    /* height: 100px; */
    /* background-color: red; */
}
</style>