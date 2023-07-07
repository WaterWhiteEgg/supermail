<template>
    <div>
        <navbar class="cartnav">
            <template #center
                >购物车
                <span class="cartnav_cartNumber" v-if="cartLists.length">{{
                    "{" + cartLists.length + "}"
                }}</span>
            </template>
        </navbar>
    </div>
</template>

<script>
import Navbar from "../../../components/common/navbar/Navbar.vue";

export default {
    name: "CartNavbar",
    components: { Navbar },
    data() {
        return {};
    },
    props: {
        cartLists: {
            typeof: Array,
            default: function () {
                return [];
            },
        },
    },
    mounted() {},

    methods: {},
};
</script>

<style scoped>
.cartnav {
    position: relative;
    z-index: 9;
    background-color: #ffd900;
    color: #4458bd;
    font-weight: bold;
}
</style>