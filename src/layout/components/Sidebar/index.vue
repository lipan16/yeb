<template>
    <div :class="{'has-logo': sidebarLogo,  'sidebar-container': true}">
        <SidebarLogo v-show="sidebarLogo" :collapse="isCollapse"/>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                mode="vertical"
                :default-active="activeMenu"
                :collapse="isCollapse"
                :unique-opened="true"
                :collapse-transition="false"
                :router="true"
                background-color="var(--sidebar-menu-bg)"
                text-color="var(--sidebar-menu-text)"
                active-text-color="var(--sidebar-menu-active-text)"
            >
                <SidebarItem v-for="route in permissionStore.routes" :key="route.path" :item="route" :base-path="route.path" :is-collapse="isCollapse"/>
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
    if(meta?.activeMenu){
        return meta.activeMenu as string
    }
    return path
})
</script>

<style lang="less">
.has-logo{
    .el-scrollbar{
        height: calc(100% - 50px) !important;
    }
}

.sidebar-container{
    flex-shrink: 0;
    height: 100%;
    width: var(--sidebar-width) !important;
    transition: all 0.2s ease 0s;
    background-color: var(--sidebar-menu-bg);
    font-size: 0;
    z-index: 1001;
    overflow-y: visible;

    .el-scrollbar{
        height: 100%;
        overflow-y: visible;

        .horizontal-collapse-transition{
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }

        .scrollbar-wrapper{
            overflow-x: hidden !important;

            .el-menu{
                border: none;
                height: 100%;
                width: 100% !important;

                .svg-icon{
                    margin-right: 16px;
                }
            }

            .el-menu--collapse{
                .is-active{
                    &:before{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 3px;
                        height: 100%;
                        background-color: var(--sidebar-sub-menu-hover);
                        content: "";
                        z-index: 1;
                    }
                }

                .svg-icon{
                    margin-right: 0;
                }

                .el-menu-tooltip__trigger{
                    padding: 0 !important;
                    justify-content: center;
                }

                .el-sub-menu{
                    .el-sub-menu__title{
                        padding: 0 !important;
                        justify-content: center;

                        span{
                            display: none;
                        }

                        .el-sub-menu__icon-arrow{
                            display: none;
                        }
                    }
                }
            }
        }

        // menu hover
        .submenu-title-noDropdown, .el-sub-menu__title{
            &:hover{
                color: var(--sidebar-menu-active-text) !important;
                background-color: var(--sidebar-menu-hover) !important;
            }
        }

        .el-sub-menu .el-menu-item{
            background-color: var(--sidebar-sub-menu-bg) !important;

            &.is-active{
                background-color: var(--sidebar-sub-menu-hover) !important;
                color: var(--sidebar-sub-menu-active-text) !important;
            }

            &:hover{
                color: var(--sidebar-sub-menu-active-text) !important;
            }
        }
        .nest-menu .el-sub-menu .el-sub-menu__title{
            //background-color: var(--sidebar-sub-menu-bg) !important;
            //
            //&:hover{
            //    background-color: var(--sidebar-sub-menu-hover) !important;
            //    color: var(--sidebar-sub-menu-active-text) !important;
            //}
        }
    }
}

</style>
