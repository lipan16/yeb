/**
 * 验证登录信息，获取权限、菜单列表等
 */
import {AxiosPromise} from 'axios'
import {LoginData, VerifyCode} from '#/store'
import Request from '@/utils/request'

/**
 * 获取图片验证码
 */
const getCaptcha = (): AxiosPromise<VerifyCode> => Request({
    url: '/captcha?t=' + new Date().getTime().toString(), method: 'get',
})

const login = (loginData: LoginData) => Request({
    url: '/sys/login?username=' + loginData.username + '&password=' + loginData.password, method: 'get',
})

const logout = () => Request({url: '/sys/logout', method: 'delete'})

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
const getUserInfo = () => Request({url: '/sys/getUserInfo', method: 'post'})

const getMenuList = () => Request.post('/sys/getMenuList')

export default {getCaptcha, login, logout, getUserInfo, getMenuList}
