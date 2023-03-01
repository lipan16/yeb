/**
 * 验证登录信息，获取权限、菜单列表等
 */
import {LoginData, LoginResponseData, VerifyCode} from "#/store"
import yebRequest from "@/utils/request"

/**
 * 获取图片验证码
 */
const getCaptcha = () =>
    yebRequest<any, VerifyCode>({
        url: "/captcha?t=" + new Date().getTime().toString(),
        method: "get"
    })

const login = (loginData: LoginData) =>
    yebRequest<LoginData, LoginResponseData>({
        // url: '/sys/login?username=' + loginData.username + '&password=' + loginData.password,
        url: "/sys/login",
        method: "get",
        data: loginData
    })

const logout = () => yebRequest({url: "/sys/logout", method: "delete"})

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
const getUserInfo = () => yebRequest({url: "/sys/getUserInfo", method: "post"})

const getMenuList = () => yebRequest({url: "/sys/getMenuList", method: "post"})

export default {getCaptcha, login, logout, getUserInfo, getMenuList}
