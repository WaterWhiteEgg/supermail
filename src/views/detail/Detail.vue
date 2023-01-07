<template>
    <div>
        <detail-navbar></detail-navbar>
        <p>{{ iid }}</p>
    </div>
</template>

<script>
import { getdetailItem } from "../../network/detail";

import detailNavbar from "./detailitem/detailNavbar.vue";
export default {
    name: "Detail",
    components: {
        detailNavbar,
    },

    data() {
        return {
            iid: null,
        };
    },
    created() {},
    activated() {
        if (!(this.iid === this.$route.query.iid)) {
            // 如果iid已经相同则不需要再次请求网络
            this.iid = this.$route.query.iid;
            getdetailItem(this.iid).then((res) => {
                console.log(res);
            });
        }
    },
    mounted() {},

    methods: {},
};
</script>

<style lang="scss" scoped>
</style>