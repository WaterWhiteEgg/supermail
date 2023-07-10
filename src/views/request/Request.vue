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
import ALLCONST from "../../common/const";
import { validateToken } from "../../../src/network/api";
export default {
    components: { Requestbox, RequestBack, Popup },
    name: "Request",

    data() {
        return {
            popupText: "",
        };
    },
    methods: {
        pushPopupText(text) {
            // 执行子组件给的弹窗
            this.popupText = text;
            this.$store.commit("openPopup");
        },
        commitToken(bal, text) {
            this.$store.commit("chengeIsRequest", bal);
            this.pushPopupText(text);
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
        // 判断是否token验证成功，只要是false就是登录成功的
        validateToken(ALLCONST.codes.token)
            .then((res) => {
                // 状态码为1的时候有错误

                if (res.data.status) {
                    this.commitToken(true, res.data.message);
                } else {
                    this.commitToken(false, res.data.message);
                }
            })
            .catch((err) => {
                this.commitToken(true, "登录失败，请重新登录");
            });
    },
};
</script>

<style  scoped>
@media screen and (max-width: 768px) {
    .request {
        flex-direction: row !important;
    }
}

.request {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>