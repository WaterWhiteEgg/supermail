<template>
    <div>
        <div class="user_login">
            <span class="user_login_ico"
                ><img src="~assets/img/none.jpeg" alt=""
            /></span>
            <span class="user_login_name">
                <h4>点击注册/登录</h4>
                <span class="user_login_name_email"
                    ><img
                        src="~assets/img/svg/user/iphone.svg"
                        class="user_login_email_iphone"
                    />未查询到邮箱</span
                >
            </span>
            <span class="user_login_set">
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
        return {};
    },

    mounted() {},

    methods: {},
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
    padding: 2vh 5vw;
}
.user_login .user_login_ico img {
    width: 15vw;
    border-radius: 35px;
}
.user_login_set{
   padding: 5vh 4vw; 
}
.user_login_email_iphone {
    width: 4vw;
}
</style>