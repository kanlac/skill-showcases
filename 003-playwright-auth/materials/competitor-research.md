# 竞品调研

## 调研结论

**目前没有现成的 Skill 专门做浏览器认证管理。**

Playwright Auth Manager 填补了这个空白。

## 现有方案对比

### 1. 手动复制 Cookie

**做法**：
- 打开浏览器 DevTools
- 找到 Application → Cookies
- 手动复制 Cookie 值
- 粘贴到代码里

**问题**：
- ❌ 只能复制 Cookie，拿不到 localStorage
- ❌ 格式容易出错（domain、path、expires 等）
- ❌ 每次过期都要重新复制
- ❌ AI 不知道怎么用这些 Cookie

**适用场景**：临时测试一两次

---

### 2. 手写 Selenium/Puppeteer/Playwright 脚本

**做法**：
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    # 手动处理登录
    page = context.new_page()
    page.goto("...")
    page.fill("#username", "...")
    # ... 保存 cookies
    context.storage_state(path="auth.json")
```

**问题**：
- ❌ 需要学习 Playwright API
- ❌ 每个项目都要重新写
- ❌ 没有标准化流程
- ❌ 不与 AI Agent 集成

**适用场景**：有编程能力，需要定制化

---

### 3. 浏览器插件（如 EditThisCookie）

**做法**：
- 安装浏览器插件
- 登录网站
- 用插件导出 Cookie（JSON 格式）
- 手动导入到测试环境

**问题**：
- ❌ 无法与 MCP 集成
- ❌ 不支持 localStorage
- ❌ 需要手动导入导出
- ❌ AI Agent 无法直接使用

**适用场景**：非开发人员的临时导出

---

### 4. Playwright 原生 API（开发者自用）

**做法**：
```javascript
// 保存
await context.storageState({ path: 'state.json' })

// 加载
const context = await browser.newContext({ storageState: 'state.json' })
```

**问题**：
- ❌ 需要自己写代码
- ❌ 没有工作流引导
- ❌ 不会自动检查 .gitignore
- ❌ 不与 MCP 深度集成

**适用场景**：资深 Playwright 用户

---

## Playwright Auth Manager 的优势

### 对比表格

| 方案 | 易用性 | AI 集成 | 多账号支持 | 完整性 | 安全提示 |
|------|--------|---------|------------|--------|----------|
| 手动复制 Cookie | ⭐⭐ | ❌ | ❌ | ⭐⭐ | ❌ |
| 手写脚本 | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ❌ |
| 浏览器插件 | ⭐⭐⭐⭐ | ❌ | ⭐⭐ | ⭐⭐ | ❌ |
| Playwright 原生 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ |
| **Playwright Auth Manager** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### 核心价值

**让用户不需要关心实现细节，一次性配置好。**

无论你是：
- 不懂 Playwright 的产品经理
- 想快速调试的前端开发者
- 需要抓取数据的数据分析师

都可以：
1. 运行一个命令
2. 手动登录一次
3. AI 自动配置好一切

**不需要学习 API，不需要写代码，不需要操心安全问题。**

---

## 为什么现在是好时机

1. **MCP 生态快速发展**：越来越多工具接入 MCP
2. **Playwright MCP 刚发布**：官方 MCP Server，但缺少配套工具
3. **认证管理是刚需**：几乎所有网站都需要登录
4. **市场空白**：没有现成的 Skill 方案

Playwright Auth Manager 填补了这个空白，提供了标准化的解决方案。
