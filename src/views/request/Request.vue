<template>
    <div>
        <popup :popupText="popupText" class="popup"></popup>

        <div class="request">
            <request-back></request-back>
            <requestbox @pushPopupText="pushPopupText"></requestbox>
        </div>
    </div>
</template>

<script>
import RequestBack from "./requestitem/RequestBack.vue";
import Requestbox from "./requestitem/Requestbox.vue";
import Popup from "../../components/common/popup/Popup.vue";
export default {
    components: { Requestbox, RequestBack, Popup },
    name: "Request",

    data() {
        return {
            popupText: "验证失败，请重新登录",
        };
    },
    methods: {
        pushPopupText(text) {
            // 执行子组件给的弹窗
            this.popupText = text;
            this.$store.commit("openPopup");
        },
    },
    created() {
        this.$store.commit("changeNeedTabber");
        // 改变vueX的needTab    其不显示
    },

    beforeDestroy() {
        // 当销毁前再次把vueX托管的值改变
        this.$store.commit("changeNeedTabber");
    },
    mounted() {
        // 挂载好后将弹窗显示
        // 弹窗显示
        this.$store.commit("openPopup");
    },
};
</script>

<style  scoped>
@media screen and (max-width: 768px) {
    .request {
        flex-direction: row !important;
    }
}
.popup {
}
.request {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>