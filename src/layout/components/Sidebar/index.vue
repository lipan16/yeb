<template>
    <div :class="{'has-logo': showSidebarLogo, 'sidebar-container': true}">
        <SidebarLogo v-show="showSidebarLogo" :collapse="isCollapse"/>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
              router
              :default-active="defaultActiveMenu"
              :collapse="isCollapse"
              :unique-opened="true"
              :collapse-transition="false"
              background-color="transparent"
            >
                <SidebarItem v-for="route in permissionStore.routes" :key="route.path" :item="route" :base-path="route.path"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
// :style="{
// '--el-menu-bg-color': appStore.projectConfig.sidebarTheme,
//   '--el-menu-hover-bg-color': appStore.projectConfig.sidebarTheme,
//   '--el-menu-hover-color': appStore.projectConfig.theme,
//   '--el-menu-active-color': appStore.projectConfig.theme,
//   '--sidebar-sub-menu-hover': appStore.projectConfig.theme,
//   '--text-color': appStore.projectConfig.theme
// }"
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'
import SidebarLogo from '@/layout/components/Sidebar/SidebarLogo.vue'
import {useAppStoreWithOut} from '@/store/modules/app'
import {usePermissionStoreWithOut} from '@/store/modules/permission'

const route = useRoute()
const router = useRouter()
const appStore = useAppStoreWithOut()
const permissionStore = usePermissionStoreWithOut()

const showSidebarLogo = computed(() => appStore.projectConfig.showSidebarLogo)
const isCollapse = computed(() => !appStore.sidebarOpened)

// 是否有默认激活菜单
const defaultActiveMenu = computed<string>(() => {
    const {path} = route // router.currentRoute.value.path
    return router.getRoutes().find(f => f.meta?.isDefaultActive)?.path || path
})

</script>

<style lang="less">
// 鼠标 hover 时颜色
.el-menu-hover-bg-color{
    background-color: var(--yeb-sidebar-active-bg-color) !important;
}

.has-logo{
    .el-scrollbar{
        height: calc(100% - 50px) !important;
    }
}

.sidebar-container{
    border-right: 1px solid var(--yeb-border-color-light);
    flex-shrink: 0;
    height: 100%;
    width: var(--yeb-sidebar-width) !important;
    background-color: var(--yeb-sidebar-bg-color);
    transition: width .3s ease;
    font-size: 0;
    z-index: 1;
    overflow-y: visible;
    position: relative;

    .el-scrollbar{
        height: 100%;
        overflow-y: visible;

        .scrollbar-wrapper{
            overflow-x: hidden !important;
        }

        // 展开状态下样式
        .el-menu{
            border: none;

            .svg-icon{
                margin-right: 8px;
                flex-shrink: 0;
            }
        }

        // 折叠状态下样式
        .el-menu--collapse{
            position: relative;

            //.is-active{
            //    .el-sub-menu__title{
            //        color: var(--yeb-sidebar-active-bg-color) !important;
            //    }
            //
            //    &:before{
            //        position: absolute;
            //        top: 0;
            //        left: 0;
            //        width: 3px;
            //        height: 100%;
            //        background-color: var(--yeb-sidebar-active-bg-color);
            //        content: '';
            //        z-index: 1;
            //    }
            //}

            .svg-icon{
                margin-right: 0;
            }

            .el-menu-tooltip__trigger{
                padding-left: 20px;
                padding-right: 0;
            }

            // 不带子项的菜单
            .el-menu-item{
            }

            // 带子项的菜单
            .el-sub-menu{
                .el-tooltip__trigger{
                    padding-left: 20px;
                    padding-right: 0;

                    span, .el-sub-menu__icon-arrow{
                        display: none;
                    }
                }
            }
        }

        // 带子项的菜单被激活时父菜单不用颜色
        .el-sub-menu.is-active.is-opened .el-sub-menu__title{
            background-color: unset !important;
        }

        // 高亮 背景色，鼠标 hover 时，有子级菜单的背景色
        .el-menu-item:hover,
        .el-menu-item.is-active,
        .el-sub-menu.is-active .el-sub-menu__title,
        .el-sub-menu:not(.is-opened):hover .el-sub-menu__title{
            .el-menu-hover-bg-color;
        }

    }
}

// 字体颜色
.el-menu-item, .el-sub-menu__title{
    color: var(--yeb-sidebar-color);
}

// 外部链接时
.el-menu-item a, .el-menu-item a:hover, .el-menu-item i, .el-sub-menu__title i{
    color: inherit;
    text-decoration: none;
}

// 折叠情况下 一级菜单弹出样式
.el-popper.is-dark{
    border: none;
    color: var(--el-menu-active-color);
    .el-menu-hover-bg-color;

    .el-popper__arrow::before{
        .el-menu-hover-bg-color;
        border: 1px solid var(--yeb-sidebar-active-bg-color);
    }
    a{
        color: var(--el-color-white) !important;
        text-decoration: none;
    }
}

// 折叠情况下 二三级菜单弹出样式
.el-popper.is-pure.is-light .el-menu--vertical{
    .el-menu-item{
        .svg-icon{
            margin-right: 8px;
        }

        &:hover{
            color: var(--el-menu-active-color);
            .el-menu-hover-bg-color;
        }

        // 一层时激活状态样式
        &.is-active{
            color: var(--el-menu-active-color);
            .el-menu-hover-bg-color;
        }
    }


    .el-sub-menu.is-active .el-sub-menu__title{
        color: var(--el-menu-active-color);
        .el-menu-hover-bg-color;
    }

    .el-sub-menu:hover .el-sub-menu__title{
        .el-menu-hover-bg-color;
    }

    .el-popper.is-pure.is-light{
        .el-menu--vertical{
            .el-sub-menu:hover .el-sub-menu__title{
                color: var(--el-menu-active-color);
                .el-menu-hover-bg-color;
            }

            .el-sub-menu .el-sub-menu__title{
                background-color: unset;
                color: var(--yeb-sidebar-color);
            }

            .el-sub-menu.is-active .el-sub-menu__title{
                color: var(--el-menu-active-color);
                .el-menu-hover-bg-color;
            }
        }
    }
}

</style>
