<template>
    <div>
        <scroll class="hight">
            <div>数据栏</div>
        </scroll>
    </div>
</template>

<script>
import Scroll from "components/common/better_scroll/Scroll.vue";

export default {
    components: { Scroll },
    name: "HomeView",
    data() {
        return {};
    },
    methods: {},
    mounted() {
        // 在这里才能获取到DOM元素
    },
};
</script>

<style scoped>

</style>