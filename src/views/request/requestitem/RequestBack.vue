<template>
    <div class="request_back">
        <div @click="requestReturn" class="request_back_return">
            <span class="request_back_return_item">返回</span>
        </div>
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
        requestReturn() {
            this.$router.go(-1);
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
    .request_back_item span {
        max-width: 30px;
    }
    .request_back_return_item {
        display: block;
        padding: 1vh 1vw;
        max-width: 30px;
    }
}
.request_back {
    height: 15vh;
    max-width: 40px;
    padding-right: 40vw;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    text-align: center;
}
.request_back_item {
    background: #dff8fb8a !important;
    border-right: 0.2px solid #00000037;
}
.request_back_item span {
    display: block;
    padding: 8vh 1vw;
}
.request_back_return {
    padding: 1vh 0.5vw;
    border: 0.1px #7b7b7b70 solid;

    background-color: #fff;
    color: #0054d2;
    font-weight: 900;
}
</style>