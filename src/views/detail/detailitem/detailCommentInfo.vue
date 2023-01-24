<template>
    <div class="comment">
        <div id="title_underline">
            <div class="comment_title">
                <span class="comment_title_name">用户评价</span
                ><span class="comment_title_more"
                    ><a href="javascript:;">更多</a></span
                >
            </div>
        </div>
        <comment
            :commentInfo="commentInfo.list && commentInfo.list"
        ></comment>
    </div>
</template>

<script>
import Comment from "../../../components/common/comment/Comment.vue";
export default {
    components: { Comment },
    name: "DetailCommentInfo",
    props: {
        commentInfo: {
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
        console.log(this.commentInfo);
    },

    mounted() {},

    methods: {},
};
</script>

<style  scoped>
#title_underline {
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid #ebebebd8;
}
.comment_title {
    display: flex;
    width: 100%;
    height: 38px;
    align-items: center;
    font-size: 13px;
}

.comment_title .comment_title_name {
    flex: 1;
}
.comment_title .comment_title_more {
    flex: 0.15;
}
.comment_title .comment_title_more a {
    text-decoration: none;
    color: #878585;
}
</style>