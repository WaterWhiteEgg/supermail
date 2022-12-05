<template >
    <div class="tabbaritem_style" :style="isroute" @click="changeRoute">
        <slot name="tabbarico"><li class="icon-home">默认值</li></slot>
    </div>
</template>

<script>
export default {
    name: "Tabbaritem",
    data() {
        return {};
    },
    methods: {
        changeRoute() {
            this.$router.push(this.this_router);
        },
    },
    computed: {
        isroute() {
            return this.$route.path === this.this_router ? "color:red" : {};
        },
    },
    props: {
        this_router: {
            type: String,
            default: "",
        },
    },
};
</script>

<style>
.tabbaritem_style {
    flex: 1;
    height: 100%;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    /* 强制不换行 */
    overflow: hidden;
    border: 0.2px solid #bbbbbb11;
    background-color: #f0f0f0;
}
.tabbaritem_style > li {
    line-height: 2.85rem !important;
}
</style>