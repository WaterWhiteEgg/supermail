<template>
    <div class="bottombar">
        <div id="loading-spinner" v-show="loadState"></div>

        <popup class="popup" :popupText="popupText"></popup>
        <div class="bottombar_icon">
            <span class="bottombar_icon_kefu" @click="callCM">
                <img src="~/assets/img/svg/detail/kefu.svg" alt="" />
                <div>客服</div></span
            ><span class="bottombar_icon_shangpin">
                <img src="~/assets/img/svg/detail/shangpin.svg" alt="" />
                <div>店铺</div></span
            ><span
                class="bottombar_icon_shoucang"
                @click="changeStar(isChangeStar)"
                v-if="isChangeStar"
            >
                <img src="~/assets/img/svg/detail/shoucang.svg" alt="" />
                <div>收藏</div>
                <div
                    id="loading-spinner"
                    class="loading_star"
                    v-show="loadStateStar"
                ></div>
            </span>
            <span
                class="bottombar_icon_shoucang bottombar_icon_shoucang_Off"
                @click="changeStar(isChangeStar)"
                v-else
            >
                <img src="~/assets/img/svg/detail/shoucang.svg" alt="" />
                <div>已收藏</div>
                <div
                    id="loading-spinner"
                    class="loading_star"
                    v-show="loadStateStar"
                ></div>
            </span>
        </div>
        <div class="bottombar_car" v-if="isChangeCar">
            <button @click="changeCar(isChangeCar)">加入购物车</button>
        </div>
        <div class="bottombar_car bottombar_car_off" v-else>
            <button @click="changeCar(isChangeCar)">删除购物车</button>
        </div>
        <div class="bottombar_buy"><button>购买</button></div>
    </div>
</template>

<script>
import Popup from "../../../components/common/popup/Popup.vue";

export default {
    name: "DetailBottomBar",
    components: {
        Popup,
    },
    props: {
        isCartlistIid: {
            type: Boolean,
            default: false,
        },
        isStarIid: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        // 根据父组件给的状态转换按钮
        isCartlistIid(newval, oldval) {
            this.isChangeCar = !newval;
        },
        isStarIid(newval, oldval) {
            this.isChangeStar = !newval;
        },
    },
    data() {
        return {
            popupText: "",
            loadState: false,
            loadStateStar: false,
            isChangeCar: true,
            isChangeStar: true,
        };
    },
    computed: {},

    mounted() {},

    methods: {
        // 判断是否需要切换按钮，以及需要进行的操作是添加或者删除
        changeCar(isChangeCar) {
            this.$emit(
                "changeCar",
                isChangeCar,
                this.changeCarCallback,
                this.changeLoadStateCallback
            );
        },
        // 用于回调父组件成功或者失败的状态并执行
        changeCarCallback(status) {
            if (status) {
                this.popupText = "操作失败";
            } else {
                this.changeText(this.isChangeCar, "添加到购物车", "移除购物车");
            }
            this.$store.commit("openPopup");
        },
        changeLoadStateCallback(loadState) {
            // 显示加载判断
            this.loadState = loadState;
        },
        changeText(istrue, Ttext, Ftext) {
            if (istrue) {
                this.addtext(Ttext);
            } else {
                this.deltext(Ftext);
            }
        },
        deltext(text) {
            this.popupText = text;
        },
        addtext(text) {
            this.popupText = text;
        },
        callCM() {
            // alert("你拨打的用户正在跑路中，请稍后再拨");
        },
        // 收藏切换判断以及使用什么接口
        changeStar(istrue) {
            this.$emit(
                "changeStar",
                istrue,
                this.changeStarLoadingCallback,
                this.changeStarCallback
            );
        },
        changeStarLoadingCallback(loadStateStar) {
            this.loadStateStar = loadStateStar;
        },
        changeStarCallback(status) {
            if (status) {
                this.popupText = "操作失败";
            } else {
                this.changeText(this.isChangeStar, "添加到收藏", "移除收藏");
            }
            this.$store.commit("openPopup");
        },
    },
};
</script>


<style scoped>
@import url("~assets/css/loader.css");
.popup {
    box-sizing: border-box;
    top: 0;
    left: 0;
    /* position: absolute; */
    transform: translate(calc(50vw - 50%), -50vh);
    /* display: none; */
    padding: 0px 10px;

    z-index: 999;
}
.loading_star {
    bottom: 0;
    left: 40vw !important;
}
button {
    padding: 0;
    margin: 0;
    border: 0;
    width: 100%;
    height: 100%;
}
.bottombar {
    display: flex;
    position: absolute;
    height: 48px;
    width: 100%;
    bottom: 0;
    background-color: #fff;
}
.bottombar .bottombar_icon {
    flex: 5;
    height: 100%;
    display: flex;
}
.bottombar .bottombar_car {
    flex: 2.5;
}
.bottombar .bottombar_buy {
    flex: 2.5;
}

.bottombar .bottombar_car button {
    background-color: #ffec5a;
}
.bottombar .bottombar_buy button {
    background-color: #00ce00;
}
.bottombar .bottombar_icon span {
    align-items: flex-start;
    text-align: center;
}
.bottombar .bottombar_icon span img {
    padding-top: 6px;

    width: 30%;
}
.bottombar .bottombar_icon span div {
    font-size: 12px;
}
.bottombar .bottombar_icon .bottombar_icon_shangpin {
    opacity: 0.5;
}
.bottombar .bottombar_icon .bottombar_icon_kefu {
    background-color: #ffedf7;
}
.bottombar_car_off button {
    background-color: red !important;
    color: #ffffff;
}
.bottombar_icon_shoucang_Off {
    background-color: #ffae00cc;
}
</style>