<template>
    <div class="drawer-container">
        <h3 class="drawer-title">系统布局配置</h3>
        <div class="drawer-item">
            <span>系统主题</span>
            <div style="float: right; height: 26px; margin: -3px 8px 0 0">
                <el-color-picker
                    @change="sysThemeChange"
                    v-model="appStore.projectConfig.theme"
                    :predefine="SETTING.APP_PRESET_BG_COLOR"
                    class="theme-picker"
                    popper-class="theme-picker-dropdown"
                />
            </div>
        </div>

        <div>
            <el-divider content-position="center">顶栏主题</el-divider>
            <div class="themes">
                <span
                    v-for="item in SETTING.HEADER_PRESET_BG_COLOR"
                    :key="item"
                    class="head-theme"
                    :style="{backgroundColor: item, border: item === headerTheme ? '1px solid #4ba9ff' : ''}"
                    @click="themeChange('headerTheme', item)"
                >
                    <el-icon v-show="item === headerTheme" color="#fff"><Check /></el-icon>
                </span>
            </div>
        </div>
        <div>
            <el-divider content-position="center">菜单主题</el-divider>
            <div class="themes">
                <span
                    v-for="item in SETTING.SIDEBAR_PRESET_BG_COLOR"
                    :key="item"
                    class="head-theme"
                    :style="{backgroundColor: item, border: item === sidebarTheme ? '1px solid #4ba9ff' : ''}"
                    @click="themeChange('sidebarTheme', item)"
                >
                    <el-icon v-show="item === sidebarTheme" color="#fff"><Check /></el-icon>
                </span>
            </div>
        </div>

        <div class="switch-item">
            <span>开启 Breadcrumb</span>
            <el-switch
                v-model="appStore.projectConfig.showBreadcrumb"
                active-text="开"
                inactive-text="关"
                inline-prompt
                :style="{'--el-switch-on-color': appStore.projectConfig.theme}"
            />
        </div>
        <div class="switch-item">
            <span>开启 Tags-View</span>
            <el-switch
                v-model="appStore.projectConfig.showTagsView"
                active-text="开"
                inactive-text="关"
                inline-prompt
                :style="{'--el-switch-on-color': appStore.projectConfig.theme}"
            />
        </div>
        <div class="switch-item">
            <span>开启 Tags-View Icon</span>
            <el-switch
                v-model="appStore.projectConfig.showTagsViewIcon"
                active-text="开"
                inactive-text="关"
                inline-prompt
                :style="{'--el-switch-on-color': appStore.projectConfig.theme}"
            />
        </div>
        <div class="switch-item">
            <span>侧边栏 Logo</span>
            <el-switch
                v-model="appStore.projectConfig.showSidebarLogo"
                active-text="开"
                inactive-text="关"
                inline-prompt
                :style="{'--el-switch-on-color': appStore.projectConfig.theme}"
            />
        </div>
        <div class="switch-item">
            <span>灰色模式</span>
            <el-switch
                v-model="appStore.projectConfig.grayMode"
                @change="grayModeSwitchChange"
                active-text="开"
                inactive-text="关"
                inline-prompt
                :style="{'--el-switch-on-color': appStore.projectConfig.theme}"
            />
        </div>
        <div class="switch-item">
            <span>色弱模式</span>
            <el-switch
                v-model="appStore.projectConfig.colorWeak"
                @change="colorWeakSwitchChange"
                active-text="开"
                inactive-text="关"
                inline-prompt
                :style="{'--el-switch-on-color': appStore.projectConfig.theme}"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {useAppStoreWithOut} from '@/store/modules/app'
import {SETTING} from '@/setting'
import {setDomStyleProperty, toggleClassName} from '@/utils'

const appStore = useAppStoreWithOut()

function sysThemeChange(value: string) {
    setDomStyleProperty('--theme', value)
    setDomStyleProperty('--el-color-primary', value)
    appStore.setProjectConfig({key: 'theme', value})
}

function themeChange(key: string, value: string) {
    if(key === 'sidebarTheme') {
        setDomStyleProperty('--yeb-sidebar-bg-color', value)
    }
    appStore.setProjectConfig({key, value})
}

const headerTheme = computed(() => appStore.projectConfig.headerTheme)
const sidebarTheme = computed(() => appStore.projectConfig.sidebarTheme)

function grayModeSwitchChange(value) {
    toggleClassName(value, 'gray-mode', document.documentElement)
}

function colorWeakSwitchChange(value) {
    toggleClassName(value, 'color-weak', document.documentElement)
}
</script>

<style lang="less" scoped>
.drawer-container {
    padding: 24px;
    font-size: 14px;
    word-wrap: break-word;
    height: 100%;
    overflow-y: auto;

    .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
    }

    .themes {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .head-theme {
            width: 16px;
            height: 16px;
            border-radius: 2px;
            border: 1px solid #ddd;
        }
    }

    .switch-item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        margin: 12px 0;
        height: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
