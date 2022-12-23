import type {PropertyPath} from 'lodash'

export interface EncryptionParams{
    key: string;
    iv: string;
}

export interface CreateStorageParams extends EncryptionParams{
    prefixKey: string;
    storage: Storage;
    hasEncrypt: boolean;
    timeout?: Nullable<number>;
}

export interface Cache<V = any>{
    value?: V;
    timeoutId?: ReturnType<typeof setTimeout>;
    time?: number;
    alive?: number;
}

export interface LoginInfo{
    multi_depart?: string | number;
    userInfo?: object;
    departs?: [];
    tenantList?: [];
    isLogin?: boolean;
}

export interface PayLoadObject{
    key: PropertyPath,
    value: any
}

/**
 * 验证码类型
 */
export interface VerifyCode{
    verifyCodeImg: string;
    verifyCodeKey: string;
}

export interface LoginData{
    username: string;
    password: string;
    /**
     * 验证码Code
     */
    //verifyCode: string;
    /**
     * 验证码Code服务端缓存key(UUID)
     */
    // verifyCodeKey: string;
}
