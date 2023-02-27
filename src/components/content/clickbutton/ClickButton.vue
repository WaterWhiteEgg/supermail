<template>
    <div>
        <span class="checkbox" :class="{ checkbox_on: isChecked }"></span>
    </div>
</template>

<script>
export default {
    name: "ClickButton",
    props: {
        isChecked: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style  scoped>
.checkbox_on {
    background-color: #0059ff !important;
    border: 0 !important;
}
.checkbox_on::after {
    content: "√";
    font-size: 16px;
    font-weight: 900;
    color: #fff;
}
.checkbox {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    margin: 0 0.3rem;
    border-radius: 35px;
    border: 0.1px solid #000;
    background: #f8f8f8;
}
</style>