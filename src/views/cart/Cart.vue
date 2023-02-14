<template >
    <div class="cart">
        <scroll class="scroll" ref="scroll">
            <div class="cart_list">
                <div>{{ cartLists }}</div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from "../../components/common/better_scroll/Scroll.vue";
import { sorollRefresh, mixinBackTop } from "../../common/mixin.js";

export default {
    name: "Cart",
    components: { Scroll },
    data() {
        return {
            cartLists: this.$store.state.cartLists,
        };
    },
    mixins: [sorollRefresh, mixinBackTop],
    watch: {
        cartLists(newlist, oldlist) {
            // this.$refs.scroll.bs.refresh();

        },
    },
    updated() {},
    methods: {
        text() {
            this.$refs.scroll.bs.refresh();
        },
    },
};
</script>

<style>
.cart {
    height: 100vh;
}
.scroll {
    height: calc(100% - 44px);
    /* height: 100px; */
    /* background-color: red; */
}
.cart_list {
    min-height: 100vh;
}
</style>