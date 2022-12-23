// 缓存默认过期时间
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// 开启缓存加密后，加密密钥。采用aes加密
export const cacheCipher = {
    key: '_11111000001111@',
    iv: '@11111000001111_',
}

// 是否加密缓存，默认生产环境加密
export const enableStorageEncryption = false

// token key
export const TOKEN_KEY = 'TOKEN__'

// user info key
export const USER_INFO_KEY = 'USER__INFO__'

// role info key
export const ROLES_KEY = 'ROLES__KEY__'

// base global local key
export const APP_LOCAL_CACHE_KEY = 'APP__LOCAL__KEY__'

// base global session key
export const APP_SESSION_CACHE_KEY = 'APP__SESSION__KEY__'

// 租户 key
export const TENANT_ID = 'TENANT_ID'

// login info key
export const LOGIN_INFO_KEY = 'LOGIN__INFO__'
