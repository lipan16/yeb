// 单点登录核心类
import {SETTING} from "@/setting"
import {TOKEN_KEY} from "@/setting/KEY"
import {getAuthCache} from "@/utils/auth"
import {getUrlParam} from "@/utils"

export function useSso() {
    const locationUrl = window.location.origin

    /**
     * 单点登录
     */
    async function ssoLogin() {
        if (SETTING.openSso) {
            // 是否开启sso
            const token = getAuthCache<string>(TOKEN_KEY)
            const ticket = getUrlParam("ticket")
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
                    window.location.href = SETTING.ssoUrl + "/login?service=" + locationUrl
                }
            }
        }
    }

    /**
     * 退出登录
     */
    async function ssoLogOut() {
        window.location.href = SETTING.ssoUrl + "/logout?service=" + locationUrl
    }

    return {ssoLogin, ssoLogOut}
}
