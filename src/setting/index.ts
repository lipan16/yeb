export const SETTING = {
    BPI_TIME_1: "2018-11-04 18:36:00",
    BPI_TIME_2: "2020-11-07 12:20:00",
    BPI_TIME_3: "2022-01-16 11:32:00",
    // 页面标题
    title: import.meta.env.VITE_APP_TITLE,
    // 是否展示设置按钮
    showSettings: true,
    tagsView: true,
    sidebarLogo: true,
    theme: "#fd726d",
    APP_PRESET_BG_COLOR: ["#0960bd", "#1890ff", "#009688", "#536dfe", "#ff5c93", "#ee4f12", "#0096c7", "#9c27b0", "#ff9800"],
    headerTheme: "#ffffff",
    HEADER_PRESET_BG_COLOR: ["#ffffff", "#151515", "#009688", "#5172dc", "#018ffb", "#409eff", "#e74c3c", "#24292e", "#394664", "#001529", "#383f45"],
    sidebarTheme: "#ffffff",
    SIDEBAR_PRESET_BG_COLOR: ["#ffffff", "#409eff", "#009688", "#27ae60", "#e74c3c", "#fd726d", "#f39c12", "#9b59b6", "#5172dc"],
    // 灰色
    grayMode: false,
    // 色弱
    colorWeak: false,

    errorLog: "production",

    // 语言
    local: "zh",

    // 权限缓存存放位置。默认存放于localStorage
    permissionCacheType: "local",

    // 是否开启单点登录
    openSso: false,

    // 单点登录地址
    ssoUrl: import.meta.env.VITE_APP_SSO_URL
}
