import {defineStore} from 'pinia'
import {ref} from 'vue'

import {store} from '@/store'
import {TagView} from '#/store'

const tagsViewStore = defineStore('tagsView', () => {
    /**
     * state
     *
     * visitedViews 访问的view
     * cachedViews 缓存的view
     */
    const visitedViews = ref<TagView[]>([])
    const cachedViews = ref<TagView[]>([])

    // actions
    function addVisitedView(route: TagView) {
        if(visitedViews.value.some(v => v.path === route.path)){
            return
        }
        if(route.meta && route.meta.affix){
            visitedViews.value.unshift({...route})
        }else{
            visitedViews.value.push({...route})
        }
    }

    function addCachedView(route: TagView) {
        if (cachedViews.value.some(v => v.path === route.path)) {
            return
        }
        if (route.meta?.keepAlive) {
            cachedViews.value.push(route)
        }
    }

    function delVisitedView(route: TagView) {
        return new Promise(resolve => {
            for (const [i, v] of visitedViews.value.entries()) {
                if (v.path === route.path) {
                    visitedViews.value.splice(i, 1)
                    break
                }
            }
            resolve([...visitedViews.value])
        })
    }

    function delCachedView(route: TagView) {
        return new Promise(resolve => {
            for (const [i, v] of cachedViews.value.entries()) {
                if (v.path === route.path) {
                    cachedViews.value.splice(i, 1)
                    break
                }
            }
            resolve([...cachedViews.value])
        })
    }

    function delOtherVisitedViews(route: TagView) {
        return new Promise(resolve => {
            visitedViews.value = visitedViews.value.filter(v => v.meta?.affix || v.path === route.path)
            resolve([...visitedViews.value])
        })
    }

    function delOtherCachedViews(route: TagView) {
        return new Promise(resolve => {
            cachedViews.value = cachedViews.value.filter(v => v.path === route.path)
            resolve([...cachedViews.value])
        })
    }

    function updateVisitedView(route: TagView) {
        for (let v of visitedViews.value) {
            if (v.path === route.path) {
                v = Object.assign(v, route)
                break
            }
        }
    }

    function addView(route: TagView) {
        addVisitedView(route)
        addCachedView(route)
    }

    function delView(route: TagView) {
        return new Promise(resolve => {
            delVisitedView(route)
            delCachedView(route)
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value]
            })
        })
    }

    function delOtherViews(route: TagView) {
        return new Promise(resolve => {
            delOtherVisitedViews(route)
            delOtherCachedViews(route)
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value]
            })
        })
    }

    function delLeftViews(route: TagView) {
        return new Promise(resolve => {
            const currIndex = visitedViews.value.findIndex(v => v.path === route.path)
            if (currIndex === -1) {
                return
            }
            visitedViews.value = visitedViews.value.filter((item, index) => {
                // affix:true 固定tag，例如“首页”
                if (index >= currIndex || (item.meta && item.meta.affix)) {
                    return true
                }

                delCachedView(item)
                return false
            })
            resolve({
                visitedViews: [...visitedViews.value]
            })
        })
    }

    function delRightViews(route: TagView) {
        return new Promise(resolve => {
            const currIndex = visitedViews.value.findIndex(v => v.path === route.path)
            if (currIndex === -1) {
                return
            }
            visitedViews.value = visitedViews.value.filter((item, index) => {
                // affix:true 固定tag，例如“首页”
                if (index <= currIndex || (item.meta && item.meta.affix)) {
                    return true
                }

                delCachedView(item)
                return false
            })
            resolve({
                visitedViews: [...visitedViews.value]
            })
        })
    }

    function delAllViews() {
        return new Promise(resolve => {
            visitedViews.value = visitedViews.value.filter(tag => tag.meta?.affix)
            cachedViews.value = []
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value]
            })
        })
    }

    function delAllVisitedViews() {
        return new Promise(resolve => {
            visitedViews.value = visitedViews.value.filter(tag => tag.meta?.affix)
            resolve([...visitedViews.value])
        })
    }

    function delAllCachedViews() {
        return new Promise(resolve => {
            cachedViews.value = []
            resolve([...cachedViews.value])
        })
    }

    return {
        visitedViews,
        cachedViews,
        addVisitedView,
        addCachedView,
        delVisitedView,
        delCachedView,
        delOtherVisitedViews,
        delOtherCachedViews,
        updateVisitedView,
        addView,
        delView,
        delOtherViews,
        delLeftViews,
        delRightViews,
        delAllViews,
        delAllVisitedViews,
        delAllCachedViews
    }
})

export function useTagsViewStoreWithOut() {
    return tagsViewStore(store)
}
