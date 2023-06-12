// 这里需要自建个本地服务器解决
import { requestSelfAPI, requestSelfPostAPI } from "./request";

export function userGet() {
    return requestSelfAPI({
        url: "/"
    })
}
export function requestSelfPost(data) {
    // 首先后端有这个处理才可以使用，提交给body处理
    // 这里处理登录
    return requestSelfPostAPI({
        url: "/register",
        data,

    })
}
export function loginSelfPost(data) {
    // 首先后端有这个处理才可以使用，提交给body处理
    // 这里处理注册
    return requestSelfPostAPI({
        url: "/login",
        data,

    })
}

export function codeSelfPost(data) {
    // 首先后端有这个处理才可以使用，提交给body处理
    // 处理code在服务器对比的正确性
    return requestSelfPostAPI({
        url: "/email/code",
        data,

    })
}
export function postCodeSelfPost(data) {
    // 首先后端有这个处理才可以使用，提交给body处理
    // 处理发送code
    return requestSelfPostAPI({
        url: "/email/post",
        data,

    })
}
