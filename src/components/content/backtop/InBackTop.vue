<template>
    <div class="back_top">
        <span class="back_top_text">↑</span>
    </div>
</template>

<script>
export default {
    name: "InBackTop",
    props: {},

    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style  scoped>
.back_top {
    width: 35px;
    height: 35px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 73px;
    right: 15px;
    opacity: .7;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.874);
    border-radius: 45%;
}
.back_top_text {
    font-weight: bold;
    font-size: 2rem;
    color: rgba(23, 163, 249, 0.699);
}
</style>