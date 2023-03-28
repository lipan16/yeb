// 单点登录核心类
import {TOKEN_KEY} from '@/setting/cacheKey'
import {getAuthCache} from '@/utils/auth'
import {getUrlParam} from '@/utils'
import {useAppStoreWithOut} from '@/store/modules/app'

export function useSso() {
    const locationUrl = window.location.origin
    const {projectConfig} = useAppStoreWithOut()

    /**
     * 单点登录
     */
    async function ssoLogin() {
        if (projectConfig.openSso) {
            // 是否开启sso
            const token = getAuthCache<string>(TOKEN_KEY)
            const ticket = getUrlParam('ticket')
            if (!token) {
                console.log(ticket) // ST-7911-eAWVLtrNEfwclnPdzu2T-11
                if (ticket) {
                    // 本身存在ticket
                    // await validateCasLogin({ // 验证ticket
                    //     ticket: ticket,
                    //     service: locationUrl,
                    // }).then(res => {
                    //     const userStore = useUserStoreWithOut();
                    // userStore.setToken(res.token);
                    // userStore.setToken(ticket);
                    // return userStore.afterLoginAction(true, {});
                    // })
                } else {
                    window.location.href = projectConfig.ssoUrl + '/login?service=' + locationUrl
                }
            }
        }
    }

    /**
     * 退出登录
     */
    async function ssoLogOut() {
        window.location.href = projectConfig.ssoUrl + '/logout?service=' + locationUrl
    }

    return {ssoLogin, ssoLogOut}
}
