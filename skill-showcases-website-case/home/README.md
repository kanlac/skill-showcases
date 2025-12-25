# Skill Showcases 网站

一个现代化、交互丰富的期刊式网站，用于展示和评测各种 Skills。

## ✨ 特性

### 🎨 设计亮点
- **现代编辑美学**：受高端杂志启发的大胆排版和视觉层次
- **独特字体配对**：Fraunces (display) + Syne (heading) + JetBrains Mono (mono)
- **动态配色方案**：黑色主题 + 橙红色强调色，避免常见的紫色渐变
- **流动的背景**：三个渐变光球以不同速度浮动，营造深度感

### 🎯 交互功能
1. **自定义光标**：鼠标跟随效果，双层光标增加趣味性
2. **3D 卡片倾斜**：鼠标悬停时卡片根据位置进行 3D 旋转
3. **平滑滚动动画**：元素在进入视口时优雅地淡入
4. **视差效果**：背景元素随滚动产生视差移动
5. **数字动画计数器**：统计数字动态计数至目标值
6. **故障效果**：悬停期刊编号时产生数字闪烁效果
7. **粒子特效**：英雄区域的漂浮粒子动画
8. **涟漪点击效果**：按钮点击产生扩散动画
9. **彩色标签悬停**：技能标签悬停时随机变换颜色

### 📱 响应式设计
- 完全适配桌面、平板和移动设备
- 移动端自动禁用自定义光标
- 弹性网格布局自动调整列数
- 可缩放的字体大小和间距

## 🚀 使用方法

### 本地运行
1. 直接在浏览器中打开 `index.html`
2. 或使用本地服务器（推荐）：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

### 部署
可以部署到任何静态网站托管服务：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## 📁 文件结构

```
skill-showcases/
├── index.html       # 网站主结构
├── styles.css       # 所有样式和动画
├── script.js        # 交互逻辑和效果
└── README.md        # 项目文档
```

## 🎨 设计系统

### 颜色变量
```css
--primary-bg: #0a0a0a        /* 主背景 */
--secondary-bg: #141414      /* 次要背景 */
--card-bg: #1a1a1a          /* 卡片背景 */
--accent-primary: #ff6b4a    /* 主强调色 */
--accent-secondary: #ffa94d  /* 次强调色 */
--text-primary: #f5f5f5      /* 主文本 */
--text-secondary: #a0a0a0    /* 次文本 */
```

### 字体
- **Display**: Fraunces (标题，具有独特的 serif 风格)
- **Heading**: Syne (副标题和按钮，现代 sans-serif)
- **Mono**: JetBrains Mono (代码和标签)

## 🛠 自定义

### 修改颜色
在 `styles.css` 顶部的 `:root` 选择器中更改颜色变量：

```css
:root {
    --accent-primary: #your-color;
    /* ... */
}
```

### 添加新期刊
在 `index.html` 的 `.grid-container` 中复制并修改卡片模板：

```html
<article class="issue-card" data-issue="新期号">
    <!-- 复制现有卡片结构 -->
</article>
```

### 调整动画速度
在 `script.js` 中修改相关参数：

```javascript
// 光标跟随速度
cursorX += distX * 0.3;  // 增大数字 = 更快

// 卡片出现延迟
card.style.transition = `... ${index * 0.1}s`;  // 调整延迟倍数
```

## 🌟 核心交互详解

### 自定义光标
- 主光标：快速跟随，混合模式实现反色效果
- 从属光标：慢速跟随，创造层次感
- 悬停交互：在按钮和卡片上自动放大

### 3D 卡片效果
- 计算鼠标相对于卡片中心的位置
- 根据位置计算 X/Y 轴旋转角度
- 添加轻微的缩放和阴影增强立体感

### 视差滚动
- 背景元素以不同速度响应滚动
- 创造深度和层次感
- 性能优化：使用 transform 而非 position

## 💡 最佳实践

### 性能优化
- 使用 CSS transform 而非 left/top 进行动画
- requestAnimationFrame 实现流畅的光标动画
- Intersection Observer API 延迟触发滚动动画
- 移动端禁用复杂交互以提升性能

### 可访问性
- 语义化 HTML 标签
- 移动端自动切换回标准光标
- 响应式字体确保可读性
- 高对比度配色方案

## 🎯 未来增强

可以考虑添加：
- [ ] 深色/浅色主题切换
- [ ] 文章详情页面
- [ ] 搜索和筛选功能
- [ ] 分页或无限滚动
- [ ] 社交分享功能
- [ ] 阅读进度指示器
- [ ] 评论系统集成

## 📄 许可

MIT License - 自由使用和修改

## 🙏 致谢

设计灵感来源：
- 现代数字期刊（Awwwards, Typography 等）
- 高端杂志排版（Vogue, Kinfolk）
- 前沿 Web 交互设计

---

**探索技能的无限可能** ✨
