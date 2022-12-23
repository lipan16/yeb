import {UserInfo} from '#/user'
import {LoginInfo, CreateStorageParams} from '#/store'

import {pick} from 'lodash'
import {toRaw} from 'vue'

import {APP_LOCAL_CACHE_KEY, APP_SESSION_CACHE_KEY, DEFAULT_CACHE_TIME, enableStorageEncryption, LOGIN_INFO_KEY, ROLES_KEY, TENANT_ID, TOKEN_KEY, USER_INFO_KEY} from '@/setting/KEY'
import {createStorage} from '@/utils/cache/createStorage'
import {Memory} from '@/utils/cache/memory'

const createStorageOptions = (storage: Storage, options: Partial<CreateStorageParams> = {}) => {
    return createStorage({
        prefixKey: '',
        storage,
        hasEncrypt: enableStorageEncryption,
        timeout: DEFAULT_CACHE_TIME,
        ...options,
    })
}

interface BasicStore{
    [TOKEN_KEY]: string | number | null | undefined;
    [USER_INFO_KEY]: UserInfo;
    [ROLES_KEY]: string[];
    [TENANT_ID]: string;
    [LOGIN_INFO_KEY]: LoginInfo;
}

export type StorageKeys = keyof BasicStore;

const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)
const ls = createStorageOptions(localStorage)
const ss = createStorageOptions(sessionStorage)

function initWebStorageCache(){
    const localCache = ls.get(APP_LOCAL_CACHE_KEY)
    const sessionCache = ss.get(APP_SESSION_CACHE_KEY)
    localCache && localMemory.resetCache(localCache)
    sessionCache && sessionMemory.resetCache(sessionCache)
}

export class WebStorageCache{
    // local
    static getLocal<T>(key: StorageKeys){
        return localMemory.get(key)?.value as Nullable<T>
    }

    static setLocal(key: StorageKeys, value: BasicStore[StorageKeys], immediate = false): void{
        localMemory.set(key, toRaw(value))
        immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
    }

    static removeLocal(key: StorageKeys, immediate = false): void{
        localMemory.remove(key)
        immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
    }

    static clearLocal(immediate = false): void{
        localMemory.clear()
        immediate && ls.clear()
    }

    //  session
    static getSession<T>(key: StorageKeys){
        return sessionMemory.get(key)?.value as Nullable<T>
    }

    static setSession(key: StorageKeys, value: BasicStore[StorageKeys], immediate = false): void{
        sessionMemory.set(key, toRaw(value))
        immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
    }

    static removeSession(key: StorageKeys, immediate = false): void{
        sessionMemory.remove(key)
        immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
    }

    static clearSession(immediate = false): void{
        sessionMemory.clear()
        immediate && ss.clear()
    }

    // 清空local 和 session 缓存
    static clearAll(immediate = false){
        sessionMemory.clear()
        localMemory.clear()
        if(immediate){
            ls.clear()
            ss.clear()
        }
    }
}

window.addEventListener('beforeunload', function(){
    // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
    // pick(obj, key) 从obj中取出key的值，并封装object返回
    ls.set(APP_LOCAL_CACHE_KEY, pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]))
    ss.set(APP_SESSION_CACHE_KEY, pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]))
})

function storageChange(e: any){
    const {key, newValue, oldValue} = e

    if(!key){
        WebStorageCache.clearAll()
        return
    }

    if(!!newValue && !!oldValue){
        if(APP_LOCAL_CACHE_KEY === key){
            WebStorageCache.clearLocal()
        }
        if(APP_SESSION_CACHE_KEY === key){
            WebStorageCache.clearSession()
        }
    }
}

window.addEventListener('storage', storageChange)

initWebStorageCache()
