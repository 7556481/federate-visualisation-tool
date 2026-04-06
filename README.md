# FEDERATE Visualisation Tool

一个基于 **React + TypeScript + Vite** 的可视化工具，用于浏览 [CSA-FEDERATE/Proposed-BuildingBlocks](https://github.com/CSA-FEDERATE/Proposed-BuildingBlocks) 的目录结构，并以“总览卡片 + 树视图 + 详情面板”的方式快速定位 Building Block。

> 在线版本：<https://xnnixa.github.io/federate-visualisation-tool/>

---

## 1. 项目目标

本项目希望解决以下问题：

- 快速理解 Building Blocks 的层级结构（目录与文件）。
- 支持按名称/全称进行搜索，并自动展开相关父级节点。
- 在详情侧栏查看路径、层级、子项统计，并尝试加载对应目录 README。
- 提供浅色/深色主题切换，并将主题持久化到本地存储。

---

## 2. 核心功能

### 2.1 双视图浏览

- **Overview（总览）**：按当前层级展示卡片化入口，适合“先看全局再深入”。
- **Tree（树视图）**：以可展开树结构精确定位节点，适合“按路径追踪”。

### 2.2 路由驱动的层级导航

- 使用 `HashRouter`，支持在 URL 中表示当前浏览层级（便于分享和回到上下文）。
- 顶部 breadcrumb 可快速回退到上层或根层。

### 2.3 统一搜索语义

- 搜索对大小写不敏感。
- 匹配 `name`、`fullName`（含 tag 全称）及格式化后的展示名。
- 若命中深层节点，树会保留并展开祖先分支。

### 2.4 详情面板

- 展示：名称、路径、类型、层级深度、子目录/文件统计。
- 对目录节点，会尝试读取上游仓库对应目录下的 `README.md` 并展示纯文本片段。
- 支持直接跳转 GitHub 对应路径。

### 2.5 标签全称补全

- 启动时会尝试拉取上游 README 的 `Tag | Description` 表，构建 tag → 全称映射。
- 拉取失败时自动降级为不带全称显示（应用仍可用）。

### 2.6 主题切换

- 支持 Light / Dark 两种主题。
- 主题状态通过 `localStorage` 持久化。

---

## 3. 技术栈

- **前端框架**：React 19
- **语言**：TypeScript 5
- **构建工具**：Vite 7
- **路由**：react-router-dom 7（HashRouter）
- **测试**：Vitest
- **代码检查**：ESLint

---

## 4. 项目结构

```text
.
├── src/
│   ├── assets/
│   │   └── building-blocks_structure.json   # 本地结构数据源
│   ├── components/
│   │   ├── SearchBar.tsx                    # 搜索输入
│   │   ├── OverviewPanel.tsx                # 总览卡片视图
│   │   ├── TreeView.tsx                     # 树视图
│   │   └── DetailPanel.tsx                  # 详情面板（含 README 拉取）
│   ├── lib/
│   │   ├── parser.ts                        # 数据解析 & BB 标签抓取
│   │   ├── search.ts                        # 搜索/过滤/展开逻辑
│   │   └── localStorage.ts                  # 本地存储工具
│   ├── pages/
│   │   └── HomePage.tsx                     # 页面状态编排与交互主逻辑
│   ├── types/bb.ts                          # 统一类型定义
│   └── main.tsx                             # 应用入口
├── test/
│   ├── search.test.ts                       # 搜索语义测试
│   └── input-validation.test.ts             # JSON 结构校验
└── ci/
    ├── build.sh                             # CI 构建入口
    ├── transform.sh                         # 结构转换脚本入口
    └── generate_structure.py                # 目录转 JSON 生成器
```

---

## 5. 数据流与运行机制

### 5.1 数据来源

1. 本地静态文件 `src/assets/building-blocks_structure.json` 作为主结构数据。  
2. 运行时额外请求上游 README，解析 BB Tag 说明表（可选增强）。

### 5.2 运行流程（简化）

1. `HomePage` 初始化时加载本地结构 JSON。
2. 并行尝试抓取 BB Tags 全称映射。
3. 将原始结构映射为统一的 `BBNode` 树。
4. 构造图模型（nodes + edges + root）供视图与交互使用。
5. 基于当前 URL path segment 计算“当前根节点 + 面包屑栈”。
6. 根据视图模式（Overview / Tree）渲染对应组件。
7. 用户搜索时复用共享搜索逻辑，驱动过滤与自动展开。

---

## 6. 本地开发

### 6.1 环境要求

- Node.js（建议 LTS）
- npm（仓库当前锁定 `npm@11`）

### 6.2 安装依赖

```bash
npm install
```

### 6.3 启动开发服务器

```bash
npm run dev
```

默认情况下 Vite 会输出本地访问地址（通常是 `http://localhost:5173`）。

### 6.4 生产构建与预览

```bash
npm run build
npm run preview
```

---

## 7. 可用脚本

- `npm run dev`：启动开发模式。
- `npm run build`：先执行 TypeScript build (`tsc -b`)，再执行 Vite 构建。
- `npm run lint`：运行 ESLint。
- `npm run test`：运行 Vitest（关闭 watch）。
- `npm run preview`：预览生产构建结果。

---

## 8. 测试与质量保证

### 8.1 单元测试（搜索）

`test/search.test.ts` 覆盖了：

- 大小写不敏感匹配。
- 祖先分支保留逻辑。
- Overview 过滤语义。
- descendant-only 命中提示。
- 自动展开节点 ID 收集。

### 8.2 输入数据校验测试

`test/input-validation.test.ts` 对 `building-blocks_structure.json` 做了：

- JSON 可解析性校验。
- 根结构字段校验。
- 递归节点结构校验。

---

## 9. CI 与结构数据生成

### 9.1 CI 构建

`ci/build.sh` 的默认流程：

1. 安装依赖
2. 运行 lint
3. 运行 test
4. 执行 build

### 9.2 目录结构转 JSON

`ci/transform.sh` 会调用 `ci/generate_structure.py`：

- 输入：目标目录路径。
- 输出：层级化 JSON（目录优先、字母排序、忽略隐藏项）。

示例（在仓库根目录）：

```bash
bash ci/transform.sh /path/to/Proposed-BuildingBlocks building-blocks_structure.json
```

> 你可以据此更新 `src/assets/building-blocks_structure.json` 的来源数据。

---

## 10. 已知行为与注意事项

- BB Tag 全称依赖外部网络请求；失败时仅影响“全称显示”，不影响主功能。
- 详情面板 README 仅在选中“目录节点”时尝试加载。
- 当前实现使用 `HashRouter`，部署到静态托管（如 GitHub Pages）更稳定。

---

## 11. 后续可扩展方向（建议）

- 增加节点收藏 / 最近访问。
- 为 README 展示增加 Markdown 渲染与安全过滤。
- 增加键盘导航（上下选择、左右展开/收起）。
- 增加按 tag、层级深度、类型的高级筛选。
- 引入 E2E 测试（例如 Playwright）覆盖关键交互路径。

---

## 12. 许可证

当前仓库未显式声明许可证。若计划对外发布或复用，请补充 `LICENSE` 文件并在 README 顶部标注。
