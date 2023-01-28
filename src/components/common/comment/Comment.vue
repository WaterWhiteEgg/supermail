<template>
    <div>
        <div
            class="comment_info"
            v-for="item in commentInfo"
            :key="item.rateId"
        >
            <div class="comment_info_user">
                <span class="comment_info_user_img"
                    ><img :src="item && item.user.avatar" alt="" /> </span
                ><span class="comment_info_user_name">
                    {{ item && item.user.uname }}</span
                >
            </div>
            <div class="comment_info_description">
                <div class="comment_info_description_content">
                    {{ item.content }}
                </div>
                <div class="comment_info_description_time">
                    <!-- created获取的是秒，需要毫秒的要乘1000 -->
                    {{ (item.created * 1000) | time_yyyyMMdd }}
                    <span
                        class="comment_info_description_time_item"
                        v-for="(item2, index) in item.extraInfo"
                        :key="index + item2"
                        >&nbsp;{{ item2 }}</span
                    >
                </div>
                <div class="comment_info_img">
                    <img
                        :src="item2"
                        :alt="item2"
                        v-for="item2 in item.images"
                        :key="item2"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { parseTime } from "../../../common/utils";
export default {
    name: "Comment",
    props: {
        commentInfo: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {};
    },
    filters: {
        time_yyyyMMdd: function (value) {
            return parseTime(value, "{y}-{m}-{d}");
        },
    },

    mounted() {},

    methods: {},
};
</script>

<style scoped>
.comment_info {
    border-bottom: 3px solid #ebebebd8;
}
.comment_info_user {
    padding: 10px 0;
}

.comment_info_user_img img {
    width: 10%;
    padding: 0 6px;
    border-radius: 25px;
    vertical-align: middle;
}
.comment_info_description .comment_info_description_content {
    padding: 3px;
    color: #4e4d4d;
    font-size: 15px;
}
.comment_info_description .comment_info_description_time {
    padding: 3px 0;
    font-size: 9px;
    color: #7a7979;
}
.comment_info_img {
    padding-bottom: 8px;
}
.comment_info_img img {
    padding: 3px 1px;
    width: 15%;
}
</style>