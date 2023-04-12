
import { requestSelfAPI, requestSelfPostAPI } from "./request";

export function userGet() {
    return requestSelfAPI({
        url: "/getapi/index"
    })
}
export function userpost() {
    return requestSelfPostAPI(
        "postapi/user",
        JSON.stringify({ 'body': 'datadadadad', "ddd": "ddd" }),
        {
            
        }
    )
}