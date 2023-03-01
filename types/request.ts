import type {AxiosRequestConfig, AxiosResponse} from 'axios'

export interface RequestInterceptors<T> {
    // 请求拦截
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorsCatch?: (error: any) => any
    // 响应拦截
    responseInterceptors?: (config: T) => T
    responseInterceptorsCatch?: (error: any) => any
}

// 自定义传入参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: RequestInterceptors<T>
}

// 取消请求函数 类型
export interface CancelRequestSource {
    [index: string]: () => void
}

// 重写返回类型
export interface YEBRequestConfig<T, R> extends RequestConfig<YEBResponse<R>> {
    data?: T
}

// 自定义返回体
export interface YEBResponse<T> {
    code: number
    message: string
    data: T
}
