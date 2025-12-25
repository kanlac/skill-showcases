# Skill Showcases - 期刊正文页

这是使用 `frontend-design` skill 创建的 showcase 期刊正文页面，展示了 Showcase 001 的完整评测内容。

## 特性

### 设计特点

- **优雅的杂志式排版**：大量留白，精致的视觉层次
- **一致的设计系统**：与首页保持一致的字体（Fraunces, Syne）和视觉风格
- **精致的微交互**：自定义光标、悬停效果、滚动动画
- **阅读体验优化**：阅读进度指示器、平滑滚动、响应式设计

### 内容板块

1. **文章头部（Hero）**
   - 期刊号 VOL.001
   - 文章标题和简介
   - 阅读时长、案例数量等统计信息
   - 渐变背景和浮动光球效果

2. **介绍板块**
   - frontend-design skill 的价值介绍
   - 高亮卡片展示核心价值

3. **能力栈表格**
   - 现代化的表格设计
   - 核心能力和可选搭配分类展示
   - 彩色徽章区分不同类型（Skill, Hook, Agent）

4. **评测板块**
   - 对比展示（有 skill vs 无 skill）
   - 代码块展示提示词
   - 图片占位卡片
   - 评分对比卡片（与 Figma Make、Lovable 对比）

5. **拆解板块**
   - 技术原理解释
   - 深度思考洞察框
   - 哲学引用

6. **如何使用**
   - 好坏对比示例
   - 最佳实践建议

7. **边界与局限**
   - 适用/不适用场景对比
   - 推荐建议

8. **底部 CTA**
   - 大号行动号召按钮
   - 跳转到 `/agent/frontend-design`（演示链接）

### 技术实现

- **纯 HTML/CSS/JavaScript**：无框架依赖
- **自定义光标**：跟随鼠标的精致光标效果
- **滚动动画**：Intersection Observer API 实现元素淡入
- **阅读进度**：动态计算滚动进度
- **响应式设计**：移动端、平板、桌面完美适配
- **性能优化**：防抖、懒加载、CSS 动画优先

## 文件结构

```
skill-showcases-website-case/
├── index.html          # 主 HTML 文件
├── styles.css          # 样式文件
├── script.js           # 交互脚本
└── README.md           # 说明文档
```

## 使用方法

直接在浏览器中打开 `index.html` 文件即可查看效果。

或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve

# 使用 PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 设计理念

这个页面遵循 `frontend-design` skill 的核心原则：

1. **避免 AI 味儿**：不使用常见的 Inter/Arial 字体，不使用紫色渐变
2. **独特的字体选择**：Fraunces（衬线）+ Syne（无衬线）+ JetBrains Mono（等宽）
3. **精致的色彩系统**：温暖的大地色调，米色背景，棕色和橙色点缀
4. **丰富的视觉层次**：渐变网格、浮动光球、装饰线、徽章系统
5. **专业的排版**：行高、字距、留白都经过精心调整
6. **细腻的交互**：悬停状态、过渡动画、滚动效果

## 响应式断点

- 桌面：> 768px
- 平板：480px - 768px
- 移动：< 480px

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器

## 后续优化建议

- 添加实际的评测对比图片
- 集成评论系统
- 添加分享功能
- 实现暗色模式
- 优化 SEO 元数据

## 许可证

本项目仅用于展示 `frontend-design` skill 的能力，内容参考自 Showcase 001 评测文章。
