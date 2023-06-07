<template>
    <div class="user">
        <navbar class="user_navbar">
            <template #center>笔蓝档案</template>
        </navbar>
        <userlogin></userlogin>
        <usershowbox></usershowbox>
        <step-form
            :stepFromData="stepFromData"
            :iconPath="iconPath"
        ></step-form>
        <step-form
            :stepFromData="stepExtendFromData"
            :iconPath="iconPath"
        ></step-form>
    </div>
</template>

<script>
import Navbar from "../../components/common/navbar/Navbar.vue";
import Userlogin from "./useritem/Userlogin.vue";
import Usershowbox from "./useritem/Usershowbox.vue";
import StepForm from "../../components/common/stepform/StepForm.vue";
export default {
    components: { Navbar, Userlogin, Usershowbox, StepForm },
    name: "User",
    data() {
        return {
            // 通过props传数据来渲染数据
            // name：表示你显示的名字
            // ico：表示你要显示的图标
            stepFromData: [
                {
                    name: "我的信息",
                    iconame: "message",
                },
                {
                    name: "积分商城",
                    iconame: "points_mall",
                },
                {
                    name: "会员了解一下",
                    iconame: "vip",
                },
            ],
            stepExtendFromData: [
                {
                    name: "我的购物车",
                    iconame: "shopcar",
                },
                {
                    name: "下载零元购app",
                    iconame: "shopping_bag",
                },
            ],
            iconPath: "assets/img/svg/user/",
        };
    },
    methods: {},
};
</script>

<style scoped>
.user_navbar {
    background-color: #a5d6ff;
}
</style>