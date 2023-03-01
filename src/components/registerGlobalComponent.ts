import {App} from "vue"
import SvgIcon from "./Icon/SvgIcon.vue"

export function registerGlobalComponent(app: App) {
    app.component("svg-icon", SvgIcon)
}
