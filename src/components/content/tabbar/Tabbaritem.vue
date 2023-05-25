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
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    white-space: nowrap;  
    /* 强制不换行 */
    background-color: #f0f0f0;
}
.tabbaritem_style > li {
    font-size: 1.375rem;
}
</style>