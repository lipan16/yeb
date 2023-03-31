import {YebStorageParams} from '#/store'
import {AesEncryption, useEncryption} from '@/utils/encrypt'
import {isNullOrUnDef} from '@/utils/is'
import {DEFAULT_CACHE_TIME, enableStorageEncryption} from '@/setting/cacheKey'

const createYebStorage = ({prefixKey = '', storage = sessionStorage, timeout = null, hasEncrypt = true}: Partial<YebStorageParams> = {}) => {
    const encryption = useEncryption()

    const WebStorage = class WebStorage {
        private storage: Storage
        private prefixKey?: string
        private encryption: AesEncryption
        private hasEncrypt: boolean

        constructor() {
            this.storage = storage
            this.prefixKey = prefixKey
            this.encryption = encryption
            this.hasEncrypt = hasEncrypt
        }

        private getKey(key: string) {
            return (this.prefixKey ? `${this.prefixKey}__${key}` : key).toUpperCase()
        }

        /**
         * Set cache
         *
         * @param key
         * @param value
         * @param expire Expiration time in seconds
         */
        set(key: string, value: any, expire: number | null = timeout) {
            const stringData = JSON.stringify({
                value,
                time: Date.now(),
                expire: isNullOrUnDef(expire) ? null : Date.now() + expire * 1000
            })

            const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData
            this.storage.setItem(this.getKey(key), stringifyValue)
        }

        /**
         * Read cache
         *
         * @param key
         * @param def 默认值
         */
        get(key: string, def: any = null): any {
            const val = this.storage.getItem(this.getKey(key))
            if (!val) {
                return def
            }

            try {
                const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val
                const data = JSON.parse(decVal)
                const {value, expire} = data
                if (isNullOrUnDef(expire) || expire >= Date.now()) {
                    // 未过期
                    return value
                }
                this.remove(key)
            } catch (e) {
                return def
            }
        }

        /**
         * Delete cache based on key
         *
         * @param key
         */
        remove(key: string) {
            this.storage.removeItem(this.getKey(key))
        }

        /**
         * Delete all caches of this instance
         */
        clear(): void {
            this.storage.clear()
        }
    }

    return new WebStorage()
}

export const createYebStorageOptions = (storage: Storage, options: Partial<YebStorageParams> = {}) => {
    return createYebStorage({
        prefixKey: '',
        storage,
        hasEncrypt: enableStorageEncryption,
        timeout: DEFAULT_CACHE_TIME,
        ...options
    })
}
