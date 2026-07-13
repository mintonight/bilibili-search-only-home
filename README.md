# B站仅搜索首页

独立 **Tampermonkey / Violentmonkey** 脚本，**不依赖** [Bilibili Evolved](https://github.com/the1812/Bilibili-Evolved)。

打开 B 站首页时，只保留顶栏和居中搜索框，默认纯黑背景。

当前版本：**1.0.2**

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 Violentmonkey  
2. 点击下方链接安装脚本（推荐用 **GitHub Raw**，版本最新、不易被缓存卡住）：

### 推荐：GitHub Raw（始终对应最新 main）

https://raw.githubusercontent.com/mintonight/bilibili-search-only-home/main/bilibili-search-only-home.user.js

### 备选：jsDelivr 固定版本标签（当前 v1.0.2）

https://cdn.jsdelivr.net/gh/mintonight/bilibili-search-only-home@v1.0.2/bilibili-search-only-home.user.js

> **为什么 README 里 jsDelivr 的 `@main` 链接可能还是旧版？**  
> jsDelivr 会对 GitHub 分支做较长时间缓存。用 `@main` 时，有时推送新版本后仍会返回旧脚本（例如还显示 1.0.0 / 1.0.1）。  
> 解决办法：
> 1. 用上面的 **GitHub Raw** 安装 / 更新  
> 2. 或用 **带版本标签** 的 jsDelivr 链接（如 `@v1.0.2`），发版时再改标签  

3. 打开 https://www.bilibili.com/ 即可  

已安装过的用户：在油猴管理页对本脚本点 **检查更新**；若仍不更新，删掉后用 **GitHub Raw** 链接重新安装。

## 功能

- 仅在 `www.bilibili.com` 首页生效
- 隐藏推荐流、频道栏、横幅装饰
- 保留顶栏（消息、头像等）
- 页面中央搜索框
- 默认纯黑背景
- 支持关键词搜索
- 输入 `BV…` / `av…` / 纯数字可尝试直达视频
- 油猴列表显示 B 站图标

## 设置背景

油猴图标 → 本脚本菜单：

| 菜单 | 说明 |
|------|------|
| 设置背景颜色 | 如 `#000000` |
| 设置背景图片 URL | `https://...`，留空清除 |
| 恢复默认背景 | 恢复纯黑 |

## 与 Bilibili Evolved

若你同时使用 Evolved 的「仅搜索首页」组件，**请不要同时开启本脚本**，以免重复处理页面。

本仓库只放独立油猴脚本，与 Evolved 主项目无关。

## 文件

- `bilibili-search-only-home.user.js` — 脚本本体

## License

MIT
