<template>
    <div class="wrapper">
        <div class="content">
            <button @click="ff">dd</button>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
            <li>fff</li>
        </div>
    </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pulldown from "@better-scroll/pull-down";
import Pullup from '@better-scroll/pull-up';

export default {
    name: "HomeView",
    data() {
        return {
            bs: null,
            bss: null,
        };
    },
    methods: {
        ff() {
            console.log(1);
        },
    },
    mounted() {
        // 在这里才能获取到DOM元素
        BScroll.use(Pulldown);
        this.bss = new BScroll(".wrapper", {
            pullDownRefresh: true,
        });

        this.bs = new BScroll(".wrapper", {
            probeType: 3,
            // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
            // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
            // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
            // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
            // click: true,
            
            // 允许执行原生点击事件
        });
        this.bs.on("scroll", (position) => {
            // console.log(position);
        });
        this.bss.on("pullingDown", () => {
            this.bss.finishPullDown();
            // 这样可以重复执行
            console.log('position');
        });
    },
};
</script>

<style>
.wrapper {
    height: 150px;
    background-color: red;
}
</style>