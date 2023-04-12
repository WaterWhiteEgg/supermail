<template>
    <div>
        <p>用户</p>
        <div><button @click="getText">text get</button></div>
        <div><button @click="postText">text post</button></div>
    </div>
</template>

<script>
import { userGet, userpost } from "../../network/user";
export default {
    name: "User",
    methods: {
        getText() {
            userGet().then((res) => {
                console.log(res);
            });
        },
        postText() {
            userpost().then((res) => {
                console.log(res);
            });
        },
    },
};
</script>

<style>
</style>