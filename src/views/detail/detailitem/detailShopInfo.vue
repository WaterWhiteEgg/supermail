<template>
    <div>
        <div class="store"></div>
        <div class="storeData"></div>
        <div class="storeLink"></div>
        {{allShopInfo}}

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

    updated() {
        console.log(this.allShopInfo);
    },

    methods: {},
};
</script>

<style  scoped>
</style>