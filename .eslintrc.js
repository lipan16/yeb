module.exports = {
    root: true, // eslint 一旦发现配置文件中有root：true，就会停止在父级目录中寻找
    env: {
        node: true,
        browser: true,
        es2021: true,
        'vue/setup-compiler-macros': true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
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

        'no-useless-escape': 'off',
        'no-sparse-arrays': 'off',
        'no-prototype-builtins': 'off',
        'no-constant-condition': 'off',
        'no-use-before-define': 'off',
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off',
        'generator-star-spacing': 'off',
        // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
        'no-unreachable': 'error',
        'no-multiple-template-root': 'off',
        'no-unused-vars': 'off',
        'no-v-model-argument': 'off',
        'no-case-declarations': 'off',
        'no-var': 'error',
        // 禁止出现console
        'no-console': process.env.NODE_ENV === 'develop' ? 'off' : 'warn',
        // 禁用debugger
        'no-debugger': process.env.NODE_ENV === 'develop' ? 'off' : 'error',
        // 禁止出现重复的 case 标签
        'no-duplicate-case': 'error',
        // 禁止出现空语句块
        'no-empty': 'warn',
        // 禁止不必要的括号
        'no-extra-parens': 'off',
        // 禁止对 function 声明重新赋值
        'no-func-assign': 'warn',
        // 强制所有控制语句使用一致的括号风格
        curly: 'warn',
        // 要求 switch 语句中有 default 分支
        'default-case': 'warn',
        // 强制尽可能地使用点号
        'dot-notation': 'warn',
        // 要求使用 === 和 !==
        eqeqeq: 'warn',
        // 禁止 if 语句中 return 语句之后有 else 块
        'no-else-return': 'warn',
        // 禁止出现空函数
        'no-empty-function': 'warn',
        // 禁用不必要的嵌套块
        'no-lone-blocks': 'warn',
        // 禁止使用多个空格
        'no-multi-spaces': 'warn',
        // 禁止多次声明同一变量
        'no-redeclare': 'error',
        // 禁止在 return 语句中使用赋值语句
        'no-return-assign': 'warn',
        // 禁用不必要的 return await
        'no-return-await': 'warn',
        // 禁止自我赋值
        'no-self-assign': 'warn',
        // 禁止自身比较
        'no-self-compare': 'warn',
        // 禁止不必要的 catch 子句
        'no-useless-catch': 'warn',
        // 禁止多余的 return 语句
        'no-useless-return': 'warn',
        // 禁止变量声明与外层作用域的变量同名
        'no-shadow': 'off',
        // 允许delete变量
        'no-delete-var': 'off',
        // 强制数组方括号中使用一致的空格
        'array-bracket-spacing': 'warn',
        // 强制在代码块中使用一致的大括号风格
        'brace-style': 'warn',
        // 强制使用骆驼拼写法命名约定
        camelcase: 'warn',
        // 强制使用一致的缩进
        indent: ['warn', 4, {SwitchCase: 1}],
        // 强制在 JSX 属性中一致地使用双引号或单引号
        // 'jsx-quotes': 'warn',
        // 强制可嵌套的块的最大深度4
        'max-depth': 'warn',
        // 强制最大行数 500
        'max-lines': ['warn', {max: 500}],
        // 强制函数最大代码行数 70
        // 'max-lines-per-function': ['warn', { max: 70 }],
        // 强制函数块最多允许的的语句数量100
        'max-statements': ['warn', 100],
        // 强制回调函数最大嵌套深度3
        'max-nested-callbacks': ['warn', 3],
        // 强制函数定义中最多允许的参数数量
        'max-params': ['warn', 5],
        // 强制每一行中所允许的最大语句数量
        'max-statements-per-line': ['warn', {max: 1}],
        // 要求方法链中每个调用都有一个换行符
        'newline-per-chained-call': ['warn', {ignoreChainWithDepth: 3}],
        // 禁止 if 作为唯一的语句出现在 else 语句中
        'no-lonely-if': 'warn',
        // 禁止空格和 tab 的混合缩进
        'no-mixed-spaces-and-tabs': 'warn',
        // 禁止出现多行空行
        'no-multiple-empty-lines': 'warn',
        // 禁止出现, ;
        semi: ['warn', 'never'],
        // 强制在块之前使用一致的空格
        'space-before-blocks': 'warn',
        // 强制在 function的左括号之前使用一致的空格
        // 'space-before-function-paren': ['warn', 'never'],
        // 强制在圆括号内使用一致的空格
        'space-in-parens': 'warn',
        // 要求操作符周围有空格
        'space-infix-ops': 'warn',
        // 强制在一元操作符前后使用一致的空格
        'space-unary-ops': 'warn',
        // 强制在注释中 // 或 /* 使用一致的空格
        // "spaced-comment": "warn",
        // 强制在 switch 的冒号左右有空格
        'switch-colon-spacing': 'warn',
        // 强制箭头函数的箭头前后使用一致的空格
        'arrow-spacing': 'warn',
        'prefer-const': 'warn',
        'prefer-rest-params': 'warn',
        'no-irregular-whitespace': 'warn',
        'no-fallthrough': 'warn',
        'no-extra-boolean-cast': 'warn',
        'no-async-promise-executor': 'warn',
        'vue/script-setup-uses-vars': 'error',
        'no-undef': 'warn',
        'space-before-function-paren': 'off',
        'vue/v-on-event-hyphenation': 'off',
        'vue/component-definition-name-casing': 'off',
        'vue/require-prop-types': 'off',
        'vue/html-indent': 'off'
    }
}
