<template>
    <div class="popup" >
        <span
            class="popup_children"
            :class="{ popup_children_change: $store.state.popup }"
            @click="open"
            >{{ popupText }}
        </span>
    </div>
</template>

<script>
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

.popup_children {
    position: absolute;
    opacity: 0;
    height: 16px;
    padding: 1px 8px;
    z-index: 999;
    left: 50%;
    top: 40%;
    transition: 1s;
    border-radius: 35px;
    font-size: 14px;
    transform: translateX(-50%) translateY(-50%);
    background-color: #0066ffb7;
    color: #ffffffd2;
}
.popup_children_change {
    opacity: 1;
}
</style>