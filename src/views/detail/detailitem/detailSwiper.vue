<template>
    <div>
        <!-- {{topImg}} -->
        <swiper :imageBanner="topImg" :linkBanner="topImg" class="detail_swiper"></swiper>
    </div>
</template>

<script>
import Swiper from "../../../components/common/swiper/Swiper.vue";
export default {
    components: { Swiper },
    name: "detailSwiper",
    props: {
        topImg: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style scoped>
.detail_swiper{
    width: 100%;
    height: 50vh;
}
</style>