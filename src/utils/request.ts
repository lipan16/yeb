import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {CancelRequestSource, RequestConfig, RequestInterceptors, YEBRequestConfig, YEBResponse} from '#/request'

import {useUserStoreWithOut} from '@/store/modules/user'

class YAxios{
    // 实例对象
    instance: AxiosInstance
    // 拦截器对象
    interceptorsObj?: RequestInterceptors<AxiosResponse>
    /** 存放取消方法的集合
     * 在创建请求后将取消方法push到该数组，在请求前判断同一URL是否存在，如果存在就取消请求
     */
    cancelRequestSourceList?: CancelRequestSource[]
    /** 存放所有请求URL
     * 请求之前将url push到该数组，请求完毕之后从数组中删除
     */
    requestUrlList?: string[]

    constructor(config: RequestConfig){
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors
        this.requestUrlList = []
        this.cancelRequestSourceList = []

        // 拦截器执行顺序： 实例请求--->类请求--->实例响应--->类响应
        // 全局请求拦截器
        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            const userStore = useUserStoreWithOut()
            if(userStore.token){
                // @ts-ignore
                config.headers['X-Access-Token'] = userStore.token
            }
            return config
        }, (error: any) => {
            console.error('Request1 request.use error', error)
        })
        // 实例请求拦截器
        this.instance.interceptors.request.use(this.interceptorsObj?.requestInterceptors, this.interceptorsObj?.requestInterceptorsCatch)

        // 实例响应拦截器
        this.instance.interceptors.response.use(this.interceptorsObj?.responseInterceptors, this.interceptorsObj?.responseInterceptorsCatch)
        // 全局响应拦截器
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            return res.data
        }, (error: any) => {
            console.error('Request1 response.use error', error)
        })
    }

    request<T>(config: RequestConfig<T>): Promise<T>{
        return new Promise((resolve, reject) => {
            // 如果为单个请求设置了拦截器，使用单个请求拦截器
            if(config.interceptors?.requestInterceptors){
                config = config.interceptors.requestInterceptors(config)
            }

            // url存到请求数组、保存对应的取消方法
            const url = config.url
            if(url){
                this.requestUrlList?.push(url)
                config.cancelToken = new axios.CancelToken(c => {
                    this.cancelRequestSourceList?.push({[url]: c})
                })
            }

            this.instance.request<any, T>(config).then(res => {
                // 如果为单个请求设置了响应拦截器，这里使用单个响应拦截器
                if(config.interceptors?.responseInterceptors){
                    console.log('this.instance.request response')
                    res = config.interceptors.responseInterceptors(res)
                }
                resolve(res)
            }).catch((err: any) => {
                reject(err)
            }).finally(() => {
                url && this.delUrl(url)
            })
        })
    }

    // 取消请求
    cancelRequest(url: string | string[]){
        if(typeof url === 'string'){
            const sourceIndex = this.getSourceIndex(url)
            sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]()
        }else{
            url.forEach(u => {
                const sourceIndex = this.getSourceIndex(u)
                sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]()
            })
        }
    }

    // 取消所有请求
    cancelAllRequest(){
        this.cancelRequestSourceList?.forEach(source => {
            const key = Object.keys(source)[0]
            source[key]()
        })
    }

    /**
     * 删除 requestUrlList中的url 和 cancelRequestSourceList中url对应的方法
     * @param url
     * @private
     */
    private delUrl(url: string){
        const urlIndex = this.requestUrlList?.findIndex(f => f === url)
        const sourceIndex = this.getSourceIndex(url)
        urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1)
        sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex as number, 1)
    }

    private getSourceIndex(url: string): number{
        return this.cancelRequestSourceList?.findIndex((f: CancelRequestSource) => Object.keys(f)[0] === url) as number
    }
}


const yAxios = new YAxios({
    baseURL: import.meta.env.BASE_URL,
    timeout: 5 * 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    interceptors: {
        requestInterceptors: config => {
            // console.log('实例请求拦截器')
            return config
        },
        responseInterceptors: res => {
            // console.log('实例响应拦截器')
            return res
        },
    },
})

const yebRequest = <D = any, T = any>(config: YEBRequestConfig<D, T>) => {
    const {method = 'get'} = config
    if(method === 'get' || method === 'GET'){
        config.params = config.data
    }
    return yAxios.request<YEBResponse<T>>(config)
}

export default yebRequest
