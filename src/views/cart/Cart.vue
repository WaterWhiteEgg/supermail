<template >
    <div class="cart">
        <navbar class="cartnav">
            <template #center
                >购物车
                <span class="cartnav_cartNumber" v-if="cartLists.length">{{
                    "{" + cartLists.length + "}"
                }}</span>
            </template>
        </navbar>
        <scroll class="scroll" ref="scroll">
            <cart-item-data
                :cartLists="cartLists"
                class="cart_list"
            ></cart-item-data>
        </scroll>
    </div>
</template>

<script>
import Scroll from "../../components/common/better_scroll/Scroll.vue";
import { sorollRefresh, mixinBackTop } from "../../common/mixin.js";
import Navbar from "../../components/common/navbar/Navbar.vue";
import CartItemData from "./cartitem/CartItemData.vue";

export default {
    name: "Cart",
    components: { Scroll, Navbar, CartItemData },
    data() {
        return {
            cartLists: this.$store.state.cartLists,
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
        this.$refs.scroll.bs.refresh();
    },
    methods: {},
};
</script>

<style>
.cart {
    height: 100vh;
    overflow: hidden;
}
.scroll {
    height: calc(100% - 93px);
    /* height: 100px; */
    /* background-color: red; */
}
.cart_list {
    min-height: 100vh;
}
.cartnav {
    position: relative;
    z-index: 9;
    background-color: #ffd900;
    color: #4458bd;
    font-weight: bold;
}
</style>