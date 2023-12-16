// @see https://eslint.bootcss.com/docs/rules

module.exports = {
    // eslint 工作环境
    "env": {
        "browser": true, // 工作在浏览器端
        "es2021": true, // 支持es2021解析模式
        "node": true,
        "jest": true,
    },
    // 规则继承
    "extends": [
        // 全部规则默认是关闭的，这个配置项开启推荐规则，推荐规则参照文档
        // 比如：函数不能重名，对象不能出现重复的key
        "eslint:recommended",
        // ts 语法规则
        "plugin:@typescript-eslint/recommended",
        // vue3 语法规则
        "plugin:vue/vue3-essential"
    ],
    // 要为特定类型的文件指定处理器
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    // 指定如何解析语法
    "parser": "vue-eslint-parser",
    // 指定解析选项
    "parserOptions": {
        "ecmaVersion": "latest", // 校验 ECMA 最新版本
        "parser": "@typescript-eslint/parser",
        "sourceType": "module", // "设置为 script（默认），或者module 代码在ECMA 模块中"
        "parser": "@typescript-eslint/parser",
        "jsxPragma": "React",
        "ecamFeatures": {
            "jsx": true
        }
    },
    // eslint 支持使用第三方插件，在使用前需要使用包管理器安装它
    // 该eslint-plugin-前缀可以从插件名称被省略
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    // eslint 规则
    /**
     * "off" 或 0 ==> 关闭规则
     * "warn" 或 1 ==> 打开的规则作为警告（不影响代码运行）
     * "error" 或 2 ==> 规则作为一个错误（代码不能运行，界面报错）
     */
    "rules": {
        // eslint 规则
        "no-var": "error", // 要求使用 let 或 const 定义变量而不是 var
        "no-multiple-empty-lines": ["warn", { max: 2 }],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-unexpected-multiline": "off",
        "no-useless-escape": "off",

        // typescript (https://typescript-eslint.io/rules)
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/prefer-ts-expect-error": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
    }
}
