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
                    v-model="userLoginForm.username"
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
                    v-model="userLoginForm.password"
                />
            </span>
            <span v-show="!isLogin">
                <span v-show="isAgainPassword" class="red">不相同的密码</span>
                <label for="again_password">再次输入密码：</label>
                <input
                    type="password"
                    name="again_password"
                    autocomplete="new-password"
                    v-model="userLoginForm.again_password"
                />
            </span>

            <span class="requestbox_data_email" v-show="!isLogin">
                <span v-show="isEmail" class="red">格式错误</span>

                <label for="email">邮箱：</label
                ><input
                    type="email"
                    name="email"
                    v-model="userLoginForm.email"
                />
                <form
                    method="post"
                    class="requestbox_data_email_code"
                    @submit.prevent
                >
                    <input
                        type="submit"
                        value="发送验证码"
                        @click="postEmail"
                        :disabled="requestSetSecondInterval"
                    />
                </form>
            </span>

            <span class="requestbox_data_code" v-show="!isLogin">
                <span v-show="isCode" class="red requestbox_data_code_error"
                    >验证码错误！</span
                >
                <label for="code">邮箱验证码：</label
                ><input
                    type="text"
                    name="code"
                    v-model="userLoginForm.code"
                    :disabled="isForEmail"
                />
            </span>
            <input
                type="submit"
                name="commit"
                value="登录"
                class="requestbox_data_submit"
                @click="rboxRequestSelfPost"
                v-if="isLogin"
            />
            <input
                v-else
                type="submit"
                name="commit"
                value="注册"
                class="requestbox_data_submit"
                @click="rboxLoginSelfPost"
            />
        </form>
    </div>
</template>

<script>
import {
    requestSelfPost,
    loginSelfPost,
    codeSelfPost,
    postCodeSelfPost,
} from "../../../network/user";
import ALLCONST from "../../../common/const";
import { debounce, setSecondInterval } from "../../../common/utils";

export default {
    name: "Requestbox",
    data() {
        return {
            isUsername: false,
            isPassword: false,
            isEmail: false,
            isAgainPassword: false,
            isCode: false,
            emailCountdown: 0,

            userRequestForm: {
                username: null,
                password: null,
            },
            userLoginForm: {
                username: null,
                password: null,
                again_password: null,
                email: null,
                code: null,
            },

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
        postEmail() {
            // 处理发送email的 code请求

            debounce(() => {
                // 重新赋值为30秒定时
                this.emailCountdown = 30;
                // 写个值让this.countdown需要这个值动态显示数字以及判断开关，由于次数也是根据这个值的
                // 所以一定要在事先规定好这个值是多少
                setSecondInterval(this.emailCountdown, (hasCountdown) => {
                    // 通过回调函数，将每次定时器1000ms运行一次时就回调
                    // console.log(hasCountdown);
                    this.emailCountdown = hasCountdown;
                });

                postCodeSelfPost(this.userLoginForm)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }, 500);
        },
        requestRules() {
            // 之前说过的，直接拿注册的数据同步给登录表单，不过先看看有没有
            // 先验证数据是否为空，为空的话别交了，同时再看看前端的表单验证有没有问题，有的话也是
            // 同步输入的表单
            if (this.userLoginForm.username && this.userLoginForm.password) {
                // 判断格式错误没有
                if (!this.isPassword && !this.isUsername) {
                    // 将这两个值赋给登录表单
                    this.userRequestForm.password = this.userLoginForm.password;
                    this.userRequestForm.username = this.userLoginForm.username;
                    return true;
                }
            }
        },
        rboxRequestSelfPost() {
            // tips：表单验证错误时会返回服务器错误500

            // 为了减少连续点击的繁忙，用防抖比较好
            // 这个要套个异步函数，不然会requestSelfPost的promise本身是不会等待你的定时器的，要异步处理
            debounce(async () => {
                // 处理登录,规则函数验证成功后返回true
                if (this.requestRules()) {
                    requestSelfPost(this.userRequestForm)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    // 这里最好加个弹窗
                    console.log("发送失败");
                }
            });
        },
        rboxLoginSelfPost() {
            // 为了减少连续点击的繁忙，用防抖比较好
            debounce(async () => {
                // 处理登录,规则函数验证成功后返回true
                loginSelfPost(this.userLoginForm)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        },
    },
    watch: {
        // 需要注意的事，我们不能相信前端的表单验证，所以后端也会处理这些格式到底对不对
        // 这个更重要用于减少服务器压力以及给用户好果子吃
        // 由于登录对象需要的用户名与密码与注册表单的一毛一样，我就直接拿需要的值放进去就好了
        "userLoginForm.username"(value, oldValue) {
            debounce(() => {
                this.changeInput(ALLCONST.regExps.umReg, value, "isUsername");
            });
        },
        "userLoginForm.password"(value) {
            debounce(() => {
                this.changeInput(ALLCONST.regExps.pwReg, value, "isPassword");
            });
        },
        "userLoginForm.email"(value) {
            debounce(() => {
                this.changeInput(ALLCONST.regExps.emReg, value, "isEmail");
            }, 300);
        },
        "userLoginForm.again_password"(value) {
            debounce(() => {
                if (value != this.userLoginForm.password) {
                    this.isAgainPassword = true;
                } else {
                    this.isAgainPassword = false;
                }
            }, 300);
        },
        "userLoginForm.code"(value) {
            debounce(() => {
                // 当写入code时，判断这个code长度是不是6时再网络请求code
                if (ALLCONST.regExps.code.test(value)) {
                    // 验证code是否正确
                    codeSelfPost(this.userLoginForm)
                        .then((res) => {
                            // 如果res.status是1的话，那就是有问题，后台也有信息
                            if (!res.data.status) {
                                this.isCode = false;
                            } else {
                                console.log(res.data.message);
                                this.isCode = true;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    this.isCode = false;
                }
            }, 600);
        },
    },

    computed: {
        chengeRequestTitle() {
            return this.isLogin ? "登录" : "注册";
        },
        isForEmail() {
            // 判断是否邮箱的值是空以及格式错误
            return this.userLoginForm.email == null || this.isEmail == true;
        },
        requestSetSecondInterval() {
            // 判断规则isForEmail以及倒数是否正确
            // true就会隐藏，false才会可输入
            // 我快被这玩意绕死了
            return this.isForEmail || this.emailCountdown != 0;
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
.requestbox_data_email form input[type="submit"] {
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
.requestbox_data_code_error {
    min-width: 90px;
}
</style>