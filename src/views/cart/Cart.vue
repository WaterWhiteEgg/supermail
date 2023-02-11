<template >
    <div class="cart"  @click="test">
        <scroll class="scroll" ref="scroll">
            <div>{{ $store.state.cartLists }}</div>
        </scroll>
    </div>
</template>

<script>
import Scroll from "../../components/common/better_scroll/Scroll.vue";
import { sorollRefresh, mixinBackTop } from "../../common/mixin.js";

export default {
    name: "Cart",
    components: { Scroll },
    mixins: [sorollRefresh, mixinBackTop],
    updated() {
        
    },
    methods:{
        test(){
            this.$refs.scroll.bs.refresh();
        }
    }
};
</script>

<style>
.cart {
    height: 100vh;
}
.scroll {
    height: calc(100% - 44px);
    /* background-color: red; */
}
</style>