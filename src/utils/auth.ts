import {StorageKeys, WebStorageCache} from '@/utils/cache'
import {useAppStoreWithOut} from '@/store/modules/app'

const {projectConfig} = useAppStoreWithOut()
const isLocal = projectConfig.permissionCacheType === 'local'

export function getAuthCache<T>(key: StorageKeys) {
    const fn = isLocal ? WebStorageCache.getLocal : WebStorageCache.getSession
    return fn(key) as T
}

export function setAuthCache(key: StorageKeys, value) {
    const fn = isLocal ? WebStorageCache.setLocal : WebStorageCache.setSession
    return fn(key, value, true)
}

export function removeAuthCache(key: StorageKeys) {
    const fn = isLocal ? WebStorageCache.removeLocal : WebStorageCache.removeSession
    return fn(key, true)
}
