<template>
    <div :class="{'has-logo': sidebarLogo, 'sidebar-container': true}" :style="{backgroundColor: appStore.projectConfig.sidebarTheme}">
        <SidebarLogo v-show="sidebarLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                mode="vertical"
                :default-active="activeMenu"
                :collapse="isCollapse"
                :unique-opened="true"
                :collapse-transition="false"
                :router="true"
                :style="{
                    '--el-menu-bg-color': appStore.projectConfig.sidebarTheme,
                    '--el-menu-hover-bg-color': appStore.projectConfig.sidebarTheme,
                    '--el-menu-hover-color': appStore.projectConfig.theme,
                    '--el-menu-active-color': appStore.projectConfig.theme,
                    '--sidebar-sub-menu-hover': appStore.projectConfig.theme,
                    '--text-color': appStore.projectConfig.theme
                }"
            >
                <SidebarItem v-for="route in permissionStore.routes" :key="route.path" :item="route" :base-path="route.path" :is-collapse="isCollapse" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'
import SidebarLogo from '@/layout/components/Sidebar/SidebarLogo.vue'
import {useAppStoreWithOut} from '@/store/modules/app'
import {usePermissionStoreWithOut} from '@/store/modules/permission'

const route = useRoute()
const appStore = useAppStoreWithOut()
const permissionStore = usePermissionStoreWithOut()

const sidebarLogo = computed(() => appStore.projectConfig.sidebarLogo)
const isCollapse = computed(() => !appStore.sidebarOpened)
const activeMenu = computed<string>(() => {
    const {meta, path} = route
    if (meta?.activeMenu) {
        return meta.activeMenu as string
    }
    return path
})
</script>

<style lang="less">
.has-logo {
    .el-scrollbar {
        height: calc(100% - 50px) !important;
    }
}

.sidebar-container {
    flex-shrink: 0;
    height: 100%;
    width: var(--sidebar-width) !important;
    transition: width 0.3s ease 0s;
    font-size: 0;
    z-index: 899;
    overflow-y: visible;

    .el-scrollbar {
        height: 100%;
        overflow-y: visible;

        .scrollbar-wrapper {
            overflow-x: hidden !important;

            .el-menu {
                border: none;
                height: 100%;
                width: 100% !important;

                .svg-icon {
                    margin-right: 16px;
                }
            }

            .el-menu--collapse {
                .is-active {
                    &:before {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 3px;
                        height: 100%;
                        background-color: var(--sidebar-sub-menu-hover);
                        content: '';
                        z-index: 1;
                    }
                }

                .svg-icon {
                    margin-right: 0;
                }

                .el-menu-tooltip__trigger {
                    padding: 0 !important;
                    justify-content: center;
                }

                .el-sub-menu {
                    .el-sub-menu__title {
                        padding: 0 !important;
                        justify-content: center;

                        span {
                            display: none;
                        }

                        .el-sub-menu__icon-arrow {
                            display: none;
                        }
                    }
                }
            }
        }

        // menu hover
        .submenu-title-noDropdown,
        .el-sub-menu__title {
            &:hover {
                color: var(--el-menu-hover-color) !important;
            }
        }

        .el-sub-menu .el-menu-item {
            background-color: var(--sidebar-sub-menu-bg) !important;

            &.is-active {
                background-color: rgba(255, 92, 147, 0.1) !important;
            }

            &:hover {
                color: var(--el-menu-hover-color) !important;
            }
        }
    }
}
</style>
