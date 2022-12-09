<template>
    <div class="home_recommend_index">
        <ul class="home_recommend">
            <li
                v-for="item in listRecommend"
                :key="item.acm"
                class="home_recommend_li"
            >
                <a :href="item.link">
                    <img :src="item.image" :alt="item.title" />
                    <p>{{ item.title }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "HomeRecommend",

    data() {
        return {};
    },
    props: {
        listRecommend: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },

    updated() {
        console.log(this.listRecommend);
    },

    methods: {},
};
</script>

<style  scoped>
.home_recommend_index {
    margin-top: -2px;
    margin-bottom: 4px;
    height: 98px;
    background-color: #fff;
}
.home_recommend .home_recommend_li a {
    margin: 0;
    color: #000;
    text-decoration: none;
    font-size: 8px;
}
.home_recommend .home_recommend_li a p{
    margin: 0;
}
.home_recommend {
    margin: 0;
    padding: 0px;

    display: flex;
    list-style: none;
}
.home_recommend .home_recommend_li {
    flex: 1;
    text-align: center;
}
.home_recommend .home_recommend_li img {
    margin:  6px;
    width: 60%;
}
</style>