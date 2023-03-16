import axios from 'axios'


export function requestHome(config) {
    const ins1 = axios.create({
        baseURL: "http://123.207.32.32:7888/api/hy66/",
        timeout: 10000,

    })

    return ins1(config)
}