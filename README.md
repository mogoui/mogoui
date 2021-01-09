## MogoUI component library
## 使用 React+typescript 从零到一打造一套你自己的组件库


MogoUI 是为交易所打造的一套组件库，使用 React Hooks 和 typescript
意在让大家从零到一，由浅入深的提高自己的 React 和 typescript 水平，它的官网地址是
[mogoui.com](http://mogoui.com)


### 安装最后已经发布的组件库来试试

~~~javascript
npm install mogox-ui --save
~~~

### 使用

~~~javascript
// 加载样式
import 'mogoui/dist/index.css'
// 引入组件
import { Button } from 'mogoui'
~~~

### 课程亮点

* 🔥typescript with React Hooks
* 💧渐进式的教学过程，很多章后面都有扩展作业，引导同学们深入学习和掌握知识
* ⛑️使用 react-testing-library 完成单元测试
* 📚使用 storybook 本地调试和生成文档页面
* 📚使用 react-doc-gen 自动生成文档
* 📦使用第三方库扩充组件-(react-fontawesome, react-transition-group)
* 🌹样式（Sass）文件从零开始，掌握大型应用的 CSS 组织方法
* 🎉涉及全部流程，包括最后的 npm publish，husky提交发布前验证，travis CI/CD 集成，发布文档站点等

### 一些本地开发命令

~~~bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~