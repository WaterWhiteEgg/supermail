import axios from 'axios'

import URLtoken from './URLtoken'
// 为了保护接口的商务协议，不提供接口地址

export function requestHome(config) {
    const ins1 = axios.create({
        baseURL: URLtoken,
        timeout: 10000,

        // 如果不能用了请试试http://123.207.32.32:8000

    })

    return ins1(config)
}
// 这里是尝试自己建服务器然后自己请求，也可用于查看axios模块化的基本写法
// 在本地中，必须开启服务器才能进行登录的请求，按照学过的知识对处理即可
// 前端只要担心用户提交的问题
export function requestSelfAPI(config) {
    const ins2 = axios.create({
        baseURL: "http://127.0.0.1:8080",
        timeout: 3000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }

    })

    return ins2(config)

}
export function requestSelfPostAPI(config) {
    const ins3 = axios.create({
        method: 'post',
        // 默认就是post方法
        baseURL: "http://127.0.0.1:8080",
        timeout: 3000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return ins3(config)

}