<template >
    <div class="cart">
        <cart-navbar :cartLists="cartLists"></cart-navbar>
        <scroll class="scroll" ref="scroll">
            <cart-item-data
                :cartLists="cartLists"
                class="cart_list"
            ></cart-item-data>
        </scroll>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import Scroll from "../../components/common/better_scroll/Scroll.vue";
import { sorollRefresh, mixinBackTop } from "../../common/mixin.js";
import CartItemData from "./cartitem/CartItemData.vue";
import CartBottomBar from "./cartitem/CartBottomBar.vue";
import CartNavbar from "./cartitem/CartNavbar.vue";

export default {
    name: "Cart",
    components: { Scroll, CartItemData, CartBottomBar, CartNavbar },
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
@media screen and (max-width: 768px) {
.scroll {
    /* height: calc(100% - 43px - 50.5px - 32px); */
    /* height: 100px; */
    /* background-color: red; */
}
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
.cart_list {
}
</style>