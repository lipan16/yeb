export interface UserInfo {
    username: string // 用户名
    realname: string // 姓名
    tenantId?: string | number // 登录标识
    nickname: string // 昵称
    avatar: string // 头像
    roles: Array<string> // 角色列表
    perms: Array<string> // 按钮权限列表
}
