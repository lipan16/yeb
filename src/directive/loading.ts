import type {App, Directive, DirectiveBinding} from "vue"

const loadingDirective: Directive = {
    mounted(el: Element, binding: DirectiveBinding<any>) {
        console.log("loadingDirective", el)
        console.log("loadingDirective", binding)
    },
    updated(el, binding) {
        const instance = el.instance
        if (!instance) {
            return
        }
        if (binding.oldValue !== binding.value) {
            instance.setLoading?.(binding.value && !instance.loading)
        }
    },
    unmounted(el) {
        el?.instance?.close()
    }
}

export default function setupLoadingDirective(app: App) {
    app.directive("loading", loadingDirective)
}
