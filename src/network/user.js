// 这里需要自建个本地服务器解决
import { requestSelfAPI, requestSelfPostAPI } from "./request";

export function userGet() {
    return requestSelfAPI({
        url: "/getapi/index"
    })
}
export function userpost() {
    // 首先后端有这个处理才可以使用，提交给body处理
    return requestSelfPostAPI(
        "postapi/user",
        JSON.stringify({ 'body': 'datadadadad', "ddd": "ddd" }),
        {
            
        }
    )
}