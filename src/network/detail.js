import { requestHome } from "./request";

export function getdetailItem(iid) {
    return requestHome({
        url: "/detail",
        params: {
            iid
        }
    })
}