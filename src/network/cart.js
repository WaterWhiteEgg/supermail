import { requestSelfPostAPI } from "./request";

export function cartListsPush(token) {
    return requestSelfPostAPI({
        url: "/shop/pushdata",
        headers: {
            Authorization: `Bearer ${token}`,

        },

    })
}