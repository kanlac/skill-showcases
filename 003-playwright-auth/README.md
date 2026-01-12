# Showcase 003: 让 AI 自己登录网站

## 介绍

本期介绍 playwright-auth-manager 这个 Skill

这是本系列的第三篇文章，也是第一个自研 Skill。

AI 编程很强大，但遇到需要登录的网站就卡壳了：
- 想抓取需要登录的数据？先手动复制 Cookie
- 想测试登录后的功能？每次都要重新登录
- 想在多个账号间切换？切换一次麻烦一次

Playwright Auth Manager 能自动管理登录状态，让 Coding Agent 像真人一样登录网站，支持本地开发、数据抓取、多账号管理等场景。

## 核心能力

- 自动保存网站登录凭证（cookies、localStorage）
- 让 AI Agent 复用登录状态，无需重复登录
- 支持多账号管理（工作账号、个人账号等）
- 基于 Playwright MCP，与 AI Agent 深度集成

## 使用场景

- ✅ 本地开发调试需要登录的功能
- ✅ 数据抓取和自动化任务
- ✅ 测试多账号场景
- ✅ 需要频繁访问需要登录的网站

## 不适用场景

- ❌ 生产环境部署
- ❌ 公共服务器上运行
- ❌ 处理高度敏感的认证信息

## 文章结构

```
003-playwright-auth/
├── materials/           # 研究素材和 Skill 分析
│   └── outline.md      # 文章大纲
├── raw-usecases/       # 原始用例
├── arena/              # 测试场地
├── outputs/            # 草稿输出
├── img/                # 文章配图
└── README.md           # 最终发布文章（本文件）
```

## 能力栈

### 核心

| type | name | source |
| ----- | ---- | ---- |
| Skill | playwright-auth-manager | /Users/kan/Documents/agile-dev/skills/playwright-auth-manager |

### 依赖

| type | name | usage | source |
| ----- | ---- | ---- | ---- |
| MCP Server | @playwright/mcp | 浏览器自动化 | https://github.com/microsoft/playwright |
| Tool | Playwright | 浏览器控制 | https://playwright.dev/ |

## 关于 Skill 2049

这是全世界第一家 Skill 评测媒体，通过真实用例展示 Skill 的价值。

我们不会教你 Skill 是什么，我们要做的是：
- 带你拆解、学习最先进的范式
- 探索最佳工具组合
- 展示真实效果和使用体验

欢迎关注后续更新。
