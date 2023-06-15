<template>
    <div>
        <div class="user_login">
            <span class="user_login_ico"
                ><img src="~assets/img/none.jpeg" alt=""
            /></span>
            <span class="user_login_name" @click="toRequest">
                <h4 v-if="!userdata">点击注册/登录</h4>
                <h4 v-else>{{ userdata.username }}</h4>
                <span class="user_login_name_email"
                    ><img
                        src="~assets/img/svg/user/iphone.svg"
                        class="user_login_email_iphone"
                    />
                    <span v-if="!userdata">未查询到邮箱</span>
                    <span v-else>{{userdata.email}}</span>
                </span>
            </span>
            <span class="user_login_set" @click="toRequest">
                <span>&gt;</span>
            </span>
            <!-- <button @click="postText">登录</button> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "Userlogin",

    data() {
        return {
            userdata: null,
        };
    },
    // 创建时看看本地存储有没有东西
    created() {
        this.userdata = JSON.parse(window.localStorage.getItem("user"));
    },

    mounted() {},

    methods: {
        toRequest() {
            this.$router.push("/request");
        },
    },
};
</script>

<style  scoped>
.user_login {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #a5d6ff70;
}
.user_login_name {
    flex: 1;
}
.user_login_name h4 {
    margin: 0;
    padding-top: 4vh;
    padding-bottom: 1vh;
}
.user_login .user_login_ico {
    padding: 3.5vh 5vw 0 5vw;
}
.user_login .user_login_ico img {
    width: 15vw;
    max-width: 100px;
    border-radius: 50%;
}
.user_login_set {
    padding: 5vh 4vw;
    font-size: 1.5rem;
}
.user_login_email_iphone {
    width: 4vw;
    max-width: 20px;
}
</style>