import {ConfigEnv, defineConfig, loadEnv, UserConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import {ElementPlusResolver} from "unplugin-vue-components/resolvers"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import {createHtmlPlugin} from "vite-plugin-html"
import {createSvgIconsPlugin} from "vite-plugin-svg-icons"
import legacy from "@vitejs/plugin-legacy"
import {viteMockServe} from "vite-plugin-mock"
import eslintPlugin from "vite-plugin-eslint"

export default defineConfig(({mode, command}: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, process.cwd(), "")
    const isBuild = command === "build"

    return {
        base: env.VITE_APP_PUBLIC_PATH,
        resolve: {
            alias: {
                "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
                "@": path.resolve(__dirname, "src"),
                "#": path.resolve(__dirname, "types")
            }
        },
        plugins: [
            vue(),
            eslintPlugin({
                include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"]
            }),
            viteMockServe({
                supportTs: true,
                watchFiles: true,
                logger: true,
                mockPath: "mock"
            }),
            createHtmlPlugin({
                inject: {
                    data: {title: env.VITE_APP_TITLE}
                }
            }),
            AutoImport({
                // 自动导入vue, vue-router, @vueuse/core相关函数
                imports: ["vue", "vue-router", "@vueuse/core"],
                // 自动导入element plus相关函数
                resolvers: [
                    ElementPlusResolver(),
                    // 自动导入图标
                    IconsResolver({prefix: "Icon"})
                ],
                dts: path.resolve(path.resolve(__dirname, ""), "auto-imports.d.ts")
            }),
            Components({
                resolvers: [
                    // 自动注册图标
                    IconsResolver({
                        enabledCollections: ["ep"]
                    }),
                    ElementPlusResolver()
                ],
                dts: path.resolve(path.resolve(__dirname, ""), "components.d.ts")
            }),
            Icons({
                autoInstall: true
            }),
            // svg
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), "src/assets/svg/")],
                svgoOptions: isBuild,
                // default
                symbolId: "icon-[dir]-[name]"
            }),
            // @vitejs/plugin-legacy 为打包后的文件提供传统浏览器兼容性支持
            legacy()
        ],
        server: {
            host: "0.0.0.0",
            cors: true,
            proxy: {
                "/sys": {
                    target: env.VITE_APP_SERVER_URL,
                    secure: false,
                    changeOrigin: true,
                    rewrite: path => path
                },
                "/invoke.jsp": {
                    target: env.VITE_APP_SERVER_URL,
                    secure: false,
                    changeOrigin: true,
                    rewrite: path => path
                },
                "/loginS.jsp": {
                    target: env.VITE_APP_SERVER_URL,
                    secure: false,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/loginS.jsp/, "/loginS.jsp")
                }
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        build: {
            minify: "esbuild",
            target: "es2015",
            cssTarget: "chrome80",
            cssCodeSplit: false,
            sourcemap: false,
            outDir: "dist",
            emptyOutDir: true,
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    // Used to delete console in production environment
                    drop_console: true,
                    drop_debugger: true
                }
            },
            // Turning off brotliSize display can slightly reduce packaging time
            reportCompressedSize: false,
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    manualChunks: {
                        // 分包配置，配置完成自动按需加载
                        vue: ["vue", "vue-router", "pinia", "vue-i18n", "element-plus"]
                    }
                }
            }
        }
    }
})
