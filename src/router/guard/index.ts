import {Router} from 'vue-router'
import {createPermissionGuard} from '@/router/guard/permission'

export function setupRouterGuard(router: Router) {
    // createPageGuard(router);
    // createPageLoadingGuard(router);
    // createHttpGuard(router);
    // createScrollGuard(router);
    // createMessageGuard(router);
    // createProgressGuard(router);
    createPermissionGuard(router)
}
