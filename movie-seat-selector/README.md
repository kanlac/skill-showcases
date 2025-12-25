# 电影票选座移动端页面

一个功能完善的电影票选座移动端 Web 应用，支持手势操作、智能吸附和迷你导航图等高级功能。

## 功能特性

### 🎯 核心功能

- **手势操作**
  - 双指缩放 (Pinch-to-zoom)：支持 0.5x - 3x 缩放范围
  - 单指拖拽 (Pan)：平滑的地图拖动体验
  - 鼠标滚轮缩放（桌面端支持）

- **迷你导航图 (Mini-map)**
  - 缩放超过 1.3x 时自动显示
  - Canvas 绘制实时座位布局缩略图
  - 红色边框标识当前视窗位置
  - 淡入淡出动画效果

- **智能吸附**
  - 缩放比例小于 1.2x 时，点击不直接选座
  - 自动放大到 2.0x 并定位到点击区域中心
  - 避免在小缩放级别下的误触问题
  - 平滑过渡动画

### 📱 移动端优化

- **设备兼容**
  - 响应式设计，适配从千元机到最新 iPhone
  - 不同屏幕尺寸下的座位大小自适应
  - 高 DPI 屏幕支持 (Retina)

- **性能优化**
  - GPU 加速渲染 (transform3d, will-change)
  - 防抖和节流优化
  - 防止页面滚动和双击缩放
  - 最小化重排重绘

### 🎫 业务功能

- **多票价区域**
  - VIP 区（¥88）- 金色高亮
  - 高级区（¥68）- 紫色高亮
  - 标准区（¥48）- 蓝色高亮

- **座位状态管理**
  - 可选座位（灰色）
  - 已选座位（红色 + 脉冲动画）
  - 已售座位（深灰 + 禁用）

- **选座限制**
  - 最多选择 6 个座位
  - 实时显示已选座位和总价
  - 自动计算不同票价总和

## 文件结构

```
movie-seat-selector/
├── index.html      # 主页面结构
├── styles.css      # 样式和布局
├── app.js          # 核心交互逻辑
└── README.md       # 项目说明
```

## 使用方法

### 快速启动

1. 直接在浏览器中打开 `index.html` 文件
2. 或使用本地服务器（推荐）：

```bash
# Python 3
cd movie-seat-selector
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server -p 8000

# 然后访问 http://localhost:8000
```

### 操作指南

**移动端**
- 双指捏合：缩放地图
- 单指拖动：平移地图
- 点击座位：
  - 缩放较大时：直接选座
  - 缩放较小时：自动放大到该区域

**桌面端**
- 鼠标滚轮：缩放地图
- 左键拖动：平移地图
- 右侧按钮：手动缩放控制

**通用**
- 右下角按钮组：
  - 放大镜 +：放大
  - 放大镜 -：缩小
  - 重置图标：恢复默认视图

## 技术实现

### 手势识别

```javascript
// 双指缩放
- 计算两指距离变化比例
- 以双指中心为缩放原点
- 实时更新 transform: scale()

// 单指拖拽
- 跟踪触摸点位移
- 更新 transform: translate()
- 边界检测（可选）
```

### 智能吸附算法

```javascript
// 判断是否需要智能吸附
if (currentScale < SMART_ZOOM_THRESHOLD) {
    // 计算座位在地图中的位置
    // 计算目标 translate 使座位居中
    // 平滑过渡到 SMART_ZOOM_TARGET
}
```

### 迷你导航图

```javascript
// Canvas 绘制缩略图
- 按比例绘制座位区域
- 实时计算视窗位置
- 动态更新红框位置
```

## 自定义配置

在 `app.js` 中修改 `CONFIG` 对象：

```javascript
const CONFIG = {
    SMART_ZOOM_THRESHOLD: 1.2,  // 智能吸附触发阈值
    SMART_ZOOM_TARGET: 2.0,     // 智能吸附目标缩放
    ZOOM_STEP: 0.3,             // 缩放步长
    MAX_SELECTED_SEATS: 6,      // 最大选座数量
};
```

## 座位数据格式

修改 `generateSeatData()` 函数来自定义座位布局：

```javascript
const zones = [
    {
        name: '区域名称',
        price: 票价,
        class: 'CSS类名',
        rows: [
            {
                label: '行号',
                seats: 座位数,
                aisles: [过道位置数组]
            },
        ]
    },
];
```

## 浏览器兼容性

- ✅ Chrome/Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## 性能优化要点

1. **CSS 优化**
   - 使用 `transform` 和 `opacity` 触发 GPU 加速
   - `will-change` 提前告知浏览器优化项
   - `backface-visibility: hidden` 减少重绘

2. **JavaScript 优化**
   - 事件委托处理座位点击
   - `requestAnimationFrame` 优化动画
   - 防止默认行为（滚动、缩放）

3. **用户体验**
   - 触摸反馈（`:active` 状态）
   - 加载状态提示
   - 平滑过渡动画

## 后续优化建议

- [ ] 添加座位预览放大镜功能
- [ ] 支持横竖屏自适应
- [ ] 添加座位筛选（仅显示特定价格区）
- [ ] 保存选座状态到 localStorage
- [ ] 添加座位推荐算法
- [ ] 连座检测和提示
- [ ] 集成真实后端 API
- [ ] 添加支付流程

## 许可证

MIT License
