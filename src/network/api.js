// 这里需要自建个本地服务器解决
import { requestSelfPostAPI } from "./request";

export function validateToken(token) {
    return requestSelfPostAPI({
        url: "/api/validate-token",
        headers: {
            Authorization: `Bearer ${token}`,

        },

    })
}
export function loginUsername(data) {
    return requestSelfPostAPI({
        url: "/login/username",
        data,
    })
}   