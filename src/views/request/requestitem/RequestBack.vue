<template>
    <div class="request_back">
        <div class="request_back_item" @click="backHome">
            <span>返回主页</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "RequestBack",

    data() {
        return {};
    },

    mounted() {},

    methods: {
        backHome() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .request_back {
        width: 100vw !important;
        height: 100% !important;
        padding-right: 0vw !important;
        min-width: 20px;
        /* border-radius: 0% !important; */
        background: linear-gradient(#ffffff8c, #1139ffaf, #34dff24b);
    }
    .request_back_item {
        height: 100% !important;
        padding: 0;
    }
}
.request_back {
    font-size: 1rem;
    height: 23vh;
    max-width: 40px;
    text-align: center;
    padding-right: 40vw;
}
.request_back_item {
        background: #dff8fb8a!important;
    

    border-right: 0.2px solid #00000037;
}
.request_back_item span {
    display: block;
    padding: 8vh 1vw;
}
</style>