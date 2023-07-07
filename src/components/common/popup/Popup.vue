<template>
    <div class="popup" :class="{ popup_children_change: $store.state.popup }">
        <span class="popup_children">{{ popupText }} </span>
    </div>
</template>

<script>
// 使用this.$store.commit("openPopup");来触发弹窗，请自行调整在使用的地方调整样式
// this.$store.commit("openPopup");

import { debounce } from "../../../common/utils";
export default {
    name: "Popup",

    data() {
        return {};
    },
    props: {
        popupText: {
            type: String,
            default: "你TM没传值",
        },
    },
    watch: {
        "$store.state.popup"(newdata, olddata) {
            debounce(() => {
                this.$store.commit("closePopup");
            }, 1000);
        },
    },

    mounted() {
        // this.$store.dispatch("shopcarData", this.product);
    },

    methods: {
        open() {
            // console.log(this.start);
            // this.start = !this.start;
            this.$store.commit("openPopup");
        },
    },
};
</script>

<style  scoped>
.popup {
    display: none;
    position: relative;
    left: 50%;
    top: 40%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    height: 16px;
    opacity: 0;
    transition: 1s;
}
.popup_children {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 1px 8px;
    transition: 1s;
    border-radius: 35px;
    font-size: 14px;
    background-color: #0066ffb7;
    color: #ffffffd2;
}
.popup_children_change {
    display: block;
    opacity: 1;
}
</style>