<template>
    <div class="goodsinfo">
        <div class="goodsinfo_desc">
            <p class="goodsinfo_desc_left">
                ■<span
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
            </p>
            {{ detailInfo.desc }}
            <p class="goodsinfo_desc_right">
                <span class="goodsinfo_desc_right_nbsp"
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
                <span>■</span>
            </p>
        </div>
        <div class="goodinfo_title">
            <p>{{ title }}</p>
        </div>
        <div class="goodinfo_image">
            <a :href="item" v-for="(item, index) in image" :key="index + item">
                <img :src="item" :alt="item" @load="loadItem" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailGoodsInfo",
    props: {
        detailInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        title() {
            // 短路算法容错处理
            return (
                this.detailInfo.detailImage &&
                this.detailInfo.detailImage[0].key
            );
        },

        image() {
            return (
                this.detailInfo.detailImage &&
                this.detailInfo.detailImage[0].list
            );
        },
    },
    data() {
        return {};
    },
    updated() {
        // console.log(this.detailInfo.detailImage[0]);
    },
    mounted() {},

    methods: {
        loadItem() {
            this.$emit("loadGoodsInfo");
        },
    },
};
</script>

<style  scoped>
.goodsinfo_desc {
    color: #3e3c3ce6;
}
.goodsinfo_desc_left span,
.goodsinfo_desc_right .goodsinfo_desc_right_nbsp {
    text-decoration: underline;
}
.goodsinfo_desc_left span {
    position: relative;
    top: -3px;
    margin-left: -2px;
}
.goodsinfo_desc_right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}

.goodsinfo_desc_right_nbsp {
    margin-right: -2px;
    position: relative;
    top: -3px;
}
.goodinfo_image a {
    width: 100%;
}
.goodinfo_image {
    width: 100vw;
    display: flex;
    flex-direction: column;
}
.goodinfo_image a img {
    flex: 1;
    width: 100%;
}
</style>