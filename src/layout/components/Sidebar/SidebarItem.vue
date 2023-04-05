<template>
    <div v-if="!item.meta || !item.meta.hidden">
        <!--有一个要显示的子路由 && 子路由没有下一级子路由 && 有meta属性-->
        <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && onlyOneChild.meta">
            <a v-if="onlyOneChild.meta.type === 'link'" :href="onlyOneChild.meta.link" target="_blank" rel="noopener">
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                    <SvgIcon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon"/>
                    <template #title>{{ $t('route.' + onlyOneChild.meta.title) }}</template>
                </el-menu-item>
            </a>

            <el-menu-item v-else :index="resolvePath(onlyOneChild.path)">
                <SvgIcon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon"/>
                <template #title>{{ $t('route.' + onlyOneChild.meta.title) }}</template>
            </el-menu-item>
        </template>

        <el-sub-menu v-else :index="resolvePath(item.path)">
            <template #title>
                <SvgIcon v-if="item.meta && item.meta.icon" :name="item.meta.icon"/>
                <span v-if="item.meta && item.meta.title">{{ $t('route.' + item.meta.title) }}</span>
            </template>

            <SidebarItem v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)"/>
        </el-sub-menu>
    </div>
</template>

<script setup lang="ts">
import path from 'path-browserify'
import {isExternalUrl} from '@/utils/validate'
import SvgIcon from '@/components/Icon/SvgIcon.vue'

const props = defineProps({
    item: {type: Object, required: true},
    basePath: {type: String, required: true}
})

// 记录唯一显示的子路由
const onlyOneChild = ref()

function hasOneShowingChild(children = [] as any, parent: any){
    if(!children){
        children = []
    }
    const showingChildren = children.filter((item: any) => {
        return !(item.meta && item.meta.hidden)
    })
    // 只有一个子路由时，默认显示子路由
    if(showingChildren.length === 1){
        onlyOneChild.value = showingChildren[0]
        return true
    }
    // 没有子路由要显示时显示父路由
    if(showingChildren.length === 0){
        onlyOneChild.value = {...parent, path: '', noShowingChildren: true}
        return true
    }
    return false
}

function resolvePath(routePath: string){
    if(isExternalUrl(routePath)){
        return routePath
    }
    if(isExternalUrl(props.basePath as string)){
        return props.basePath
    }

    return path.resolve(props.basePath, routePath)
}

</script>
