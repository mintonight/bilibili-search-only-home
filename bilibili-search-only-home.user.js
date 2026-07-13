// ==UserScript==
// @name         B站仅搜索首页
// @namespace    https://github.com/mintonight/bilibili-search-only-home
// @version      1.0.0
// @description  不依赖 Bilibili Evolved：B 站首页仅保留顶栏与居中搜索框，默认纯黑背景
// @author       mintonight
// @homepageURL  https://github.com/mintonight/bilibili-search-only-home
// @supportURL   https://github.com/mintonight/bilibili-search-only-home/issues
// @match        *://www.bilibili.com/
// @match        *://www.bilibili.com/index.html
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @license      MIT
// ==/UserScript==

;(() => {
  'use strict'

  const STORAGE = {
    bgColor: 'searchOnlyHome.bgColor',
    bgImage: 'searchOnlyHome.bgImage',
  }

  const DEFAULTS = {
    bgColor: '#000000',
    bgImage: '',
  }

  const getBgColor = () => GM_getValue(STORAGE.bgColor, DEFAULTS.bgColor) || DEFAULTS.bgColor
  const getBgImage = () => (GM_getValue(STORAGE.bgImage, DEFAULTS.bgImage) || '').trim()

  const isHomePage = () => {
    const { hostname, pathname } = location
    if (hostname !== 'www.bilibili.com') {
      return false
    }
    return pathname === '/' || pathname === '/index.html'
  }

  if (!isHomePage()) {
    return
  }

  /** 尽早注入：隐藏原首页主体，避免闪一下推荐流 */
  const HIDE_CSS = `
/* layout-shift：移出视口，降低懒加载触发 */
#i_cecream > main,
.bili-feed4 > main,
.palette-button-outer,
.bili-header__channel,
.header-channel,
.header-channel-fixed,
.bili-footer,
.international-footer,
.palette-button-wrap,
.animated-banner,
.header-banner__inner,
#bili-header-banner-img,
picture.banner-img {
  position: fixed !important;
  visibility: hidden !important;
  top: 200vh !important;
  left: 0 !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
  pointer-events: none !important;
}

html, body {
  height: 100% !important;
  overflow: hidden !important;
  margin: 0 !important;
}

body {
  min-height: 100% !important;
  background-color: var(--soh-bg-color, #000) !important;
  background-image: var(--soh-bg-image, none) !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
}

/* 搜索层：铺满视口，z-index 低于顶栏 */
#soh-root {
  position: fixed;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 24px 16px 48px;
  pointer-events: none;
  background-color: var(--soh-bg-color, #000);
  background-image: var(--soh-bg-image, none);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

#soh-panel {
  pointer-events: auto;
  width: min(640px, 92vw);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
}

#soh-form {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 24px;
  border: 1px solid rgba(136, 136, 136, 0.35);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;
}

#soh-form:focus-within {
  border-color: #00a1d6;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
}

#soh-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  line-height: 1.4;
  padding: 8px 4px;
  color: #111;
}

#soh-input::placeholder {
  color: #888;
  opacity: 0.9;
}

#soh-submit {
  flex: 0 0 auto;
  border: none;
  border-radius: 16px;
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background: #00a1d6;
  transition: opacity 0.15s ease-out;
}

#soh-submit:hover {
  opacity: 0.9;
}

#soh-hint {
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  user-select: none;
}
`

  const applyBackgroundVars = () => {
    const color = getBgColor()
    const image = getBgImage()
    document.documentElement.style.setProperty('--soh-bg-color', color)
    document.documentElement.style.setProperty(
      '--soh-bg-image',
      image ? `url(${JSON.stringify(image)})` : 'none',
    )
  }

  const injectStyle = () => {
    if (typeof GM_addStyle === 'function') {
      GM_addStyle(HIDE_CSS)
    } else {
      const style = document.createElement('style')
      style.textContent = HIDE_CSS
      ;(document.head || document.documentElement).appendChild(style)
    }
    applyBackgroundVars()
  }

  injectStyle()

  const resolveSearchTarget = keyword => {
    const q = keyword.trim()
    if (!q) {
      return 'https://search.bilibili.com/'
    }

    // BV / av 直达
    if (/^BV[\w]+$/i.test(q)) {
      return `https://www.bilibili.com/video/${q}/`
    }
    if (/^av(\d+)$/i.test(q)) {
      return `https://www.bilibili.com/video/${q}/`
    }
    // 纯数字当作 av
    if (/^\d{1,12}$/.test(q)) {
      return `https://www.bilibili.com/video/av${q}/`
    }
    // 完整视频链接
    if (/^https?:\/\/(www\.)?bilibili\.com\/video\//i.test(q)) {
      return q
    }

    return `https://search.bilibili.com/all?keyword=${encodeURIComponent(q)}`
  }

  const doSearch = keyword => {
    location.href = resolveSearchTarget(keyword)
  }

  const mountUI = () => {
    if (document.getElementById('soh-root')) {
      return
    }

    const root = document.createElement('div')
    root.id = 'soh-root'

    const panel = document.createElement('div')
    panel.id = 'soh-panel'

    const form = document.createElement('form')
    form.id = 'soh-form'
    form.setAttribute('role', 'search')
    form.addEventListener('submit', e => {
      e.preventDefault()
      doSearch(input.value)
    })

    const input = document.createElement('input')
    input.id = 'soh-input'
    input.type = 'search'
    input.autocomplete = 'off'
    input.spellcheck = false
    input.placeholder = '搜索视频、番剧、UP 主，或输入 BV / av 号'
    input.setAttribute('aria-label', '搜索')

    const submit = document.createElement('button')
    submit.id = 'soh-submit'
    submit.type = 'submit'
    submit.textContent = '搜索'

    const hint = document.createElement('div')
    hint.id = 'soh-hint'
    hint.textContent = 'B站仅搜索首页 · 独立油猴脚本'

    form.appendChild(input)
    form.appendChild(submit)
    panel.appendChild(form)
    panel.appendChild(hint)
    root.appendChild(panel)

    const attach = () => {
      if (!document.body) {
        return false
      }
      document.body.appendChild(root)
      setTimeout(() => {
        try {
          input.focus({ preventScroll: true })
        } catch {
          input.focus()
        }
      }, 300)
      return true
    }

    if (!attach()) {
      const observer = new MutationObserver(() => {
        if (attach()) {
          observer.disconnect()
        }
      })
      observer.observe(document.documentElement, { childList: true, subtree: true })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountUI, { once: true })
  } else {
    mountUI()
  }

  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('设置背景颜色（默认 #000000）', () => {
      const next = window.prompt('背景颜色（CSS 颜色值）', getBgColor())
      if (next === null) {
        return
      }
      const value = next.trim() || DEFAULTS.bgColor
      GM_setValue(STORAGE.bgColor, value)
      applyBackgroundVars()
    })

    GM_registerMenuCommand('设置背景图片 URL（留空清除）', () => {
      const next = window.prompt('背景图片 URL（http/https，留空清除）', getBgImage())
      if (next === null) {
        return
      }
      const value = next.trim()
      if (value && !/^https?:\/\//i.test(value) && !/^data:image\//i.test(value)) {
        window.alert('仅支持 http(s) 或 data:image/ 链接')
        return
      }
      GM_setValue(STORAGE.bgImage, value)
      applyBackgroundVars()
    })

    GM_registerMenuCommand('恢复默认背景（纯黑）', () => {
      GM_setValue(STORAGE.bgColor, DEFAULTS.bgColor)
      GM_setValue(STORAGE.bgImage, DEFAULTS.bgImage)
      applyBackgroundVars()
    })
  }
})()