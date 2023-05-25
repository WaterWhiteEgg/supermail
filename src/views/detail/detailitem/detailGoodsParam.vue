<template>
    <div id="params">
        <div class="goodsparam">
            <div
                class="goodsparam_item"
                v-for="(item, index) in goodsParams.sizes &&
                goodsParams.sizes[0]"
                :key="index + 'goodsparam' + item"
            >
                <span
                    class="goodsparam_item_key"
                    v-for="(item2, index) in item"
                    :key="index + 'goodsparam_item_key' + item2"
                    >{{ item2 }}</span
                >
            </div>
        </div>
        <div class="businessparam">
            <div
                class="businessparam_item"
                v-for="item in goodsParams.infos"
                :key="'businessparam' + item.key"
            >
                <span class="businessparam_item_key">{{ item.key }}</span
                ><span class="businessparam_item_value"> {{ item.value }}</span>
            </div>
        </div>
        <div class="pic" v-if="goodsParams.image != ''">
            <img :src="goodsParams.image" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailGoodsParam",
    props: {
        goodsParams: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    updated() {},
    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style  scoped>
#params{
    border-bottom: 3px solid #ebebebd8;
    }
.businessparam_item {
    display: flex;
    font-size: 13px;
}
.businessparam_item span,
.goodsparam_item span {
    padding: 10px 0;
    border-bottom: 0.1px solid #7b7b7b27;
}
.businessparam_item .businessparam_item_key {
    flex: 0.5;
}
.businessparam_item .businessparam_item_value {
    flex: 1.5;
    color: #48a3c4;
}
.goodsparam {
    border-bottom: 3px solid #ebebebd8;
    font-size: 14px;
    text-align: center;
}
.goodsparam .goodsparam_item {
    display: flex;
}
.goodsparam .goodsparam_item .goodsparam_item_key {
    flex: 1;
}
.pic {
    width: 100%;
}
.pic img {
    width: 100%;
    height: 100%;
}
</style>