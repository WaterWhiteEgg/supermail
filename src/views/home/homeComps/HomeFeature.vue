<template>
    <div class="feature">
        <h3>今日推荐</h3>
        <div v-if="featureData !== {}">
            <p  >暂时没有推荐。。。</p>
            <img src="../../../assets/img/none.jpeg" alt="" />
        </div>
        <div v-else>
            <a :href="featureData">
            <img :src="featureData" alt="" />

            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeFeature",

    data() {
        return {};
    },

    props: {
        featureData: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    mounted() {},

    methods: {},
};
</script>

<style  scoped>
.feature h3{
    margin: 0;
}
.feature {
    width: 100%;
    height: 10.5rem;
    margin-bottom:.1875rem ;
    text-align: center;
    line-height: 28px;
    
background-color: #f7f5f4be;
}
.feature p {
    margin: 0;

}
.feature img {
    width: 100px;

}
</style>