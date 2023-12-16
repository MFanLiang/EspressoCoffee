# 提供学习的 vue 脚手架

1. eslint 配置
eslint 官方网站：http://eslint.cn

```shell
# 安装依赖
pnpm install eslint -D

# 生成配置文件：.eslint.cjs
npx eslint --init

# 生成的配置文件详细解析查看文件内部即可
```

2. vue3环境代码校验插件(安装到开发依赖内)
```shell
# 让所有与 prettier 规则存在冲突的 Eslint rules 失效，并使用 prettier 进行代码检查
"eslint-config-prettier": "^8.6.0",
"eslint-plugin-import": "^2.27.5",
"eslint-plugin-node": "^11.1.0",

# 运行更漂亮的 Eslint，使 prettier 规则优先级更高，Eslint 优先级低
"eslint-plugin-prettier": "^4.2.1",

# vue.js 的 Eslint 插件（检查vue语法错误， 发现错误指令，查找违规风格指南）
"eslint-plugin-vue": "^9.9.0",

# 该解析器允许使用 Eslint 校验所有 babel code
"@babel/eslint-parser": "^7.19.1",
```
依赖安装完成后，需要修改 .eslint.cjs 配置文件，查看该文件即可

3. 配置 prettier（让代码更美观，就是格式化代码，让代码更好看一点）
```shell
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

4. SVG 图标配置
在开发项目时会用到svg矢量图，svg矢量图比img图片文件小，运行项目更快

```shell
pnpm install vite-plugin-svg-icons -D
```
安装完成后，配置vite.config.base.ts文件，详见文件内容。

```javascript
// svg图标的使用代码，里面的icon-frame读取的是 /src/assets/icons/frame.svg 图标文件
<svg>
  {/* xlink:href 执行用哪个 svg 图标，属性值必须为 #icon-图标名称 */}
  {/* fill属性可设置图标的颜色 */}
  <use xlink:href="#icon-frame" fill="orange"></use>
</svg>
```

5. 配置 stylelint
stylelint 为 css 的 lint 工具，可格式化 css 代码，检查 css 语法错误与不合理的写法，指定 css 的书写顺序等
该项目采用 sass 的 css 扩展语法开发

```shell
# 安装 scss 以及 scss-loadder等依赖包
pnpm install sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```
安装完成后，创建并配置stylelintrc.cjs文件，详见文件内容。
创建 stylelint 的忽略配置文件 .stylelintignore，详见文件内容。
与之关联的，需要配置下package.json文件的启动脚本命令，详见文件内容。

6. axios的二次封装
详见 utils > request.ts 文件内容

7. 路由守卫
全局守卫：详细的使用和解释看 src/router/guard/userLoginInfo.ts 文件；

独享守卫：详细的使用和解释看 src/router/routes.ts 文件，文件里的login路由配置了一个 'beforeEnter' 的代码，有对应的注释解释。
