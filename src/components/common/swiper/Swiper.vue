<template>
    <div id="swiper">
        <div class="swiper-wrapper">
            <div
                class="swiper-slide"
                v-for="(item, index) in imageBanner"
                :key="titleBanner[index]"
            >
                <a :href="linkBanner[index]">
                    <img
                        :src="item"
                        :alt="titleBanner[index]"
                        :style="changeHeight(index)"
                    />
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <!-- 分页器 -->

        <!-- 导航按钮 -->
        <!-- <div class="swiper-button-prev"></div> -->
        <!-- <div class="swiper-button-next"></div> -->

        <!-- 滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
    </div>
</template>

<script>
import Swiper from "swiper";

import "swiper/css/swiper.min.css";
export default {
    name: "Swiper",
    data() {
        return {};
    },
    updated() {
        // 创数据更新后后执行
        // 传输的第一个值是让什么class变成swiper控制的，第二个选项是可选的控制
        // 若一个页面用多个swiper，用id表示区别
        new Swiper("#swiper", {
            initialSlide: 0,
            // 默认从第几个视图开始
            speed: 300,
            // 切换速度
            autoplay: {
                delay: 90000000000000000000000,
                // 什么时候开始
                disableOnInteraction: false,
                // 操作后不停止轮播图
            },
            // 自动播放
            // https://swiper.com.cn/api/parameters/21.html
            loop: true,
            // 分页器
            pagination: {
                el: ".swiper-pagination",
            },
            // 前进后退按钮
            // nextButton: ".swiper-button-next",
            // prevButton: ".swiper-button-prev",
            // 滚动条
            // scrollbar: ".swiper-scrollbar",
        });
    },
    props: {
        imageBanner: {
            type: Array,
            default: function () {
                return [];
            },
        },
        titleBanner: {
            type: Array,
            default: function () {
                return [];
            },
        },
        linkBanner: {
            type: Array,
            default: function () {
                return [];
            },
        },
        heightBanner: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },
    computed: {
        changeHeight() {
            return (index) => {
                // 若在计算函数里传递值，应该返回的是一个函数，并且值在这里传
                return "height:" + this.heightBanner[index] + "px";
            };
        },
    },
};
</script>

<style>
#swiper {
    position: relative;
    overflow: hidden;

    --swiper-theme-color: #00fff263;
}
.swiper-slide img {
    width: 100%;
    height: 100%;
}
.swiper-slide a{
    display:block;
}
</style>