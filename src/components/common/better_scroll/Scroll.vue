// 默认教程里是要处理图片异步操作检测的
// 但是最新的BatterScroll是带了个插件，使用插件可以检测DOM元素的变化以及图片的变化
// 若要使用教程，可以有以下办法
// 1.@load加载 load事件是等完全加载完毕后触发 给每个图片都加上这个（在循环里）
// 2.加载完后通知，bs.refresh()重新计算滚动高度
// 但是bs.refresh()在哪呢，放哪里好呢，肯定的在scroll里，但是需要重新计算的是home
// 所以home里要拿到bs(子传父)
// 然后图片响应也是要告诉home知道的，但是图片监听是在 home -- goodsitem -- gooditemdata里
// 所以可以子传父两次获得
// 可以使用vuex管理获得
// ::可以再vue.config.js里注册原生事件，用于存储所有方法
// ::例如
// vue.config.js//
// Vue.prototype.$bus = new Vue();

// gooditemdata.vue//
// methods:{
// imgLoad(){
// this.$bus.$emit("aaa");
// }
// }

// home.vue//
// this.$bus.$on("aaa",()=>{
//     console.log("我get到啦");
// })
// ps:注意组件挂载，有时候scroll因为挂载的慢，有可能在DOM完事之后他没加载出就用了，要做容错处理
// 做短路运算 && 判断值为空时不再执行后面 , 是否created在创建时拿不到
<template>
    <div class="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pulldown from "@better-scroll/pull-down";
import Pullup from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
export default {
    name: "Scroll",

    data() {
        return {
            bs: null,
        };
    },
    props: {
        probeType: {
            type: Number,
            default: 0,
        },
        needPullUpLoad: {
            type: Boolean,
            default: false,
        },
        needPullDownRefresh: {
            type: Boolean,
            default: false,
        },
    },

    mounted() {
        BScroll.use(Pulldown);
        BScroll.use(Pullup);
        BScroll.use(ObserveDOM);
        BScroll.use(ObserveImage);
        // 使用插件
        this.bs = new BScroll(".wrapper", {
            probeType: this.probeType,
            // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
            // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
            // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
            // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
            click: true,
            // 允许执行原生点击事件,不然div无法点击
            // resizePolling:60,
            pullDownRefresh: this.needPullDownRefresh,
            // 下拉检测插件的使用
            pullUpLoad: this.needPullUpLoad,
            // 上拉检测插件的使用
            observeDOM: true,
            // 检测dom元素变化重新计算的插件
            observeImage: true,
            // 专门检查图片变化的插件
        });

        this.bs.on("scroll", (position) => {
            // console.log(position);
            this.bs && this.$emit("scrollCheck", position);
            // 滚动时触发事件，position提供xy数值
        });

        if (this.needPullDownRefresh) {
            this.bs.on("pullingDown", () => {
                this.$emit("pullingDown");
                this.bs.finishPullDown();
                // 这样可以重复执行
            });
        }

        if (this.needPullUpLoad) {
            this.bs.on("pullingUp", () => {
                this.$emit("pullingUp");

                this.bs.finishPullUp();
                // 这样可以重复执行
            });
        }
    },

    methods: {
        backTop(x = 0, y = 0, time = 100) {
            this.bs && this.bs.scrollTo(x, y, time);
            // 跳转到某个地方
        },
        ToScrollY() {
            return this.bs ? this.bs.y : 0;
            // 获得其y的值
        },
    },
};
</script>

<style  scoped>
</style>