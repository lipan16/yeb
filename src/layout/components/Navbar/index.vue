<template>
    <div class="navbar flex-inline" :style="{backgroundColor: appStore.projectConfig.headerTheme}">
        <div style="padding: 0 15px" @click="changeMenuCollapse">
            <svg
              :class="{'is-active': appStore.sidebarOpened}"
              class="hamburger"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
            >
                <path
                  d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
                />
            </svg>
        </div>
        <Breadcrumb v-show="appStore.projectConfig.showBreadcrumb"/>
        <div class="strong"/>
        <BPITime/>

        <AppDarkModeToggle/>

        <div class="notice">
            <el-popover trigger="click" transition="el-zoom-in-top" :width="200" :persistent="false">
                <template #reference>
                    <el-badge :is-dot="true">
                        <el-icon size="16">
                            <Bell/>
                        </el-icon>
                    </el-badge>
                </template>
                <template #default>
                    notice
                </template>
            </el-popover>
        </div>

        <SvgIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="toggle" size="13" style="margin: 0 6px"/>
        <AppLocalePicker/>

        <el-popover
          placement="bottom-end"
          :hide-after="0"
          :width="200"
          trigger="click"
          popper-class="admin-info-box"
        >
            <template #reference>
                <div class="admin-info flex-inline">
                    <el-avatar :size="24" fit="fill">
                        <img :src="userStore.avatar" alt=""/>
                    </el-avatar>
                    <div class="admin-name">{{ userStore.nickname }}</div>
                </div>
            </template>
            <div class="admin">
                <div class="admin-info-base">
                    <el-avatar :size="70" fit="fill">
                        <img :src="userStore.avatar" alt=""/>
                    </el-avatar>
                    <div class="admin-info-other">
                        <div class="admin-info-name">{{ userStore.nickname }}</div>
                        <div class="admin-info-time">{{ moment(userStore.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    </div>
                </div>
                <div class="admin-info-footer">
                    <el-button @click="onAdminInfo" type="primary" plain>{{ $t('navbar.personal center') }}</el-button>
                    <el-button @click="onLogout" type="danger" plain>{{ $t('navbar.logout') }}</el-button>
                </div>
            </div>
        </el-popover>
        <AppLogo size="20"/>
    </div>
</template>

<script lang="ts" setup>
import moment from 'moment'
import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'
import AppDarkModeToggle from '@/components/Application/AppDarkModeToggle.vue'
import AppLogo from '@/components/Application/AppLogo.vue'
import Breadcrumb from '@/layout/components/Navbar/Breadcrumb.vue'
import BPITime from '@/components/BPITime/index.vue'
import {useAppStoreWithOut} from '@/store/modules/app'
import {useUserStoreWithOut} from '@/store/modules/user'
import SvgIcon from '@/components/Icon/SvgIcon.vue'
import {routePush} from '@/utils/router'
import {router} from '@/router'

const appStore = useAppStoreWithOut()
const userStore = useUserStoreWithOut()

const changeMenuCollapse = () => {
    appStore.setSidebarOpened(!appStore.sidebarOpened)
}
const {isFullscreen, toggle} = useFullscreen()

const onAdminInfo = () => {
    routePush('/adminInfo')
}

const onLogout = () => {
    // logout().then(() => {
    router.go(0)
    // })
}

</script>

<style lang="less" scoped>
.navbar{
    color: var(--text);
    position: relative;
    z-index: 1;
    height: 50px;
    background-color: #fff;
    //-webkit-box-reflect: below 0 linear-gradient(transparent, #0005);
    //background-image: linear-gradient(90deg,#fb0094,#0000ff,#00ff00,#ffff00,#fb0094,#0000ff,#00ff00,#ffff00,#fb0094);
    //background-size: 500%;
    //animation: colorGradient 20s linear infinite;

    &::before{
        content: '';
        position: absolute;
        //inset: 0;
        background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);
        opacity: .3;
        animation: colorGradient 20s linear infinite;
        background-size: 500%;
        z-index: -1;
    }

    &::after{
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);
        animation: colorGradient 20s linear infinite;
        background-size: 500%;
        filter: blur(48px);
        z-index: -1;
    }

    .notice{
        margin: 0 6px;
    }

    .admin-info{
        padding: 0 8px;
        cursor: pointer;
        user-select: none;

        .admin-name{
            padding-left: 6px;
            white-space: nowrap;
        }
    }

    .app-logo{
        margin: 0 16px 0 0;
    }
}

@keyframes colorGradient{
    0%{
        background-position: 0 0;
    }
    0%{
        background-position: 500% 0;
    }
}

.hamburger{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
}

.hamburger.is-active{
    transform: rotate(180deg);
}

.admin{
    .admin-info-base{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-top: 10px;

        .admin-info-other{
            display: block;
            width: 100%;
            text-align: center;
            padding: 10px 0;

            .admin-info-name{
                font-size: var(--el-font-size-large);
            }
        }
    }

    .admin-info-footer{
        padding: 10px 0;
        margin: 0 -12px -12px -12px;
        display: flex;
        justify-content: space-evenly;

        .el-button{
            padding: 8px;
            margin-left: 0;
        }
    }
}
</style>
