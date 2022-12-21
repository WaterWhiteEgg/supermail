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
            },

    mounted() {
        BScroll.use(Pulldown);
        BScroll.use(Pullup);
        BScroll.use(ObserveDOM);
        BScroll.use(ObserveImage);
        // 使用插件
        this.bs = new BScroll(".wrapper", {
            probeType: 3,
            // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
            // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
            // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
            // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
            click: true,
            // 允许执行原生点击事件
            // resizePolling:60,

            pullDownRefresh: true,
            // 下拉检测插件的使用
            pullUpLoad: true,
            // 上拉检测插件的使用
            observeDOM: true,
            // 检测dom元素变化重新计算的插件
            observeImage: true,
            // 专门检查图片变化的插件
        });

        this.bs.on("scroll", (position) => {
            // console.log(position);
            // 滚动时触发事件，position提供xy数值
        });
        this.bs.on("pullingDown", () => {
            this.bs.finishPullDown();
            // 这样可以重复执行
            console.log("down");
            console.log(this.hight);
        });

        this.bs.on("pullingUp", () => {
            this.bs.finishPullUp();
            // 这样可以重复执行
            console.log("up");
        });
    },

    methods: {
        
    },
};
</script>

<style  scoped>
</style>