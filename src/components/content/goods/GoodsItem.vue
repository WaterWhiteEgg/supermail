<template>
    <div>
        <ul class="goods_item">
            <goods-item-data
                v-for="(item, index) in AllGoods"
                :key="index + item.title"
                :goodsItemData="item"
            >
            </goods-item-data>
        </ul>
    </div>
</template>

<script>
import GoodsItemData from "./GoodsItemData.vue";

export default {
    components: { GoodsItemData },
    name: "GoodsItem",

    data() {
        return {};
    },
    props: {
        AllGoods: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },
    mounted() {},

    methods: {},
};
</script>

<style scoped>
.goods_item {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
}
</style>