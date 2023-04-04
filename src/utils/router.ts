import {isNavigationFailure, NavigationFailureType, RouteLocationRaw} from 'vue-router'
import {router} from '@/router'
import {ElNotification} from 'element-plus'
import {i18n} from '@/lang'

/**
 * 导航失败有错误消息的路由push
 * @param to — 导航位置，同 router.push
 */
export const routePush = async (to: RouteLocationRaw) => {
    try {
        const failure = await router.push(to)
        if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
            ElNotification({
                message: i18n.global.t('utils.Navigation failed, navigation guard intercepted!'),
                type: 'error',
            })
        } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            ElNotification({
                message: i18n.global.t('utils.Navigation failed, it is at the navigation target position!'),
                type: 'warning',
            })
        }
    } catch (error) {
        ElNotification({
            message: i18n.global.t('utils.Navigation failed, invalid route!'),
            type: 'error',
        })
        console.error(error)
    }
}
