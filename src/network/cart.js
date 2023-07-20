import { requestSelfPostAPI } from "./request";

export function cartListsPush(token,data) {
    return requestSelfPostAPI({
        url: "/shop/pushdata",
        headers: {
            Authorization: `Bearer ${token}`,
        },  
        data
    })
}

export function cartListsRemove(token,data) {
    return requestSelfPostAPI({
        url: "/shop/removedata",
        headers: {
            Authorization: `Bearer ${token}`,
        },  
        data
    })
}