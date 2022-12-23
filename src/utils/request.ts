import axios from 'axios'
import {ElMessage} from 'element-plus'
import {useUserStoreWithOut} from '@/store/modules/user'

const Request = axios.create({
    timeout: 5 * 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
})

// Request interceptors
Request.interceptors.request.use((config) => {
    const userStore = useUserStoreWithOut()
    if(userStore.token){
        config.headers['X-Access-Token'] = userStore.token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// Response interceptors
Request.interceptors.response.use((response) => {
    const res = response.data
    if(response.status === 200){
        return Promise.resolve(res)
    }else{
        // error
        ElMessage({
            message: res || 'Error',
            type: 'error',
            duration: 5 * 1000,
        })
        // if ([50008, 50012, 50014].includes(res.info.resultCode)) {
        //     ElMessageBox.confirm(
        //         '你已被登出，可以取消继续留在该页面，或者重新登录',
        //         '确定登出',
        //         {
        //             confirmButtonText: '重新登录',
        //             cancelButtonText: '取消',
        //             type: 'warning'
        //         }
        //     ).then(() => {
        //         userStore.setToken('')
        //         location.reload() // To prevent bugs from vue-router
        //     })
        // }
        return Promise.reject(res)
    }
}, (error) => {
    ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
    })
    return Promise.reject(error.message || 'System Error')
})

export default Request
