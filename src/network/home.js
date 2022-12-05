// 这样有助于封装管理
// 首页的所有请求都在这里
import { requestHome } from "./request";

export function getHomeData() {

    return requestHome({
        url: "/home/multidata"
    })
    // 本来是在这里写then catch的，但是我们还是让调用者直接用比较好
    // 这里只是多封装了一层导出去，原理不变的
}