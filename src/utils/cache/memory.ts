import {Cache} from '#/store'

import {omit} from 'lodash'
import {LOGIN_INFO_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY} from '@/setting/cacheKey'

// 保存时效
const NOT_ALIVE = 0

export class Memory<T = any, V = any> {
    private cache: {[key in keyof T]?: Cache<V>} = {}
    private alive: number

    constructor(alive = NOT_ALIVE) {
        // Unit second
        this.alive = alive * 1000
    }

    get getCache() {
        // 构造器中get方法语法糖
        return this.cache
    }

    setCache(cache) {
        this.cache = cache
    }

    get<K extends keyof T>(key: K) {
        return this.cache[key]
    }

    set<K extends keyof T>(key: K, value: V, expires?: number) {
        let item = this.get(key)

        if (!expires || (expires as number) <= 0) {
            expires = this.alive
        }
        if (item) {
            if (item.timeoutId) {
                clearTimeout(item.timeoutId)
                item.timeoutId = undefined
            }
            item.value = value
        } else {
            item = {value, alive: expires}
            this.cache[key] = item
        }

        if (!expires) {
            return value
        }
        const now = new Date().getTime()
        item.time = now + this.alive
        item.timeoutId = setTimeout(
            () => {
                this.remove(key)
            },
            expires > now ? expires - now : expires
        )

        return value
    }

    remove<K extends keyof T>(key: K) {
        const item = this.get(key)
        Reflect.deleteProperty(this.cache, key)
        if (item) {
            clearTimeout(item.timeoutId!)
            return item.value
        }
    }

    resetCache(cache: {[K in keyof T]: Cache}) {
        Object.keys(cache).forEach(key => {
            const k = key as any as keyof T
            const item = cache[k]
            if (item && item.time) {
                const now = new Date().getTime()
                const expire = item.time
                if (expire > now) {
                    this.set(k, item.value, expire)
                }
            }
        })
    }

    clear() {
        console.log('------clear memory cache------', this.cache)
        Object.keys(this.cache).forEach(key => {
            const item = this.cache[key]
            item.timeoutId && clearTimeout(item.timeoutId)
        })
        // 不删除登录用户的租户id，其他缓存信息都清除
        // omit(obj, key) 返回obj中除key之外的新对象，与pick相反
        this.cache = omit(this.cache, [TOKEN_KEY, USER_INFO_KEY, ROLES_KEY, LOGIN_INFO_KEY])
    }
}
