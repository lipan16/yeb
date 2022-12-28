import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import {createHtmlPlugin} from 'vite-plugin-html'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import legacy from '@vitejs/plugin-legacy'
import {viteMockServe} from 'vite-plugin-mock'

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    let isBuild = true
    return {
        base: './',
        resolve: {
            alias: {
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
                '@': path.resolve(__dirname, 'src'),
                '#': path.resolve(__dirname, 'types'),
            },
        },
        plugins: [
            vue(),
            viteMockServe({
                supportTs: true,
                watchFiles: true,
                logger: true,
                mockPath: 'mock',
            }),
            createHtmlPlugin({
                inject: {
                    data: {title: env.VITE_APP_TITLE},
                },
            }),
            AutoImport({
                // 自动导入vue相关函数
                imports: ['vue'],
                // 自动导入element plus相关函数
                resolvers: [
                    ElementPlusResolver(),
                    // 自动导入图标
                    IconsResolver({prefix: 'Icon'}),
                ],
                dts: path.resolve(path.resolve(__dirname, 'src'), 'auto-imports.d.ts'),
            }),
            Components({
                resolvers: [
                    // 自动注册图标
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                    ElementPlusResolver(),
                ],
                dts: path.resolve(path.resolve(__dirname, 'src'), 'components.d.ts'),
            }),
            Icons({
                autoInstall: true,
            }),
            // svg
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg/')],
                svgoOptions: isBuild,
                // default
                symbolId: 'icon-[dir]-[name]',
            }),
            // @vitejs/plugin-legacy 为打包后的文件提供传统浏览器兼容性支持
            legacy(),
        ],
        server: {
            cors: true,
            proxy: {
                '/sys': {
                    target: env.VITE_APP_SERVER_URL,
                    secure: false,
                    changeOrigin: true,
                    rewrite: path => path,
                },
                '/invoke.jsp': {
                    target: env.VITE_APP_SERVER_URL,
                    secure: false,
                    changeOrigin: true,
                    rewrite: path => path,
                },
                '/loginS.jsp': {
                    target: env.VITE_APP_SERVER_URL,
                    secure: false,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/loginS.jsp/, '/loginS.jsp'),
                },
            },
        },
        build: {
            cssCodeSplit: false,
            sourcemap: false,
            outDir: 'dist',
            emptyOutDir: true,
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    manualChunks: {
                        // 分包配置，配置完成自动按需加载
                        vue: ['vue', 'vue-router', 'pinia', 'vue-i18n', 'element-plus'],
                        echarts: ['echarts'],
                    },
                },
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        // 'success-color': '#55D187', //  Success color
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }
})
