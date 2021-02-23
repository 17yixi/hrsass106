import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(config => {
    // 注入token
    if (store.getters.token) {
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
        if (checkTimeOut()) {
            store.dispatch('user/logout')
            router.push('/login')
            return Promise.reject(new Error('当前token过期'))
        }
    }
    return config
}, error => {
    return new Promise.reject(error)
})
service.interceptors.response.use(response => {
    const { success, message, data } = response.data
    if (success) {
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, error => {
    if (error.response && error.response.data && error.response.data.code === 10002) {
        store.dispatch('user/logout')
        router.push('/login')
    } else {
        Message.error(error.message)
    }
    return Promise.reject(error)
})

function checkTimeOut() {
    return (Date.now() - getTimeStamp()) / 1000 > TimeOut
}

export default service