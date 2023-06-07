<template>
    <div class="requestbox">
        <span class="requestbox_title"
            ><h2>
                {{ chengeRequestTitle
                }}<a class="requestbox_title_request" @click="chengeRequest"
                    >(切换{{ chengeRequestTitle }} )</a
                >
            </h2></span
        >
        <form class="requestbox_data" @submit.prevent>
            <!-- 阻止默认表单的跳转操作，因为我使用了axios执行提交跳转，这个form只需要收集信息 -->
            <span>
                <span v-show="isUsername" class="red">格式错误</span>
                <label for="username">用户名：</label
                ><input
                    type="text"
                    name="username"
                    autocomplete="username"
                    required
                    v-model="username"
                />
            </span>

            <span>
                <span v-show="isPassword" class="red"
                    >密码必须6-20位，包含数字，字母</span
                >

                <label for="password">密码：</label
                ><input
                    type="password"
                    name="password"
                    autocomplete="new-password"
                    aria-describedby="username"
                    required
                    v-model="password"
                />
            </span>
            <span v-show="!isLogin">
                <span v-show="isAgainPassword" class="red">不相同的密码</span>
                <label for="again_password">再次输入密码：</label>
                <input
                    type="password"
                    name="again_password"
                    autocomplete="new-password"
                    required
                    v-model="again_password"
                />
            </span>

            <span class="requestbox_data_email" v-show="!isLogin">
                <span v-show="isEmail" class="red">格式错误</span>

                <label for="email">邮箱：</label
                ><input type="email" name="email" required v-model="email" />
                <form method="post" class="requestbox_data_email_code">
                    <button disabled>发送验证码</button>
                </form>
            </span>

            <span class="requestbox_data_code" v-show="!isLogin">
                <label for="code">邮箱验证码：</label
                ><input type="text" name="code" required v-model="code" />
            </span>
            <input
                type="submit"
                name="commit"
                :value="chengeRequestTitle"
                class="requestbox_data_submit"
                @click="rboxRequestSelfPost"
                disabled
            />
        </form>
    </div>
</template>

<script>
import { requestSelfPost } from "../../../network/user";
import ALLCONST from "../../../common/const";
import { debounce } from "../../../common/utils";

export default {
    name: "Requestbox",
    data() {
        return {
            isUsername: false,
            isPassword: false,
            isEmail: false,
            isAgainPassword: false,
            username: null,
            password: null,
            again_password: null,
            email: null,
            code: null,
            isLogin: false,
        };
    },
    methods: {
        chengeRequest() {
            this.isLogin = !this.isLogin;
        },
        changeInput(reg, value, isName) {
            if (reg.test(value)) {
                this[isName] = false;
            } else {
                this[isName] = true;
            }
        },
        rboxRequestSelfPost() {
            requestSelfPost()
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    watch: {
        // 需要注意的事，我们不能相信前端的表单验证，所以后端也会处理这些格式到底对不对
        // 这个更重要用于减少服务器压力以及给用户好果子吃
        username(value, oldValue) {
            debounce(() => {
                this.changeInput(ALLCONST.regExps.umReg, value, "isUsername");
            }, 1000);
        },
        password(value) {
            debounce(() => {
                this.changeInput(ALLCONST.regExps.pwReg, value, "isPassword");
            }, 1000);
        },
        email(value) {
            debounce(() => {
                this.changeInput(ALLCONST.regExps.emReg, value, "isEmail");
            }, 3000);
        },
        again_password(value) {
            debounce(() => {
                if (value != this.password) {
                    this.isAgainPassword = true;
                } else {
                    this.isAgainPassword = false;
                }
            }, 300);
        },
    },

    computed: {
        chengeRequestTitle() {
            return this.isLogin ? "注册" : "登录";
        },
    },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .requestbox {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0% !important;
    }
}
label {
    font-weight: 900;
    margin: 0.5vh 0;
}
.red {
    text-decoration: underline red;
    font-weight: 900;
    font-size: 0.9rem !important;
    color: red !important;
}
.requestbox_title {
    text-align: center;
    margin: 3vh 0;
}
.requestbox_title_request {
    font-size: 1rem;
    text-decoration: underline blue;
    color: blue;
}
.requestbox {
    width: 80vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(#ffffff8c, #1139ffaf, #34dff24b);
    border-radius: 15%;
}
.requestbox_data {
    display: flex;
    flex-direction: column;
}
span input[type="text"],
span input[type="password"] {
    box-sizing: border-box;
    padding: 0;
    margin: 0 2vw 0 2vw;
    width: 100%;
    height: 5vh;
}

.requestbox_data span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    flex-wrap: wrap;
    color: #000000;
    font-size: 1rem;
}
.requestbox_data_email input[type="email"] {
    height: 5vh;
    width: 40vw;
    margin: 1vh 2vw;
}
.requestbox_data_submit,
.requestbox_data_email form button {
    width: 10vw;
    height: 5vh;
    min-width: 105px;
    margin: 1vh auto 0 auto;
    background-color: #ffffff30;
    font-size: 1rem;
}
.requestbox_data_code {
    width: 25vw;
    margin: 0 auto;
    flex-direction: column;
    flex-wrap: nowrap !important;
}
.requestbox_data_code input[name="code"] {
    margin: 0;
    width: 25vw;
}
.requestbox_data_code label {
    width: 25vw;
    min-width: 100px;
}
</style>