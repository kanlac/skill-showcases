# Skill Showcases Website

一个现代化、交互性强的期刊式网站，用于展示 AI 技能的应用案例和评测。

## 特性

### 视觉设计
- 🎨 现代化的渐变配色方案
- 📱 完全响应式设计，适配各种设备
- 🌈 精美的动画和过渡效果
- ✨ 玻璃态（Glassmorphism）设计元素

### 交互效果
1. **3D 卡片翻转**
   - 鼠标悬停时，往期期刊卡片会翻转显示详细信息
   - 移动端支持点击翻转

2. **视差滚动**
   - Hero 区域的背景和内容以不同速度滚动
   - 创造深度感和层次感

3. **滚动触发动画**
   - 元素进入视口时自动触发淡入动画
   - 卡片有阶梯式延迟效果

4. **鼠标追踪效果**
   - 卡片随鼠标移动产生轻微 3D 倾斜
   - 特色卡片的增强悬停效果

5. **光标轨迹**
   - 移动鼠标时产生渐变粒子轨迹
   - 仅在桌面设备上启用

6. **动态计数器**
   - 统计数字滚动到视口时自动递增动画

7. **平滑滚动**
   - 导航链接点击时平滑滚动到目标区域

8. **彩蛋**
   - 输入科乐美密码（↑↑↓↓←→←→BA）激活彩虹效果

### 性能优化
- 使用 Intersection Observer API 优化滚动动画
- 事件节流（Throttle）优化滚动性能
- CSS 硬件加速（transform 和 opacity）
- 响应式图片和懒加载准备

## 文件结构

```
skill-showcases-website/
├── index.html          # 主 HTML 文件
├── styles.css          # 样式表
├── script.js           # 交互脚本
└── README.md          # 项目说明
```

## 使用方法

### 本地运行

1. 直接在浏览器中打开 `index.html`
   ```bash
   open index.html
   ```

2. 或使用本地服务器（推荐）
   ```bash
   # 使用 Python
   python -m http.server 8000

   # 使用 Node.js
   npx serve

   # 使用 PHP
   php -S localhost:8000
   ```

3. 在浏览器中访问 `http://localhost:8000`

### 自定义内容

#### 添加新期刊

在 `index.html` 的 `.issues-grid` 部分添加新的卡片：

```html
<div class="issue-card" data-issue="数字">
    <div class="card-inner">
        <div class="card-front">
            <div class="card-header">
                <span class="issue-number">#数字</span>
                <span class="issue-date">日期</span>
            </div>
            <div class="card-icon">图标</div>
            <h3 class="card-title">标题</h3>
            <p class="card-tag">标签</p>
        </div>
        <div class="card-back">
            <h3>标题</h3>
            <p>描述内容</p>
            <a href="#" class="card-link">查看详情 →</a>
        </div>
    </div>
</div>
```

#### 修改配色

在 `styles.css` 的 `:root` 部分修改 CSS 变量：

```css
:root {
    --primary-color: #6366f1;    /* 主色调 */
    --secondary-color: #8b5cf6;  /* 次要色调 */
    --accent-color: #ec4899;     /* 强调色 */
    /* ... 其他颜色 */
}
```

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

建议使用现代浏览器以获得最佳体验。

## 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代样式特性
  - CSS Grid & Flexbox
  - CSS 变量
  - Transform & Transition
  - Backdrop Filter
- **JavaScript (ES6+)** - 交互逻辑
  - Intersection Observer API
  - Event Delegation
  - Throttle/Debounce

## 特别说明

- 网站采用深色主题设计，适合长时间阅读
- 所有动画都遵循 `prefers-reduced-motion` 可访问性标准
- 响应式断点：968px（平板）、640px（手机）
- 使用系统字体栈以获得最佳性能

## 未来改进

- [ ] 添加搜索功能
- [ ] 集成 CMS 后端
- [ ] 添加评论系统
- [ ] 实现深色/浅色主题切换
- [ ] 增加更多过渡动画
- [ ] PWA 支持

## License

MIT License

---

**Enjoy exploring AI skills!** 🚀
