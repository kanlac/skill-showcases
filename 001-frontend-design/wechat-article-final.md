# 用 Skill 终于能做出来审美在线、不 AI 味儿的网页了

你有没有发现，虽然现在随随便便就能 vibe coding 出来一个前端页面，但那个审美……怎么说呢，总有股子浓浓的"AI 味儿"。

英文里有个专门的词叫 "**AI slop**"，说的就是这种千篇一律、毫无灵魂的 AI 生成内容。

今天要介绍的 **frontend-design** 这个 Skill，就能指导 agent 创建**独具美学风格**的界面，让你的页面看起来不像是 AI 随手糊的，而像是一个有审美追求的前端程序员精心打磨出来的作品。

## **第一轮测试：平安夜拆礼物**

废话不多说，咱们直接上真实评测。

我随手写了个提示词：

```
设计一个平安夜祝福的前端页面，要求可以交互（拆礼物），自适应移动端

```

先看看 Claude Sonnet 4.5 直接生成的效果：

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=YTUyNGU0YzQ3YjE4ZTU0NWIwMThmZjg3MWU1ODJkY2VfM2N5RkVUSnZzc0dhakZrYmZHV2NnNHBjTzljUnZrQmpfVG9rZW46WTc4RGJkUUIzb0FxdmZ4b3hQM2NjTDBnblVoXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=NTRmZDg2ZWZkZDJlZTI5ODZiNDZlODYyOGFiNjY1YzNfNVRJRGszQVBuVmZING50S3ZhTTFpS3pqTU9JaTlvcXRfVG9rZW46Q0FqRmIySXA3b1pTNE94UmkzemNoVVNLbmZoXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

没啥好说的，就是很粗糙的一个展示，emoji 滥用到让人尴尬，浓烈的 AI 味儿扑面而来，字体用的是常规的 Arial，毫无特色。

现在，我们启用 **frontend-design skill** 试试：

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=NjJkNWZkNWFiYmNlZDA0ZThkMDk3MGFmZWQyNmVhNWVfVGgxWVp3N3kwTnd1RnZjNXRQYkNxT2lvYmRCR2l6T1dfVG9rZW46TDdON2I0ZU5jb0lkYUp4OFZud2NQMk0ybmVmXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=OGZhZDJkZjg2MjIyNTZlMGMxYjFkOTQxZDU3YjY3YzJfZVNWUFNBbzRDR2FyeGlCWnlOQ2VxM3NFakZRU2U5SmJfVG9rZW46T2N2V2JlZ0pFbzg3N2t4bzh5NGNvbjVIbm9jXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

是不是高下立判？

星空背景更有夜晚的感觉，雪花会更加缓慢地落下，并逐渐消失，细节拉满；选用了一款叫 Cormorant Garamond 的优雅的开源字体，气氛非常浪漫。

为了更全面的比较，我决定同样的提示词用 Figma Make 试试。Figma 可是最强大的设计产品，他们推出的 AI 效果应该不会差……吧。

结果出来一看，我人都傻了。

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTRhYmMxNTY4ZmJkODU0YzdkNjE4ZTUxYmNjNzljNjZfbjBlWDlLYUlSR1VzTFBjT2J6aDBjUTNieTZoZWtjdUFfVG9rZW46SktsU2IzYm9Ib3JCaUt4ejRVYWN5TlZGbnNlXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=NzQ4ZjRjM2MxNTAyN2E2MTAzMTYzMjdjMjJhYWQ4MzNfQWNhbGMwSzYzelk4QkNKTjJzTExDMXhINFgxV0w5NVhfVG9rZW46RVF3TmIySHRrbzZWaG94S0NTSGNQNXRYbjNlXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

满脸问号。

中间一坨是什么玩意儿？哦，看起来它把一些跳动的礼盒 emoji 和彩色图形，诡异地叠在了画面中间一个非常小的区域（桌面版比例奇怪得更明显）。

说真的，好歹是全球用户量第一的设计协作工具，这种水平拿出来也太拉垮了。

但从这里你也能感受到 **Skill 的潜力**了——只要搭配合适的工具组合，我们完全能做到一个场景下的顶尖水平——**不需要去找，就能媲美甚至超越那些专业 agent 产品**。

## **第二轮测试：Skill Showcases 网站首页**

这下我们再来一个实际点的例子，使用以下提示词：

```
创建一个「Skill Showcases」网站首页，网站主要内容为期刊形式发表的 skill 评测，每期展示一个用例及其用到的 skill。
希望有些有趣的交互增加互动感。

```

先看直出效果：

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=NmU5NDMzN2VjNDU4MGQzMGVkMDI4NzZlOGIwNDNjNTdfZUVxYndMdkdxa1hGb3F0ZkRkb0ZZOUo5RG84WWcyeEVfVG9rZW46TGF3ZmJST2xRb0t4YWt4eEFyM2NLOUVVbkE5XzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=NmFkZjUxMTYwNmNhYmI5ZjUyYThkYjI3ZTlmNTkwNTNfSzR2RUtUYXBYd1FJUVVmVnBqdWJaZ3NlWnVIbGt2cHFfVG9rZW46RnlkVWJvWGp5b0RrN2p4U1JpbGNRR0U2blpkXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=YzhhMTNjZWU3NGY4MTE3MzI0YTBiYzQwYTc0MzhkYzJfUEcySDZvU01nQmtQa1psdUZrRFJUb0VveXNOQXRoOHJfVG9rZW46WFhpaWJBRUpYb2ZDVXV4dGtrcmNUc0FabnJsXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=OGY1NmJlZjVhODQwNDc4MGEwNDg4NTA0MzgyOTY3MjFfTUQxanU3TDd2WEJLODVYYklYbGVsNnFRR3ZBWGoxcGxfVG9rZW46WnRpY2I2T2MwbzBLbjN4MWYzaGMxQjE3bndjXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

不出所料，主题色依然是 AI 最爱的紫色；卡片浮动的效果还行；光标移动时有个魔法粉末的效果，有种看大学生博客的感觉。

整体来说很粗糙，非常生硬。

接下来是使用 skill 一次生成的效果：

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmViNjJkZjQ2NTc4ZmYzMDBhZjA4ZGZhYmFmYWIyYmNfTmNSTDFJVlJJamNreDJDT2phREkyeFozYjBhOUhwOVFfVG9rZW46TFBQeWJ4THU3b2lLN1h4UXJwdmNRT2NhbkJkXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=OTU5MDlkZjU2N2JlZGZmMDlmMTE3YTI1NThmZTcwODlfdnp2RDJlcUNkUm9STjY5dzFzMzJaendXY2xIUnJQRHlfVG9rZW46Q2p6bGJ2YklubzdRT3B4bEMwYmNJMURibk80XzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=OTczZjM4MzcwYjJhYTMwNTI5NjA4ODZlYjQ4M2E5NmNfY1MyZk1qeUdidnYyeWkwRXJwVnFqTGxGZWh3dGRPQ01fVG9rZW46U3NzMGI4TkNYb256MTV4R0lZYmNWbWVWbjBYXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

**我只能说，太惊艳太震撼了！**

虽然尾部的文字排版有点问题，但整体的美学是十分在线的。标题文字和卡片的的淡出效果恰到好处，细节的交互同样非常精致，光标移动到按钮上会散发出高级的光晕。字体采用的一款叫 Fraunces 的衬线字体。

太强了，这已经远远超过了初级前端工程师的水平，**关键这是我用短短两句话几分钟内做出来的。**

好的 Skill 就应该这样——不需要什么华丽的提示词技巧，不需要反复润色，用户应该**毫无心智负担**地完成一项任务。

当然我也用 Figma Make 试了试，可惜再给它一次面子它还是不要。

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=NTE4ZjgzZGNjY2I1YTA0NmQ5NTVjMjlhNDBmNThhODFfOHByZm5TYkRVWUd1SlpMUGFwRklNekRDbW5QUmp6UzJfVG9rZW46UFlhbmJ0b1Jsb0RCcTl4U004bmMxSFpXblljXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=YzMwYjI2N2UwNWVhOTU5ZjRjY2ZmZmEyYjNkYTA0ZGRfQUMzYzlWTzNqTHhCR1dNc2xINGQ5alNMbFBreWNFMEtfVG9rZW46Q0dIZmJZYjVBb3BnZW54akpMR2NPYjF2bnlmXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

不能说惨不忍睹吧，第一张图画面遮挡的 bug 修修倒也能用，比平安夜拆卡片好多了，但还是有股子 **AI 味儿**。

再来，用 Figma Make 的头号竞品 Lovable 试试。

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=Mzc1MTVmMWEyOWNjYzZjMDFjM2VlMjQwMjAyY2I3YmJfR2dZTWwyWHNrTFd2YXR6Vk5LN0VZazlzT1FISkpxTHFfVG9rZW46SU8xTmJpSG01b0RZSmx4dmJ2dWNXV2pvbmV1XzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=NWM2ZTM5ZWVhODFjOTUwMjA0ZTg2ZjgzM2YyYjI0Y2JfTU5xbnNieXd6NndubG52V0o3RDBTYkViT28yRko0clpfVG9rZW46Umd6QWIzZWM0b1VQSVF4OUd4b2N0VlVKblVmXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGM5YjdjNjIxMjRkYTNiNmJjZTA5OTc4NDhmYTlkYThfQ2h3QmJXU0RpT0RkaUFDMVJKODhzajMwTkQwdEFWQ1VfVG9rZW46RUJEa2Jnd1BNb3ZRT0J4U3NXU2NMWmNkbnFoXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

该说不说，还是有两下子的。交互上，卡片的浮动、按钮的变化，在 80 分以上的水平；标题字体用的 Playfair Display，效果还行，正文用的 Inter——但这恰好是 frontend-design skill 中**明确说明要避免使用的常见字体**。整体而言，确实没有 skill 出来的效果惊艳。

**你觉得哪个更好？**

我心里已经有答案了。

## **拆解**

你可能会好奇，这个 skill 到底是怎么实现的？

阅读 SKILL.md，可以看到，除了强调美学 (aesthetic)、创意等关键词外，它还沉淀了 Anthropic 官方发布的《**前端美学：提示词指南**》中的最佳实践。

在这份指南里，给了三组例子，用一句话创建一个 SaaS 落地页，博客正文页或管理面板，没有美学提示，和有美学提示的差别。

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=NjhlZjIzZDVhZWRjODM5NDEzNzBkNjY4M2FiNzg0Y2JfUUJydWs5WmtBWWJjaW9ndVBDRUtkTnRhTW5CeEpQa3BfVG9rZW46SUh4MWJCbEtOb2t5cHJ4Yzd1c2NqY1hGbjRlXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=MWUyNjFhZTY5MTNjNWE2M2Q1NTRiMTljN2NiYzM4MmZfV2lEZ0hyTjFZdzhxT3Brb0ZtTXplUmhTNTQ2aXo4TmdfVG9rZW46U25oeGJlYTBYb3hBaFd4ZzdYVWM3S0R3bjVnXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

[](https://fcnyqhb5p7g0.feishu.cn/space/api/box/stream/download/asynccode/?code=YzlmN2I5NzY2YWE4OTAxMWMyOTQzZDNiM2NjODYzZDNfYzQzSVhOanl6ZzFzcWR3cGxKMWhJa2E5b1pkeVB3SzBfVG9rZW46UnhIRGJ1WDVWb0VKZ054TGRQdGNLMG8zbm9lXzE3Njc0NTY2Nzg6MTc2NzQ2MDI3OF9WNA)

可以看到，如果没有指导，Claude 通常会使用白色和紫色基调，设计简陋而中庸。

有了美学提示后，它就能生成更多样化的配色，更具视觉吸引力的设计，和更有设计感的字体和排版。

那问题来了，为什么 AI 不能"自动"展现美学能力？

大模型明明本身具备渊博的知识，精通设计原则、字体排印和色彩理论，为什么非要额外的指令？**是模型还不够智能吗？**

当我说"帮我生成一个好看的页面"的时候，它就不能聪明一点，自动展开美学和前端设计相关的知识吗？

### **原因一：Token 成本**

模型厂商不可能无限展开用户请求中的每个关键词。

这不划算，也没必要。

当我们寻求通过 **agent 应用**来获得比模型直出更好的结果时，本质上是在利用它们在**垂直领域沉淀的工作流、领域知识和最佳实践**。

### **原因二：意图本身的含混不清**

当用户在说「好看」「精美」时，他并不确定自己在说什么。

他描述的是一种**模糊的感觉**。

含义需要澄清，意图需要校准。

**这也是我做这个系列的初衷。**

我相信不是每个人都有必要去学习、比较那么多 agent 或 skill。

想象一下：当你看到一个案例，第一时间就看到**真实的效果**——不是夸耀的宣传语，不是含义宽泛的功能介绍，就是实实在在的评测。

你立马就知道：「我就想要这个类似的！」或者「哦，这个跟我要做的东西还有点差别」。

**你在浏览 showcase 的过程，本质上也是在进行一次潜移默化的意图校准。**

## **如何使用**

你可以在文末获取这个 Skill 的链接。

截止目前，Skill 主要还是通过 Claude Code 或 Claude 网页应用使用，但就在上周（12 月 18 日），Anthropic 推出了通用标准，相信后续各主流模型都能陆续接入。

在安装 Skill 后，你可以像我上面一样直接提出需求，Claude 会自动加载。不过如果可以，还是建议尽可能描述清楚需求，包括用途、受众和技术限制等背景信息。

举例来说，这个提示词

```
帮我设计一个卖运动鞋的手机端商品卡片

```

可以更清楚地描述为：

```
请设计一个用于「限量版球鞋抽签发售」APP 的移动端商品卡片。
受众是追求潮流的 Z 世代用户，他们通常在几秒钟内做出购买决策，
因此视觉重心必须是高清的大尺寸鞋子图片和倒计时组件，弱化文字描述。

```

## **边界与局限**

frontend-design skill 能用来出很好看的前端页面。但它能胜任**所有前端开发工作**吗？

答案当然是否定的。

它主要侧重 UI 设计，建议利用它充分做好原型打磨，重新设计页面也可以，但**不要让它做比较重的业务逻辑**。如果你在处理状态管理或复杂的业务逻辑，可以使用拥有具体技术栈的开发经验或架构经验的 skill。

## 关于 Skill 2049

今天是圣诞🎄，2025 接近尾声，在这个 **Agent 元年**，我们见证了太多新技术和应用的创新。

自从 10 月 16 日 Anthropic 发布 Skill 以来，关于 Skill 的讨论热度一直在持续上升。相信很多人已经看到了各种介绍的文章或视频。

但你是不是有过疑惑，它跟 MCP 或是 sub-agent 有什么区别？

又或者，你像我一样，知道 skill 的原理，并相信它是未来，但对于自己能用它来做些什么，还是有些**懵懂。**

那么欢迎关注这个账户，这里是**全世界第一家 Skill 评测媒体。**

我们不拘泥于解释概念，我们要做的是：

- 带你拆解、学习最先进的范式
- 探索最佳工具组合
- 展示用例，它实际能出什么效果

无论你是程序员还是想学习 vibe coding 的小白，或者哪怕你对开发没有兴趣，你想：

- 学习如何用 AI 辅助写出更好的营销文案
- 学习如何使用 agent 处理销售报表数据
- 做一份精彩的幻灯片
- ……

我们都能帮到你。

甚至，我们也**不会局限于 skill**，而是以 skill 为切入点，利用最先进的范式和工具，为你带来一系列**真实用例**的展示。

敬请期待。

## **本期能力栈**

### **核心**

| type | name | source |
| --- | --- | --- |
| Skill | frontend-design | https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md |

### **可选搭配**

| type | name | usage | source |
| --- | --- | --- | --- |
| Skill | webapp-testing | 确保页面功能可用无异常 | https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md |
| Hook | learning-output-style | 跟随 agent 学习前端构建 | https://github.com/anthropics/claude-code/blob/main/plugins/learning-output-style/README.md |
| Agent | code-architect | 后续的开发实现 | https://github.com/anthropics/claude-code/blob/main/plugins/feature-dev/agents/code-architect.md |