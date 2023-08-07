import { requestSelfPostAPI ,requestSelfAPI} from "./request";

export function favoriteStarsPush(token,data) {
    return requestSelfPostAPI({
        url: "/star/pushdata",
        headers: {
            Authorization: `Bearer ${token}`,
        },  
        data
    })
}

export function favoriteStarsRemove(token,data) {
    return requestSelfPostAPI({
        url: "/star/removedata",
        headers: {
            Authorization: `Bearer ${token}`,
        },  
        data
    })
}
// export function cartListsSelect(token) {
//     return requestSelfAPI({
//         url: "/shop/selectdata",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },  
//     })
// }