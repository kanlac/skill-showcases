# Playwright Auth Manager Skill 分析

## 技术架构

Playwright Auth Manager 基于 Playwright MCP（Model Context Protocol），通过保存和复用浏览器认证状态，让 Coding Agent 能够像真人一样访问需要登录的网站。

核心流程：用户手动登录一次 → 脚本保存认证信息到 JSON 文件 → MCP Server 加载认证状态 → Coding Agent 直接使用已登录状态。

## 两个核心脚本

### 1. setup.js - 环境准备脚本

**作用**：在 Skill 目录内安装 Playwright 及其浏览器（Chromium），不污染用户项目。

**为什么需要**：
- 用户项目可能是 Python、Go 等非 Node.js 项目
- 避免在用户的 `package.json` 中添加依赖
- 独立安装，保持用户项目的干净

**使用**：只需运行一次，安全可重复执行。

### 2. save-auth-state.js - 认证状态保存脚本

**作用**：打开浏览器，等待用户手动登录，然后保存认证信息到 JSON 文件。

**工作流程**：
1. 打开浏览器窗口并导航到登录页面
2. 用户在浏览器中完成登录操作
3. 用户在终端按 Enter 确认
4. 脚本提取 cookies 和 localStorage
5. 保存到 JSON 文件（如 `user1-auth.json`）
6. 关闭浏览器

**特点**：
- 需要用户在单独的终端窗口手动运行
- 支持 `--user` 参数命名会话（推荐）
- 自动检查 .gitignore 配置

## 认证状态文件

保存的 JSON 文件包含：
- **Cookies**：会话 cookie、认证 token
- **LocalStorage**：客户端存储的认证数据

文件很小（通常 5-50KB），易于管理和分享（团队内部）。

## MCP 集成

配置示例：
```json
{
  "mcpServers": {
    "playwright-user1": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--isolated",
        "--storage-state=./user1-auth.json"
      ]
    }
  }
}
```

重启 MCP 客户端后，Coding Agent 就能使用保存的登录状态了。

## 安全设计

- 自动检查 .gitignore，防止提交敏感数据
- 仅用于本地开发和测试
- 认证文件包含真实凭证，需妥善保管
