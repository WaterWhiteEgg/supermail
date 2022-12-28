// 放入公共函数。。。
let timeout = null
// 超时记录变量
export function debounce(fun, wait = 300) {
    // 默认值300毫秒
    if (timeout) {
        clearTimeout(timeout)
    }
    timeout = setTimeout(fun, wait)

}

