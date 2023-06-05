<template>
    <div>
        <ul class="tabbar_style">
            <Tabbaritem this_router='/home'>
                <template #tabbarico>
                    <li class="icon-home">首页</li>
                </template>
            </Tabbaritem>
            <Tabbaritem this_router='/homeview'
                ><template #tabbarico>
                    <li class="icon-books">浏览</li>
                </template>
            </Tabbaritem>
            <Tabbaritem this_router='/cart'
                ><template #tabbarico>
                    <li class="icon-cart">购物车</li>
                </template></Tabbaritem
            >
            <Tabbaritem this_router='/user'
                ><template #tabbarico>
                    <li class="icon-user">我的</li>
                </template></Tabbaritem
            >
        </ul>
    </div>
</template>

<script>
import Tabbaritem from "components/content/tabbar/Tabbaritem.vue";

export default {
    name: "Tabbar",
    components: {
        Tabbaritem,
    },
};
</script>

<style>
@import url("~assets/css/tabbar/font-icon.css");
/* 引用字符图标 */
.tabbar_style {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 8vh;
    display: flex;
    position:absolute;
    bottom: -1px;
    left: 0;
    list-style: none;
    font-size: 18px;
    vertical-align: middle;
    background-color: #f0f0f0;

    
}
</style>