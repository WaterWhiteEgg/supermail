<template>
    <div class="cartbottom">
        <div class="cartbottom_checked">
            <click-button :isChecked="true">
                <template #text>全选</template>
            </click-button>
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