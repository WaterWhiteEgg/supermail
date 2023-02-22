<template>
    <div>
        <div v-for="(item) in cartLists" :key="item.iid">
            <!-- {{ item }} -->
            <p>{{item.title}}</p>
            <p>{{item.desc}}</p>
            <div><span>{{item.price}}</span><span>{{item}}</span></div>
            <img :src="item.image" :alt="item.title" />
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
p{
    margin: 0;
}
</style>