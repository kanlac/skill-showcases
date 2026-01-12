# 如何让 Agent 用你的身份登录网站（附 OpenCode 安装 Skill 方法）

这是 Skill 拆解系列的第三篇，也是第一个自研 Skill。

## 痛点

做本地开发的时候，你有没有遇到过这种情况：

- 需要测试不同用户看到的界面是否正确
- 需要检查不同权限用户的展示效果
- 需要验证多账号场景下的数据隔离

然后你就开始了：

登出当前账号 → 登录测试账号 A → 测试 → 登出 → 登录测试账号 B → 再测试 → 登出 → 切回自己的账号……

太繁琐了。

尤其是有些网站登录流程还特别复杂，两步验证、验证码什么的，切换一次账号就要折腾好几分钟。

更别提让 Coding Agent 帮你干活了——它打开浏览器，看到的是登录页面，它不知道你的账号密码，也不能像你一样"记住"登录状态。

想让 Agent 抓取需要登录的数据？先手动复制 Cookie。
想让 Agent 测试登录后的功能？每次都要重新登录。

这也太麻烦了吧。

## 解决方案

于是我做了个 Skill：**Playwright Auth Manager**。

原理很简单：

1. 你手动登录一次
2. 脚本把你的登录信息（cookies + localStorage）保存到一个 JSON 文件
3. Agent 加载这个文件，自动处于"已登录"状态

就像把家里的钥匙复制了一把，交给了 Agent。它就能代替你进门了。

## 真实案例

### 案例 1：保存登录状态

场景：本地开发一个社区网站，需要测试不同用户的展示效果。

![保存认证状态](./img/local-dev-save-auth.jpg)

我只需要告诉 Agent："帮我保存本地开发网站的登录信息"。

它会引导我运行一个脚本，浏览器自动打开，我手动登录，然后按 Enter，认证信息就保存好了。

整个过程不到一分钟。

### 案例 2：Agent 使用登录状态

保存好之后，我再跟 Agent 说："用刚才保存的账号，帮我发一个测试帖子"。

![使用登录状态](./img/local-dev-posting.jpg)

Agent 直接就开始干活了——它自动处于已登录状态，不需要我再操心登录的事。

### 案例 3：多账号切换

Reddit 的登录流程比较复杂，有两步验证。但这个 Skill 也能搞定。

![Reddit 多账号](./img/checkout-reddit.jpg)

我保存了两个 Reddit 账号的认证状态，配置了两个 MCP 实例。

现在我可以跟 Agent 说："用账号 A 检查一下这个帖子的评论"，然后再说："切换到账号 B，看看同样的帖子显示什么"。

Agent 无缝切换，我只需要看结果。

效率提升太明显了。

## 它是怎么工作的

技术架构一句话：基于 Playwright MCP，通过保存和复用浏览器认证状态，让 Coding Agent 像真人一样访问需要登录的网站。

有两个核心脚本：

**setup.js**：环境准备，在 Skill 目录内安装 Playwright，不会污染你的项目。运行一次就行。

**save-auth-state.js**：保存认证，打开浏览器让你登录，按 Enter 后把 cookies 和 localStorage 保存到 JSON 文件。文件很小，5-50KB。

完整流程：

```
1. 运行脚本，手动登录一次
2. 认证信息保存到 JSON 文件
3. 配置 MCP Server 加载这个文件
4. 重启 MCP 客户端
5. Agent 自动处于已登录状态 ✅
```

安全方面：脚本会自动检查 .gitignore，防止你把敏感的认证文件提交到代码仓库。

## 为什么它好用

没有这个 Skill 之前：

- 想让 Agent 访问需要登录的网站？自己写脚本管理 Cookie
- 手动复制 Cookie？只能拿到 Cookie，拿不到 localStorage，格式还容易错
- 登录过期？重新手动复制一遍
- 切换账号？每次都要登出登入，还要告诉 Agent 怎么用这些认证信息

有了这个 Skill 之后：

- 你只需要说："帮我保存这个网站的登录信息"
- Agent 会引导你完成整个流程
- 后续想用？直接说："用账号 A 的身份去做 XXX"
- Agent 自动处于登录状态，无需任何额外操作

**核心价值**：
- 不需要学习技术：不懂 Playwright API？没关系，Agent 帮你搞定
- 不需要写代码：说出需求即可，Agent 自动引导
- 不需要操心安全：自动检查 .gitignore，防止泄露
- 一次配置，持续使用：登录一次，永久复用

我调研了一圈，发现目前没有现成的 Skill 做浏览器认证管理。这个 Skill 填补了这个空白。

## 如何使用

就这么简单：

安装好 Skill 后，直接跟 Agent 说你的需求就行了。

**示例对话**：

```
你：我想保存本地开发网站 localhost:3000 的登录信息

Agent：好的，我来帮你配置。请在新的终端窗口运行以下命令：
    node <path>/save-auth-state.js --url http://localhost:3000 --user dev-account

    运行后：
    1. 浏览器会自动打开
    2. 手动登录你的账号
    3. 登录完成后回到终端按 Enter

    然后我会帮你配置 MCP Server 和 .gitignore
```

```
你：请用账号 A 的身份登录网站，帮我发一个测试帖子

Agent：好的，我会使用账号 A 的认证状态。
    （Agent 自动处于登录状态，直接执行操作）
```

不需要记命令、不需要学配置，说出需求即可。

## Open Code 也能用这个 Skill 吗?

最近 Open Code 特别火，我也下载试了一下，确实不错！Claude Code 支持的功能它基本都有，非常好用，我已经爱上了。

Open Code 的认证登录也很简单，只需要运行:

```bash
opencode auth login
```

这个命令会启动 ChatGPT 登录流程。完成登录后，你就能在 Open Code 中使用 Codex 订阅了！

**但有一个遗憾**:目前 Open Code 还不支持从 GitHub 上加载 Agent Skills。期待后续能加上这个功能——毕竟 Skills 是 Agent 生态的重要组成部分，能让 Agent 更好地理解具体场景的需求。

### 案例 4:保存小红书登录信息

![保存小红书认证](./img/save-xiaohongshu-auth.jpg)

只需要告诉 Agent "我要保存小红书 xiaohongshu.com 的登录信息",它会引导你完成整个流程。

![](./img/checkout-xhs.jpg)

## 本期能力栈

**核心**：

| type | name | source |
|------|------|--------|
| Skill | playwright-auth-manager | [GitHub 链接] |

**依赖**：

| type | name | usage |
|------|------|-------|
| MCP Server | @playwright/mcp | 浏览器自动化 |
| Tool | Playwright | 浏览器控制 |
