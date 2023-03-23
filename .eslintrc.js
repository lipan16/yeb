module.exports = {
    root: true, // eslint 一旦发现配置文件中有root：true，就会停止在父级目录中寻找
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    extends: ['plugin:vue/vue3-essential', 'plugin:vue/essential', 'eslint:recommended', 'prettier'],
    plugins: ['vue', '@typescript-eslint'],
    // 解决全局变量被识别为错误
    globals: {
        window: true,
        NodeJS: true,
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.vue'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
    // 自定义规则
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        'vue/custom-event-name-casing': 'off',
        'vue/attributes-order': 'off',
        'vue/one-component-per-file': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/html-self-closing': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/require-default-prop': 'off',
        'vue/no-v-model-argument': 'off',
        'vue/no-arrow-functions-in-watch': 'off',
        'vue/no-template-key': 'off',
        'vue/no-v-html': 'off',
        'vue/comment-directive': 'off',
        'vue/no-parsing-error': 'off',
        'vue/no-deprecated-v-on-native-modifier': 'off',
        'vue/multi-word-component-names': 'off',

        
    }
}
