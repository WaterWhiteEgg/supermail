<template>
    <li class="goods_item_data">
        <a :href="goodsItemData.link">
            <!-- {{ goodsItemData }} -->
            <img :src="goodsItemData.show.img" :alt="goodsItemData.title" />
            <p class="title" :alt="goodsItemData.title">
                {{ goodsItemData.title }}
            </p>
        </a>

        <span class="price">价格:{{ goodsItemData.price }}</span>
        <span class="collect">★{{ goodsItemData.cfav }}</span>
    </li>
</template>

<script>
export default {
    name: "GoodsItemData",

    data() {
        return {};
    },
    props: {
        goodsItemData: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },

    mounted() {},

    methods: {},
};
</script>

<style  scoped>
.goods_item_data {
    width: 46%;
    margin: 2% 2%;
}
.goods_item_data a {
    width: 100%;
    height: 100%;
    color: black;
    text-decoration: none;
}
.goods_item_data a img {
    width: 100%;
    border-radius: 5px;
}
.title {
    margin: 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
}
.price {
    font-size: 12px;
    color: #3700ff;
    text-shadow: 1px 1px #4ac6ff;
}
.goods_item_data  .collect {
    margin-right: 10%;
    float: right;
    color: #ffa600;
    text-shadow: 0.5px 0.5px #000;
}
</style>