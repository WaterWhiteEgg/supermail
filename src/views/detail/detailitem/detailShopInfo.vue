<template>
    <div>
        <div class="store">
            <img :src="allShopInfo.logo" class="store_logo" alt="" />
            <span class="store_name">{{ allShopInfo.name }}</span>
        </div>
        <div class="storeData">
            <div class="storeData_data">
                <span class="storeData_data_sells"
                    >{{ sells(allShopInfo.sells) }}
                    <p>总销量</p></span
                >
                <span class="storeData_data_goods"
                    >{{ allShopInfo.goodsCount }}
                    <p>全部宝贝</p></span
                >
            </div>
            <div class="storeData_score">
                <div
                    v-for="item in allShopInfo.score"
                    :key="item.name"
                    class="storeData_score_item"
                >
                    <span>{{ item.name }}</span>
                    <span>{{ item.score }}</span>
                    <span class="storeData_score_item_better">
                        <span v-if="item.isBetter" class="isBetter">高</span
                        ><span v-else class="isNotBetter">低</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="storeLink">
            <button><a href="javascript:;">进店逛逛</a></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailShopInfo",
    props: {
        allShopInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {};
    },
    computed: {
        sells() {
            return function (item) {
                if (item < 10000) {
                    return item;
                }
                return (item / 10000).toFixed(2) + "万";
            };
        },
    },
    updated() {
        console.log(this.allShopInfo);
    },

    methods: {},
};
</script>

<style  scoped>
.store {
    margin: 30px 0;
    width: 100%;
}
.store .store_logo {
    width: 10%;
    vertical-align: middle;
    border-radius: 35px;
}
.store .store_name {
    padding: 0px 10px;
    color: #615f5f;
}
.storeData {
    display: flex;
}
.storeData .storeData_data {
    flex: 1;
    display: flex;
    align-items: center;
    padding-top: 6px;
    text-align: center;
}
.storeData_data_goods,
.storeData_data_sells {
    flex: 1;
    font-weight: 900;
}
.storeData_data_goods::after {
    content: "";
    right: 52%;
    bottom: -56px;
    position: absolute;
    height: 3rem;
    border-right: 0.01px solid #59595974;
}
.storeData_data_goods p,
.storeData_data_sells p {
    font-size: 15px;
    font-weight: normal;
}
.storeData_score {
    display: flex;
    flex-direction: column;
}
.storeData_score_item {
    display: flex;
    padding: 6px 0px;
}
.storeData_score_item span {
    flex: 1;
}
.storeData .storeData_score {
    flex: 1;
}
.storeData_score_item_better {
    flex: 0.5 !important;
    color: white;
    font-size: 16px;
}
.storeLink {
    margin-top: 16px; 
    text-align: center;
}
.storeLink button {
    border: 0px;
    padding: 4px 50px;
    border-radius: 25px;
}
.storeLink button a {
    text-decoration: none;
    color: #00000080;
}

.isBetter {
    background-color: red;
}
.isNotBetter {
    background-color: #04be04;
}
</style>