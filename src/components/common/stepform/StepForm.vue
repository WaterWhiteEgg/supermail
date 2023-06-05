<template>
    <div id="stepform">
        <div v-for="item in stepFromData" :key="item.name" class="stepform">
            <div class="stepform_box">
                <img :src="getImageUrl(item.iconame)" alt="" class="stepform_box_ico" />
                <p class="stepform_box_title">{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StepForm",
    props: {
        stepFromData: {
            type: Array,
            default: function () {
                return [];
            },
        },
        iconPath: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
        };
    },
    computed: {},
    methods: {
        getImageUrl(filename) {
            // require()引入相当于转化为相对路径
            // 这样子可以动态传入路径
            // 注意这个艾特@是不能去掉了不然直接传入webpack是不知道你传入的@是啥东西
            return require("@/" + this.iconPath + filename + ".svg");
        },
    },
    mounted() {},
};
</script>

<style  scoped>
#stepform{
    margin-bottom:2vh ;

}
.stepform{
    display: flex;
    background-color: #ffffff;
}
.stepform_box{
    display: flex;
    margin: 0;
    flex: 1;
    border-bottom:.1px solid #00000049 ;

}
.stepform_box_ico{
    padding: 1vh 2vw;
    max-width: 38px;
}
.stepform_box .stepform_box_title{
    margin: 0;
    padding: 1.5vh 0;
}
.stepform_box img{
    width: 5vw;
}
</style>