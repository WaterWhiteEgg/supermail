<template>
    <div class="cartbottom">
        <div class="cartbottom_checked">
            <click-button
                :isChecked="isChecked"
                class="cartbottom_checked_on"
                @click.native="changeChecked"
            >
                <template #text>全选</template>
            </click-button>
        </div>
        <div class="cartbottom_price">
            <span>合计:{{ "￥" + totalPrice.toFixed(2) }}</span>
        </div>
        <div class="cartbottom_buy">
            <span class="cartbottom_buy_button"
                >去计算:{{ $store.state.cartLists.length }}</span
            >
        </div>
    </div>
</template>

<script>
import ClickButton from "../../../components/content/clickbutton/ClickButton.vue";
export default {
    components: { ClickButton },
    name: "CartBottomBar",

    data() {
        return {
            isChecked: true,
        };
    },

    mounted() {},
    computed: {
        totalPrice() {
            return this.$store.state.cartLists
                .filter((item) => {
                    return item.isChecked;
                })
                .reduce((preValue, item) => {
                    return (preValue += item.price * item.quantity);
                }, 0);
        },
    },

    methods: {
        changeChecked() {
            this.isChecked = !this.isChecked;
        },
    },
};
</script>

<style scoped>
/* .cartbottom_checked_on {
} */
.cartbottom {
    position: relative;
    display: flex;
    height: 2rem;
    bottom: 2.0625rem;
    /* line-height: 2rem; */
    align-items: center;
    text-align: center;
    background-color: #efefef;
    box-shadow: -0px -2px #3d3d3d21;
}

.cartbottom_price {
    flex: 1;
    padding-left: 0.5rem;
    text-align: left;
}
.cartbottom_buy {
    flex: 0.4;
    height: 100%;
    line-height: 2rem;
    background-color: #0084ff;
}
</style>