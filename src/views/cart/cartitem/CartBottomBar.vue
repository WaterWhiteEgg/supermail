<template>
    <div class="cartbottom">
        <div class="cartbottom_checked">
            <click-button :isChecked="true"></click-button>
            <span>全选</span>
        </div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
import ClickButton from '../../../components/content/clickbutton/ClickButton.vue';
export default {
    components: { ClickButton },
    name: "CartBottomBar",

    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style scoped>
.cartbottom {
    position: relative;
    height: 2rem;
    bottom: 2.0625rem;
    background-color: red;
}
</style>