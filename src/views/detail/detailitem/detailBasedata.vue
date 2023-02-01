<template>
    <!-- Object.keys(allGoodsItem).length !== 0 判断是否是一个空的对象 -->
    <div>
        <div class="basedata" v-if="Object.keys(allGoodsItem).length !== 0">
            <div class="title">{{ allGoodsItem.title }}</div>
            <div class="price">
                <span class="new_price">{{ allGoodsItem.newPrice }}</span>
                <span class="old_price" v-if="allGoodsItem.oldPrice !== ''">
                    {{ allGoodsItem.oldPrice }}</span
                >
                <span class="discount" v-if="allGoodsItem.discount !== ''">
                    {{ allGoodsItem.discount }}</span
                >
            </div>
            <div class="columns">
                <span
                    v-for="item in allGoodsItem.columns"
                    :key="item"
                    class="columns_item"
                    >{{ item }}</span
                >
            </div>
            <div class="services">
                <span v-for="item in allGoodsItem.services" :key="item.name"
                    ><img :src="item.icon" alt="" />{{ item.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DatailBasedata",
    props: {
        allGoodsItem: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {};
    },

    updated() {
        // console.log(this.allGoodsItem);
    },

    methods: {},
};
</script>

<style  scoped>
.basedata {
    width: 100%;
    margin-bottom: 8px;
}
.title {
    padding: 6px 0;
    font-size: 1.125rem;
}
.price {
    width: 100%;
    overflow: auto;
    overflow: -moz-scrollbars-none;
}
.price::-webkit-scrollbar {
    width: 0 !important;
}

.price .new_price {
    font-size: 22px;
    color: #ff0008;
}
.price .old_price {
    padding: 0 3px;
    font-size: 8px;
    text-decoration: line-through;
    color: #414141bc;
}
.price .discount {
    padding: 0 5px;
    padding-right: 9px;
    border-radius: 12px;
    width: 100%;
    color: white;
    background-color: #84b9fe;
    text-align: center;
    font-size: 14px;
}
.columns {
    display: flex;
    width: 100%;
    position: relative;
    margin: 10px 0px;
}
.columns::after {
    content: "";
    width: 98%;
    height: 0.8%;
    background-color: #d7d2d2;
    position: absolute;
    left: 1%;
    bottom: -10px;
}
.columns .columns_item {
    flex: 1;
    text-align: center;
    font-size: 13px;
    color: #626262b2;
}
.services {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
    color: #000;
}
.services img {
    width: 10%;
}
</style>