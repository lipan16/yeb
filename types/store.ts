import type {PropertyPath} from 'lodash'
import {Nullable} from '#/index'
import {RouteLocationNormalized} from 'vue-router'

export interface EncryptionParams{
    key: string
    iv: string
}

export interface YebStorageParams extends EncryptionParams{
    prefixKey: string
    storage: Storage
    hasEncrypt: boolean
    timeout?: Nullable<number>
}

export interface Cache<V = any>{
    value?: V
    timeoutId?: ReturnType<typeof setTimeout>
    time?: number
    alive?: number
}

export interface PayLoadObject{
    key: PropertyPath
    value: any
}

export enum DeviceType{mobile = 'mobile', desktop = 'desktop'}

export interface LoginInfo{
    multi_depart?: string | number
    userInfo?: object
    departs?: []
    tenantList?: []
    isLogin?: boolean
}

/**
 * 验证码类型
 */
export interface VerifyCode{
    verifyCodeImg: string
    verifyCodeKey: string
}

export interface LoginData{
    username: string
    password: string
    // 验证码Code
    captcha: string
    // 验证码Code服务端缓存key(UUID)
    captchaId: string
    keep: boolean
}

export interface LoginResponseData{
    accessToken: string
    user_id: number
    name: string
}

export interface TagView extends Partial<RouteLocationNormalized>{
    fullPath: string,
    meta: object
}
