# B站仅搜索首页

独立 **Tampermonkey / Violentmonkey** 脚本，**不依赖** [Bilibili Evolved](https://github.com/the1812/Bilibili-Evolved)。

打开 B 站首页时，只保留顶栏和居中搜索框，默认纯黑背景。

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 Violentmonkey  
2. 点击下方链接安装脚本：

**一键安装（jsDelivr）：**

https://cdn.jsdelivr.net/gh/mintonight/bilibili-search-only-home@main/bilibili-search-only-home.user.js

**GitHub Raw：**

https://raw.githubusercontent.com/mintonight/bilibili-search-only-home/main/bilibili-search-only-home.user.js

3. 打开 https://www.bilibili.com/ 即可

## 功能

- 仅在 `www.bilibili.com` 首页生效
- 隐藏推荐流、频道栏、横幅装饰
- 保留顶栏（消息、头像等）
- 页面中央搜索框
- 默认纯黑背景
- 支持关键词搜索
- 输入 `BV…` / `av…` / 纯数字可尝试直达视频

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