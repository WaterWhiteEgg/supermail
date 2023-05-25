<template>
    <li class="goods_item_data">
        <a href="javascript:0" @click="itemLink">
            <img v-lazy="whatImg" :alt="goodsItemData.title" />
            <p class="title" :alt="goodsItemData.title">
                {{ goodsItemData.title }}
            </p>
        </a>
        <span class="price">价格:{{ goodsItemData.price }}</span>
        <span class="collect">★{{ goodsItemData.cfav }}</span>
    </li>
</template>

<script>
import { debounce } from "../../../common/utils.js";

export default {
    name: "GoodsItemData",

    data() {
        return {
            path: "/detail",
            iid: this.goodsItemData.iid || this.goodsItemData.item_id,
        };
    },
    props: {
        goodsItemData: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    updated() {
        // console.log(this.goodsItemData);
    },
    methods: {
        itemLink() {
            if (!this.$route.path.indexOf("/detail")) {
                alert("提示\n暂时没有推荐数据，页面将不会刷新");
            }

            this.$router.push({
                path: this.path,
                query: {
                    iid: this.iid,
                },
            });
            // 传递iid
            // console.log(this.$route);
        },
    },

    computed: {
        whatImg() {
            if (typeof this.goodsItemData.show === "undefined") {
                return this.goodsItemData.image;
            } else {
                return this.goodsItemData.show.img;
            }
        },
    },
    watch: {
        // 监听路由发生改变
    },

    mounted() {
        // console.log(this.goodsItemData);
    },
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
.goods_item_data .collect {
    margin-right: 10%;
    float: right;
    color: #ffa600;
    text-shadow: 0.5px 0.5px #000;
}
</style>