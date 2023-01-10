<template>
    <!-- Object.keys(allGoodsItem).length !== 0 判断是否是一个空的对象 -->
    <div class="basedata" v-if="Object.keys(allGoodsItem).length !== 0">
        <div class="title">{{ allGoodsItem.title }}</div>
        <div class="price">
            <span class="new_price">{{ allGoodsItem.newPrice }}</span>
            <span class="old_price" v-if="allGoodsItem.oldPrice !== {}">
                {{ allGoodsItem.oldPrice }}</span
            >
            <span class="discount" v-if="allGoodsItem.discount !== {}">
                {{ allGoodsItem.discount }}</span
            >
        </div>
        <div class="services">
            <span v-for="item in allGoodsItem.services" :key="item.name"
                ><img :src="item.icon" alt="" />{{ item.name }}
            </span>
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
        console.log(this.allGoodsItem);
    },

    methods: {},
};
</script>

<style  scoped>
</style>