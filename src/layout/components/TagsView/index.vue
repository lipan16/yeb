<template>
    <div class="tags-view">
        <ScrollPane ref="scrollPaneRef" class="tags-view__wrapper" @scroll="handleScroll">
            <router-link
              v-for="tag in tagsViewStore.visitedViews"
              :key="tag.path"
              :data-path="tag.path"
              :class="isActive(tag) ? 'active' : ''"
              :to="{path: tag.path, query: tag.query}"
              class="tags-view__item"
              @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
              @contextmenu.prevent="openMenu(tag, $event)"
            >
                <SvgIcon v-if="appStore.projectConfig.showTagsViewIcon && tag.meta.icon" :name="tag.meta.icon" size="12" />
                <span class="tag-title">{{ $t('route.' + tag.meta?.title) }}</span>
                <span v-if="!isAffix(tag)" class="icon-close" @click.prevent.stop="closeSelectedTag(tag)">
                    <SvgIcon name="close" size="12"/>
                </span>
            </router-link>
        </ScrollPane>

        <ul v-show="visible" :style="{left: left + 'px', top: top + 'px'}" class="tags-view__menu">
            <li @click="refreshSelectedTag(selectedTag)">
                <SvgIcon name="refresh" size="12"/>
                {{ $t('tagsView.refresh') }}
            </li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
                <SvgIcon name="close" size="12"/>
                {{ $t('tagsView.close') }}
            </li>
            <li @click="closeOtherTags">
                <SvgIcon name="close_other" size="12"/>
                {{ $t('tagsView.closeOther') }}
            </li>
            <li v-if="!isFirstView()" @click="closeLeftTags">
                <SvgIcon name="close_left" size="12"/>
                {{ $t('tagsView.closeLeft') }}
            </li>
            <li v-if="!isLastView()" @click="closeRightTags">
                <SvgIcon name="close_right" size="12"/>
                {{ $t('tagsView.closeRight') }}
            </li>
            <li @click="closeAllTags(selectedTag)">
                <SvgIcon name="close_all" size="12"/>
                {{ $t('tagsView.closeAll') }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {getCurrentInstance, ComponentInternalInstance} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import path from 'path-browserify'

import ScrollPane from './ScrollPane.vue'
import {useTagsViewStoreWithOut} from '@/store/modules/tagsView'
import {usePermissionStoreWithOut} from '@/store/modules/permission'
import {TagView} from '#/store'
import {useAppStoreWithOut} from '@/store/modules/app'

const {proxy} = getCurrentInstance() as ComponentInternalInstance
const router = useRouter()
const route = useRoute()

const permissionStore = usePermissionStoreWithOut()
const tagsViewStore = useTagsViewStoreWithOut()
const appStore = useAppStoreWithOut()

const visible = ref(false)
const selectedTag = ref({})
const scrollPaneRef = ref()
const left = ref(0)
const top = ref(0)
const affixTags = ref<TagView[]>([])

watch(route, () => {
    addTags()
    moveToCurrentTag()
}, {
    //初始化立即执行
    immediate: true
})

watch(visible, value => {
    if(value){
        document.body.addEventListener('click', closeMenu)
    }else{
        document.body.removeEventListener('click', closeMenu)
    }
})

function filterAffixTags(routes: any[], basePath = '/') {
    let tags: TagView[] = []

    routes.forEach(route => {
        if(route.meta && route.meta.affix){
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                meta: {...route.meta}
            })
        }

        if(route.children){
            const childTags = filterAffixTags(route.children, route.path)
            if(childTags.length >= 1){
                tags = tags.concat(childTags)
            }
        }
    })
    return tags
}

function initTags(){
    const tags = filterAffixTags(permissionStore.routes) // 从全部路由中过滤出固定的路由
    affixTags.value = tags
    for(const tag of tags){
        // Must have route meta title
        if(tag.meta.title){
            tagsViewStore.addVisitedView(tag)
        }
    }
}

function addTags(){
    if(route.name){
        tagsViewStore.addView(route)
    }
}

function moveToCurrentTag(){
    nextTick(() => {
        for(const r of tagsViewStore.visitedViews){
            if(r.path === route.path){
                scrollPaneRef.value.moveToTarget(r)
                // when query is different then update
                if(r.fullPath !== route.fullPath){
                    tagsViewStore.updateVisitedView(route)
                }
            }
        }
    })
}

function isActive(tag: TagView){
    return tag.path === route.path
}

function isAffix(tag: TagView){
    return tag.meta && tag.meta.affix
}

function isFirstView(){
    try{
        return (selectedTag.value as TagView).fullPath === tagsViewStore.visitedViews[1].fullPath || (selectedTag.value as TagView).fullPath === '/index'
    }catch(err){
        return false
    }
}

function isLastView(){
    try{
        return (selectedTag.value as TagView).fullPath === tagsViewStore.visitedViews[tagsViewStore.visitedViews.length - 1].fullPath
    }catch(err){
        return false
    }
}

function refreshSelectedTag(view: TagView){
    tagsViewStore.delCachedView(view)
    const {fullPath} = view
    nextTick(() => {
        router.replace({path: '/redirect' + fullPath}).catch(err => {
            console.warn(err)
        })
    })
}

function toLastView(visitedViews: TagView[], view?: any){
    const latestView = visitedViews.slice(-1)[0]
    if(latestView && latestView.fullPath){
        router.push(latestView.fullPath)
    }else{
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if(view.name === 'Dashboard'){
            // to reload home page
            router.replace({path: '/redirect' + view.fullPath})
        }else{
            router.push('/')
        }
    }
}

function closeSelectedTag(view: TagView){
    tagsViewStore.delView(view).then((res: any) => {
        if(isActive(view)){
            toLastView(res.visitedViews, view)
        }
    })
}

function closeLeftTags(){
    tagsViewStore.delLeftViews(selectedTag.value).then((res: any) => {
        if(!res.visitedViews.find((item: any) => item.fullPath === route.fullPath)){
            toLastView(res.visitedViews)
        }
    })
}

function closeRightTags(){
    tagsViewStore.delRightViews(selectedTag.value).then((res: any) => {
        if(!res.visitedViews.find((item: any) => item.fullPath === route.fullPath)){
            toLastView(res.visitedViews)
        }
    })
}

function closeOtherTags(){
    router.push(selectedTag.value)
    tagsViewStore.delOtherViews(selectedTag.value).then(() => {
        moveToCurrentTag()
    })
}

function closeAllTags(view: TagView){
    tagsViewStore.delAllViews().then((res: any) => {
        toLastView(res.visitedViews, view)
    })
}

function openMenu(tag: TagView, e: MouseEvent){
    const menuMinWidth = 105
    const offsetLeft = proxy?.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = proxy?.$el.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const l = e.clientX - offsetLeft + 15 // 15: margin right

    if(l > maxLeft){
        left.value = maxLeft
    }else{
        left.value = l
    }

    top.value = e.clientY
    visible.value = true
    selectedTag.value = tag
}

function closeMenu(){
    visible.value = false
}

function handleScroll(){
    closeMenu()
}

onMounted(() => {
    initTags()
})
</script>

<style lang="less" scoped>
.tags-view{
    background: var(--bg-color);
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-view__wrapper{
        height: 36px;
        padding: 0 16px;

        .tags-view__item{
            display: inline-block;
            position: relative;
            cursor: pointer;
            line-height: 28px;
            height: 28px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin: 4px 4px 2px;

            .svg-icon{
                margin-bottom: 2px;
            }

            .tag-title{
                margin: 0 2px;
            }

            &:hover{
                color: var(--el-color-primary);
            }

            &.active{
                background-color: var(--el-color-primary);
                border-color: var(--el-color-primary);
                color: var(--el-color-primary-light-9);

                &::before{
                    content: '';
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 4px;
                }
            }

            .icon-close{
                border-radius: 50%;
                text-align: center;

                &:hover{
                    background-color: var(--yeb-sidebar-active-bg-color);
                    color: #f80000;
                }
            }
        }
    }

    // tags 右键弹出的小菜单
    .tags-view__menu{
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

        li{
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;

            &:hover{
                background: #eee;
            }
        }
    }
}
</style>
