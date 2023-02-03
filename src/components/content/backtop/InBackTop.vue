<template>
    <div class="back_top">
        <span class="back_top_text">↑</span>
    </div>
</template>

<script>
export default {
    name: "InBackTop",
    props: {
       
    },

    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style  scoped>
.back_top {
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 73px;
    right: 15px;
    z-index: 999;
    text-align: center;
    line-height: 1.75rem;
    background-color: rgba(255, 255, 255, 0.874);
    border-radius: 45%;
}
.back_top_text {
    font-weight: bold;
    color: rgba(23, 163, 249, 0.699);
}
</style>