<template>
    <div v-if="!item.meta || !item.meta.hidden">
        <template
            v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && (!item.meta || !item.meta.alwaysShow)">
            <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest }">
                    <SvgIcon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon"/>

                    <template #title>
                        {{ $t('route.' + onlyOneChild.meta.title) }}
                    </template>
                </el-menu-item>
            </AppLink>
        </template>

        <el-sub-menu v-else :index="resolvePath(item.path)" popper-class="yeb-el-menu--popup-container">
            <template #title>
                <SvgIcon v-if="item.meta && item.meta.icon" :name="item.meta.icon"/>
                <span v-if="item.meta && item.meta.title">{{ $t('route.' + item.meta.title) }}</span>
            </template>

            <SidebarItem
                v-for="child in item.children"
                :key="child.path"
                :item="child"
                :is-nest="true"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-sub-menu>
    </div>
</template>

<script setup lang="ts">
import path from 'path-browserify'
import {isExternal} from '@/utils/validate'
import AppLink from '@/layout/components/Sidebar/AppLink.vue'

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    isNest: {
        type: Boolean,
        required: false,
    },
    basePath: {
        type: String,
        required: true,
    },
})

const onlyOneChild = ref()

function hasOneShowingChild(children = [] as any, parent: any){
    if(!children){
        children = []
    }
    const showingChildren = children.filter((item: any) => {
        if(item.meta && item.meta.hidden){
            return false
        }else{
            // Temp set(will be used if only has one showing child)
            onlyOneChild.value = item
            return true
        }
    })
    // When there is only one child router, the child router is displayed by default
    if(showingChildren.length === 1){
        return true
    }
    // Show parent if there are no child router to display
    if(showingChildren.length === 0){
        onlyOneChild.value = {...parent, path: '', noShowingChildren: true}
        return true
    }
    return false
}

function resolvePath(routePath: string){
    if(isExternal(routePath)){
        return routePath
    }
    if(isExternal(props.basePath)){
        return props.basePath
    }

    return path.resolve(props.basePath, routePath)
}
</script>

<style lang="less">
.yeb-el-menu--popup-container{
    .el-menu-item{
        &:hover{
            background-color: var(--el-menu-hover-color) !important;
            color: var(--el-menu-active-color) !important;
        }
    }
    .nest-menu .el-sub-menu .el-sub-menu__title{
        &:hover{
            background-color: var(--el-menu-hover-color) !important;
            color: var(--el-menu-active-color) !important;
        }
    }
}
</style>
