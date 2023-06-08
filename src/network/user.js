// 这里需要自建个本地服务器解决
import { requestSelfAPI, requestSelfPostAPI } from "./request";

export function userGet() {
    return requestSelfAPI({
        url: "/"
    })
}
export function requestSelfPost(data) {
    // 首先后端有这个处理才可以使用，提交给body处理
    return requestSelfPostAPI({
        url: "/register",
        data,

    })
}