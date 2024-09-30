## ✨ 简介

使用`Vue3`,`Vite`,`TypeScript`,`Ant Design Vue`等主流技术开发的开箱即用的中后台前端项目，`Vite`自动生成路由，`pinia`状态管理，`UnoCss`开发样式。

- 选择目录

```bash
cd vue-pc-template
```

- 安装全局依赖依赖，存在则不用安装

```bash
npm i -g pnpm
```

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## 🧩 图标(iconify)

- 参考 [iconify 官方地址](https://icon-sets.iconify.design/)
- VS Code 安装 Iconify IntelliSense - 图标内联显示和自动补全

## 🎗️ Git 提交示例

### Git 提交不规范会导致无法提交，`feat`关键字可以按照下面`Git 贡献提交规范`来替换。

```
git add .
git commit -m "feat: 新增功能"
git push
```

## 🎯 Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

- 如果无法运行 commitlint，请运行以下指令：

```
  npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
# pc-vue-template
# pc-vue-template
