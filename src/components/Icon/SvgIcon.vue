<template>
    <svg aria-hidden="true" class="svg-icon" :style="getStyle">
        <use :href="symbolId"/>
    </svg>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'

export default defineComponent({
    name: 'SvgIcon',
    props: {
        prefix: {type: String, default: 'icon'},
        name: {type: String, require: true},
        size: {type: [Number, String], default: 16},
        color: {type: String},
    },
    setup(props){
        const symbolId = computed(() => `#${props.prefix}-${props.name}`)

        const getStyle = computed(() => {
            const {size, color} = props
            let s = `${size}`
            s = `${s.replace('px', '')}px`
            return {width: s, height: s, fill: color}
        })

        return {symbolId, getStyle}
    },
})
</script>
<style scoped>
.svg-icon{
    vertical-align: -0.15em;
    overflow: hidden;
    fill: currentColor;
}
</style>
