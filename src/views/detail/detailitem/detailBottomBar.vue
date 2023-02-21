<template>
    <div class="bottombar">
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
                @click="changeStar(true)"
                v-if="$store.state.donChangeStar"
            >
                <img src="~/assets/img/svg/detail/shoucang.svg" alt="" />
                <div>收藏</div>
            </span>
            <span
                class="bottombar_icon_shoucang bottombar_icon_shoucang_Off"
                @click="changeStar(false)"
                v-else
            >
                <img src="~/assets/img/svg/detail/shoucang.svg" alt="" />
                <div>已收藏</div>
            </span>
        </div>
        <div class="bottombar_car" v-if="$store.state.donChangeCar">
            <button @click="changeCar(true)">加入购物车</button>
        </div>
        <div class="bottombar_car bottombar_car_off" v-else>
            <button @click="changeCar(false)">删除购物车</button>
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

    data() {
        return {
            popupText: "添加到购物车",
        };
    },
    computed: {},

    mounted() {},

    methods: {
        changeCar(istrue) {
            this.$emit("changeCar", istrue);
            this.changeText(istrue);
            this.$store.commit("openPopup");
        },

        changeText(istrue) {
            
            if (istrue) {
                this.addtext();
            } else {
                this.deltext();
            }
        },
        deltext() {
            this.popupText = "移除购物车";
        },
        addtext() {
            this.popupText = "添加到购物车";
        },
        callCM() {
            alert("你拨打的用户正在跑路中，请稍后再拨");
        },
        changeStar(istrue) {
            this.$emit("changeStar", istrue);
        },
    },
};
</script>


<style scoped>
.popup {
    transform: translate(0, -50vh);
    /* display: none; */
    position: absolute;
    width: 100vh;
    width: 100vw;
    box-sizing: border-box;

    z-index: 999;
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
.bottombar_icon_shoucang_Off{
    background-color: #ffae00cc;
}
</style>