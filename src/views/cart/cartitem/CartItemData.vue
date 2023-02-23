<template>
    <div id="cart">
        <div
            v-for="(item, index) in cartLists"
            :key="item.iid"
            class="cartitem"
            :class="{ first_cartitem: index == 0 }"
        >
            <div class="cartitem_show">
                <span
                    class="cartitem_show_checkbox"
                    :class="{ cartitem_show_checkbox_on: true }"
                ></span>
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
export default {
    name: "SupermailCartItemData",
    props: {
        cartLists: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {};
    },

    mounted() {},

    methods: {},
};
</script>

<style  scoped>
.cartitem_show_checkbox_on {
    background-color: #0015ff !important;
    border: 0 !important;
    overflow: hidden;
}
.cartitem_show_checkbox_on::after {
    content: "√";
    font-size: 16px;
    font-weight: 900;
    color: #fff;
}
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
.cartitem .cartitem_show .cartitem_show_checkbox {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    margin: 0 0.3rem;
    border-radius: 35px;
    border: 0.1px solid #000;
    background: #f8f8f8;
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