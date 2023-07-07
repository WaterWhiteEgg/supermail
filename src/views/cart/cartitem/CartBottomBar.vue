<template>
    <div class="cartbottom">
        <div class="cartbottom_checked">
            <click-button
                :isChecked="$store.state.isAllCartListsCheck"
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
                >去计算:{{ toIsChecked.length }}</span
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
        return {};
    },

    mounted() {},
    computed: {
        toIsChecked() {
            return this.$store.state.cartLists.filter((item) => {
                return item.isChecked;
            });
        },
        totalPrice() {
            return this.toIsChecked.reduce((preValue, item) => {
                return (preValue += item.price * item.quantity);
            }, 0);
        },
    },

    methods: {
        changeChecked() {
            this.$store.commit("changeIsAllCartListsCheck");
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
    height: 48px;
    bottom:0;
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0084ff;
    font-size: 1rem;

}
.cartbottom_buy_button {
color: #ffffff;
}
</style>