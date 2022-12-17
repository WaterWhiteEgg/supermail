<template>
    <div class="tabcontrol">
        <div
            v-for="(item, index) in giveArray"
            :key="item[index]"
            class="tabcontrol_item"
            @click="toggle_selection(index)"
        >
            <span :class="{ active: isactive === index }">{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",

    data() {
        return {
            isactive: 0,
        };
    },
    props: {
        giveArray: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },

    mounted() {},

    methods: {
        toggle_selection(index) {
            this.isactive = index;
            this.$emit("pushIndex", index);
        },
    },
};
</script>

<style  scoped>
.tabcontrol {
    display: flex;
    height: 38px;
    line-height: 38px;
    text-align: center;
    background-color: #d7fffc;
    color: rgb(0, 136, 255);
}
.tabcontrol .tabcontrol_item {
    flex: 1;
}
.active {
    color: #ff0048;
    font-weight: bold;
    border-bottom: 1px solid #ff4d00;
}
</style>