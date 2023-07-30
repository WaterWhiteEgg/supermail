<template>
    <div id="cart">
        <div
            v-for="(item, index) in cartLists"
            :key="item.iid"
            class="cartitem"
            :class="{ first_cartitem: index == 0 }"
        >
            <div class="cartitem_show">
                <click-button
                    :isChecked="item.isChecked"
                    @changeChecked="changeChecked(cartLists, item)"
                ></click-button>
                <img :src="item.image" :alt="item.title" />
            </div>
            <div class="cartitem_data">
                <span class="cartitem_data_title"> {{ item.title }}</span>
                <span class="cartitem_data_desc">{{ item.desc }}</span>
                <div class="cartitem_data_price">
                    <span>{{ "￥" + item.price }}</span
                    ><span class="cartitem_data_price_price">{{
                        item.quantity + "件"
                    }}</span>
                </div>
            </div>
            <!-- {{ item }} -->
        </div>
    </div>
</template>

<script>
import ClickButton from "../../../components/content/clickbutton/ClickButton.vue";
export default {
    components: { ClickButton },
    name: "SupermailCartItemData",
    props: {
        cartLists: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    watch: {
        "$store.state.isCartListsAllSelected"(newval, oldval) {
            // 获取在全局的全选按钮的布尔值切换所有被选择的item的状态
            for(let item of this.cartLists){
                item.isChecked = newval
}

        },
    },
    data() {
        return {};
    },

    mounted() {},

    methods: {
        // 切换选择的状态，这个状态不会保留
        changeChecked(checkData, item) {
            // console.log(item);
            // 切换当前数组的状态
                console.log();
            item.isChecked = !item.isChecked;
            // 遍历后查看是否有false，如果有直接返回结果

            for (let i of checkData) {
                if (!i.isChecked) {
                    // 给vuex提供数据
                    this.$store.commit("checkIsChecked", false);
                    return 0;
                } else {
                    this.$store.commit("checkIsChecked", true);
                }
            }
            // this.$store.commit("checkIsChecked", item.isChecked);
        },
    },
};
</script>

<style  scoped>
.first_cartitem {
    margin-top: 0 !important;
}
.cartitem {
    display: flex;
    width: 100%;
    margin: 0.5rem 0;
}

.cartitem .cartitem_show {
    flex: 0.3;
    display: flex;
    align-items: center;
}
.cartitem .cartitem_show img {
    width: 70%;
    border-radius: 5px;
}

.cartitem .cartitem_data {
    flex: 0.7;
    display: flex;
    flex-direction: column;
}
.cartitem .cartitem_data .cartitem_data_title,
.cartitem .cartitem_data .cartitem_data_desc {
    font-size: 15px;
    width: 70vw;
    padding: 0.5rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.cartitem .cartitem_data .cartitem_data_desc {
    font-size: 10px;
    color: #7d7d7d;
}
.cartitem .cartitem_data .cartitem_data_price {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1rem 1rem 0;
    color: red;
}
.cartitem .cartitem_data .cartitem_data_price .cartitem_data_price_price {
    color: #000;
    font-weight: 900;
}
</style>