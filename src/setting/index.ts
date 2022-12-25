export const SETTING = {

    // 页面标题
    title: import.meta.env.VITE_APP_TITLE,
    // 是否展示设置按钮
    showSettings: true,
    tagsView: true,
    sidebarLogo: true,
    theme: '#4bc2f5',

    errorLog: 'production',

    // 语言
    local: 'zh',

    // 权限缓存存放位置。默认存放于localStorage
    permissionCacheType: 'local',

    // 是否开启单点登录
    openSso: false,

    // 单点登录地址
    ssoUrl: import.meta.env.VITE_APP_SSO_URL,
}
