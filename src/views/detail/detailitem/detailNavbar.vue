<template>
    <div>
        <navbar class="navbar">
            <template #left> <span @click="back" class="navbar_left">＜</span> </template>
            <template #center class="navbar_center"
                ><span
                    v-for="(item, index) in navbarItem"
                    :key="item"
                    class="navbar_item"
                    :class="{ navbar_item_active: index === activeItem }"
                    @click="changeActive(index)"
                >
                    {{ item }}
                </span></template
            ></navbar
        >
    </div>
</template>

<script>

import Navbar from "../../../components/common/navbar/Navbar.vue";
export default {
    name: "datailNavbar",
    components: {
        Navbar,
    },
    data() {
        return {
            navbarItem: ["商品", "参数", "评论", "推荐"],
            activeItem: 0,
        };
    },
    created(){
    },
    mounted() {},

    methods: {
        changeActive(index) {
            this.activeItem = index;
        },
        back() {
            this.$router.go(-1);
        },
    },
};
</script>

<style  scoped>
.navbar {
    border-bottom: 0.4px solid #00000027;
    position: relative;
    top: 0;
    z-index: 9;
background-color: #fff;
}
.navbar_left{
    font-size: 22px;
}
.navbar_center {
    display: flex;
}
.navbar_item {
    padding: 0 8px;
}
.navbar_item_active {
    color: red;
    border-bottom: 2px solid red;
}
</style>