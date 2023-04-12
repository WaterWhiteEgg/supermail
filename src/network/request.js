import axios from 'axios'


export function requestHome(config) {
    const ins1 = axios.create({
        baseURL: "http://123.207.32.32:7888/api/hy66/",
        timeout: 10000,

    })

    return ins1(config)
}

export function requestSelfAPI(config) {
    const ins2 = axios.create({
        baseURL: "http://localhost/",
        timeout: 3000
    })

    return ins2(config)

}
export function requestSelfPostAPI(url,data,config) {
    const ins3 = axios.create({
        baseURL: "http://localhost/",
        timeout: 3000,
    }) 
    return ins3.post(url,data,config)  

}
// 这里是尝试自己建服务器然后自己请求，也可用于查看axios模块化的基本写法
// 当然跨域问题解决中