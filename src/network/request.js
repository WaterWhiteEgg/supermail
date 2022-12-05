import axios from 'axios'


export function requestHome(config) {
    const ins1 = axios.create({
        baseURL: "http://152.136.185.210:7878/api/hy66/",
        timeout: 10000,

    })

    return ins1(config)
}