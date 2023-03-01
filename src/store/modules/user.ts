import {UserInfo} from "#/user"
import {LoginData} from "#/store"

import {defineStore} from "pinia"

import {TOKEN_KEY} from "@/setting/KEY"
import {getAuthCache, removeAuthCache, setAuthCache} from "@/utils/auth"
import {store} from "@/store"
import {resetRouter} from "@/router"
import Api from "@/api"

export const useUserStore = defineStore("user", () => {
    /** state
     *
     * token
     * nickname 昵称
     * avatar 头像
     * roles 用户角色编码集合 → 判断路由权限
     * perms 用户权限编码集合 → 判断按钮权限
     * lastUpdateTime 上次更新时间
     */
    const token = ref<string>(getAuthCache<string>(TOKEN_KEY) || "")
    const nickname = ref<string>("")
    const avatar = ref<string>("")
    const roles = ref<Array<string>>([])
    const perms = ref<Array<string>>([])
    const lastUpdateTime = ref<number>(0)

    // actions

    // 登录
    function login(loginData: LoginData) {
        return Api.auth.login(loginData).then(response => {
            const {accessToken} = response.data
            token.value = accessToken
            setAuthCache(TOKEN_KEY, accessToken)
        })
    }

    // 获取信息(用户昵称、头像、角色集合、权限集合)
    function getUserInfo() {
        return new Promise<UserInfo>((resolve, reject) => {
            Api.auth
                .getUserInfo()
                .then(({data}) => {
                    if (!data) {
                        return reject("Verification failed, please Login again.")
                    }
                    if (!data.roles || data.roles.length <= 0) {
                        reject("getUserInfo: roles must be a non-null array!")
                    }
                    lastUpdateTime.value = new Date().getTime()
                    nickname.value = data.nickname
                    avatar.value = data.avatar
                    roles.value = data.roles
                    perms.value = data.perms
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    // 注销
    function logout() {
        return Api.auth.logout().then(() => {
            resetRouter()
            resetToken()
        })
    }

    // 重置
    function resetToken() {
        removeAuthCache(TOKEN_KEY)
        token.value = ""
        nickname.value = ""
        avatar.value = ""
        roles.value = []
        perms.value = []
    }

    return {
        token,
        nickname,
        avatar,
        lastUpdateTime,
        roles,
        perms,
        login,
        logout,
        getUserInfo,
        resetToken
    }
})

// 非setup Need to be used outside the setup
export function useUserStoreWithOut() {
    return useUserStore(store)
}
