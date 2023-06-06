<template>
    <div class="requestbox">
        <span class="requestbox_title"><h2>登录</h2></span>
        <form method="post" action="" class="requestbox_data">
            <span>
                <strong>用户名：</strong
                ><input
                    type="text"
                    name="username"
                    autocomplete="username"
                    required
                /> </span
            ><span>
                <strong>密码：</strong
                ><input
                    type="password"
                    name="password"
                    autocomplete="new-password"
                    required
                />
            </span>
            <span>
                <strong>再次输入密码：</strong
                ><input
                    type="password"
                    name="again_password"
                    autocomplete="new-password"
                    required
                />
            </span>
            <span class="requestbox_data_email">
                <strong>邮箱：</strong
                ><input type="email" name="email" required />
                <form method="post" class="requestbox_data_email_code">
                    <button>发送验证码</button>
                </form>
            </span>

            <span class="requestbox_data_code">
                <strong>邮箱验证码：</strong
                ><input type="text" name="code" required />
            </span>
            <input
                type="submit"
                name="commit"
                value="注册"
                class="requestbox_data_submit"
            />
        </form>
    </div>
</template>

<script>
export default {
    name: "Requestbox",
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
.requestbox_title {
    text-align: center;
    margin: 3vh 0;
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
.requestbox_data_code strong {
    width: 25vw;
    min-width: 100px;
}
</style>