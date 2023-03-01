import type {App, Directive, DirectiveBinding} from "vue"
import {useUserStoreWithOut} from "@/store/modules/user"

const authDirective: Directive = {
    mounted(el: Element, binding: DirectiveBinding<any>) {
        const {value} = binding
        const userStore = useUserStoreWithOut()

        if (value) {
            const requiredRoles = value // DOM绑定需要的角色编码

            const hasRole = userStore.roles.some(s => s === requiredRoles)

            if (!hasRole) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error('need roles! Like v-auth="ADMIN"')
        }
    }
}

export default function setupPermissionDirective(app: App) {
    app.directive("auth", authDirective)
}
