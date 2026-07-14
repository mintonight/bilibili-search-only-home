# B站仅搜索首页

独立 **Tampermonkey / Violentmonkey** 脚本，**不依赖** [Bilibili Evolved](https://github.com/the1812/Bilibili-Evolved)。

- **首页**：只保留顶栏和居中搜索框，默认自定义背景图   
- **视频页**：可隐藏右侧相关推荐，并可设置默认播放器模式（常规 / 宽屏 / 网页全屏 / 全屏）

当前版本：**1.1.3**

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 Violentmonkey  
2. 点击下方链接安装脚本（推荐用 **GitHub Raw**，版本最新、不易被缓存卡住）：

### 推荐：GitHub Raw（始终对应最新 main）

https://raw.githubusercontent.com/mintonight/bilibili-search-only-home/main/bilibili-search-only-home.user.js

### 备选：jsDelivr 固定版本标签（当前 v1.1.3）

https://cdn.jsdelivr.net/gh/mintonight/bilibili-search-only-home@v1.1.3/bilibili-search-only-home.user.js

> **为什么 README 里 jsDelivr 的 `@main` 链接可能还是旧版？**  
> jsDelivr 会对 GitHub 分支做较长时间缓存。用 `@main` 时，有时推送新版本后仍会返回旧脚本（例如还显示 1.0.0 / 1.0.1）。  
> 解决办法：
> 1. 用上面的 **GitHub Raw** 安装 / 更新  
> 2. 或用 **带版本标签** 的 jsDelivr 链接（如 `@v1.1.3`），发版时再改标签  

3. 打开 https://www.bilibili.com/ 或任意视频页即可  

已安装过的用户：在油猴管理页对本脚本点 **检查更新**；若仍不更新，删掉后用 **GitHub Raw** 链接重新安装。

## 功能

### 首页（`www.bilibili.com/`）

- 隐藏推荐流、频道栏、横幅装饰
- 保留顶栏（消息、头像等）
- 页面中央搜索框
- 默认自定义背景图（可改色/换图）
- 支持关键词搜索
- 输入 `BV…` / `av…` / 纯数字可尝试直达视频
- 油猴列表显示 B 站图标

### 视频相关页

匹配范围大致对齐 Evolved 的 `allVideoUrls`：

- `/video/`、`/bangumi/play/`、`/list/`、`/medialist/play/`、`/cheese/`、`/festival/`

#### 隐藏视频推荐（默认开启）

隐藏番剧/视频右侧相关推荐、列表页旁推荐、以及播放结束面板里的相关推荐。

实现方式参考 Evolved 组件 `hideRelatedVideos`：注入 CSS `display: none`，并补充了部分新版页面节点选择器。

> 若要操作 B 站「自动连播」开关，请先在菜单里关闭「隐藏视频推荐」，开关一般在相关推荐区域附近。

#### 默认播放器模式（默认：宽屏）

可选：`常规` / `宽屏` / `网页全屏` / `全屏`。

实现方式参考 Evolved 组件 `defaultPlayerMode`：等待 bpx / 旧版播放器控制栏按钮出现后模拟点击；宽屏时会短暂屏蔽 `window.scrollTo`，减轻页面被顶上去的问题。

可选「播放时再应用模式」：非自动播放时，等视频开始播放后再切换模式。

切 P、列表页内跳转会尝试重新应用模式。

## 设置

油猴图标 → 本脚本菜单：

| 菜单位置 | 说明 |
|----------|------|
| 设置背景颜色 | 首页背景色，如 `#000000` |
| 设置背景图片 URL | 首页背景图 `https://...`，留空清除 |
| 恢复默认背景 | 恢复默认背景色与默认背景图 |
| 隐藏视频推荐 | 开/关，视频页即时生效；首页菜单改完后进视频页生效 |
| 默认播放器模式 | 在 常规→宽屏→网页全屏→全屏 间循环切换 |
| 播放时再应用模式 | 仅视频页菜单；是否等播放后再切模式 |

## 实现说明（对照 Evolved）

| 功能 | Evolved 位置 | 本脚本做法 |
|------|----------------|------------|
| 隐藏视频推荐 | `registry/lib/components/style/hide/video/related-videos` | 同等 CSS 选择器 + 新版补充，可开关 |
| 默认播放器模式 | `registry/lib/components/video/player/default-mode` | 等待 `.bpx-player-ctrl-wide/web/full` 等按钮后点击；支持 applyOnPlay |

## 与 Bilibili Evolved

若你同时使用 Evolved 的「仅搜索首页 / 隐藏视频推荐 / 默认播放器模式」，**请不要同时开启本脚本的对应能力**，以免重复处理页面。

本仓库只放独立油猴脚本，与 Evolved 主项目无关。

## 文件

- `bilibili-search-only-home.user.js` — 脚本本体

## License

MIT
