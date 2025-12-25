// ========== 全局状态 ==========
const state = {
    scale: 1,
    minScale: 0.5,
    maxScale: 3,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    isPinching: false,
    lastTouchDistance: 0,
    lastTouchCenter: { x: 0, y: 0 },
    selectedSeats: new Set(),
    seatData: [],
    mapBounds: { width: 0, height: 0 },
};

// 配置常量
const CONFIG = {
    SMART_ZOOM_THRESHOLD: 1.2, // 智能吸附阈值：小于此值点击时自动放大
    SMART_ZOOM_TARGET: 2.0, // 智能吸附目标缩放
    ZOOM_STEP: 0.3,
    MAX_SELECTED_SEATS: 6, // 最多选择座位数
};

// ========== DOM 元素 ==========
const elements = {
    seatMap: document.getElementById('seatMap'),
    seatMapWrapper: document.getElementById('seatMapWrapper'),
    seatsContainer: document.getElementById('seatsContainer'),
    minimap: document.getElementById('minimap'),
    minimapCanvas: document.getElementById('minimapCanvas'),
    minimapViewport: document.getElementById('minimapViewport'),
    zoomHint: document.getElementById('zoomHint'),
    zoomIn: document.getElementById('zoomIn'),
    zoomOut: document.getElementById('zoomOut'),
    resetZoom: document.getElementById('resetZoom'),
    selectedSeats: document.getElementById('selectedSeats'),
    totalPrice: document.getElementById('totalPrice'),
    confirmBtn: document.getElementById('confirmBtn'),
};

// ========== 座位数据生成 ==========
function generateSeatData() {
    // 模拟中型影厅：120 座位，分为 3 个区域
    const zones = [
        {
            name: 'VIP区',
            price: 88,
            class: 'zone-vip',
            rows: [
                { label: 'A', seats: 8, aisles: [4] },
                { label: 'B', seats: 10, aisles: [5] },
            ]
        },
        {
            name: '高级区',
            price: 68,
            class: 'zone-premium',
            rows: [
                { label: 'C', seats: 12, aisles: [6] },
                { label: 'D', seats: 12, aisles: [6] },
                { label: 'E', seats: 12, aisles: [6] },
                { label: 'F', seats: 12, aisles: [6] },
            ]
        },
        {
            name: '标准区',
            price: 48,
            class: 'zone-standard',
            rows: [
                { label: 'G', seats: 14, aisles: [7] },
                { label: 'H', seats: 14, aisles: [7] },
                { label: 'I', seats: 14, aisles: [7] },
            ]
        }
    ];

    const seatData = [];

    zones.forEach(zone => {
        zone.rows.forEach(row => {
            const rowSeats = [];
            let seatNumber = 1;

            for (let i = 1; i <= row.seats; i++) {
                // 检查是否是过道
                if (row.aisles && row.aisles.includes(i)) {
                    rowSeats.push({
                        type: 'aisle',
                        id: `${row.label}-aisle-${i}`,
                    });
                }

                // 随机生成已售座位（20% 概率）
                const isOccupied = Math.random() < 0.2;

                rowSeats.push({
                    type: 'seat',
                    id: `${row.label}${seatNumber}`,
                    row: row.label,
                    number: seatNumber,
                    price: zone.price,
                    zone: zone.name,
                    status: isOccupied ? 'occupied' : 'available',
                });

                seatNumber++;
            }

            seatData.push({
                zone: zone.name,
                zoneClass: zone.class,
                price: zone.price,
                rowLabel: row.label,
                seats: rowSeats,
            });
        });
    });

    return seatData;
}

// ========== 渲染座位 ==========
function renderSeats() {
    state.seatData = generateSeatData();
    const container = elements.seatsContainer;
    container.innerHTML = '';

    let currentZone = null;
    let zoneElement = null;

    state.seatData.forEach(rowData => {
        // 创建新的区域
        if (currentZone !== rowData.zone) {
            currentZone = rowData.zone;
            zoneElement = document.createElement('div');
            zoneElement.className = `seat-zone ${rowData.zoneClass}`;

            const zoneHeader = document.createElement('div');
            zoneHeader.className = 'zone-label';
            zoneHeader.innerHTML = `
                <span>${rowData.zone}</span>
                <span class="zone-price">¥${rowData.price}</span>
            `;
            zoneElement.appendChild(zoneHeader);
            container.appendChild(zoneElement);
        }

        // 创建座位行
        const rowElement = document.createElement('div');
        rowElement.className = 'seat-row';

        // 行标签
        const rowLabel = document.createElement('div');
        rowLabel.className = 'row-label';
        rowLabel.textContent = rowData.rowLabel;
        rowElement.appendChild(rowLabel);

        // 座位
        rowData.seats.forEach(seatInfo => {
            const seatElement = document.createElement('div');

            if (seatInfo.type === 'aisle') {
                seatElement.className = 'seat aisle';
            } else {
                seatElement.className = `seat ${seatInfo.status}`;
                seatElement.dataset.seatId = seatInfo.id;
                seatElement.dataset.price = seatInfo.price;
                seatElement.dataset.zone = seatInfo.zone;
                seatElement.textContent = seatInfo.number;

                if (seatInfo.status === 'available') {
                    seatElement.addEventListener('click', handleSeatClick);
                }
            }

            rowElement.appendChild(seatElement);
        });

        zoneElement.appendChild(rowElement);
    });

    // 计算地图边界
    setTimeout(() => {
        const rect = elements.seatMap.getBoundingClientRect();
        state.mapBounds.width = rect.width;
        state.mapBounds.height = rect.height;
        initMinimap();
    }, 100);
}

// ========== 座位点击处理 ==========
function handleSeatClick(e) {
    e.stopPropagation();

    // 智能吸附：如果缩放太小，不选座，而是放大
    if (state.scale < CONFIG.SMART_ZOOM_THRESHOLD) {
        smartZoomToSeat(e.target);
        return;
    }

    const seatElement = e.target;
    const seatId = seatElement.dataset.seatId;

    // 切换选择状态
    if (state.selectedSeats.has(seatId)) {
        state.selectedSeats.delete(seatId);
        seatElement.classList.remove('selected');
        seatElement.classList.add('available');
    } else {
        // 检查是否超过最大选择数
        if (state.selectedSeats.size >= CONFIG.MAX_SELECTED_SEATS) {
            showToast(`最多只能选择 ${CONFIG.MAX_SELECTED_SEATS} 个座位`);
            return;
        }

        state.selectedSeats.add(seatId);
        seatElement.classList.remove('available');
        seatElement.classList.add('selected');
    }

    updateSelectedInfo();
}

// ========== 智能吸附功能 ==========
function smartZoomToSeat(seatElement) {
    // 显示缩放提示
    showZoomHint();

    // 获取座位在地图中的位置
    const seatRect = seatElement.getBoundingClientRect();
    const mapRect = elements.seatMap.getBoundingClientRect();
    const wrapperRect = elements.seatMapWrapper.getBoundingClientRect();

    // 计算座位相对于地图的中心位置（未缩放状态）
    const seatCenterX = (seatRect.left - mapRect.left) / state.scale;
    const seatCenterY = (seatRect.top - mapRect.top) / state.scale;

    // 目标：将座位移动到视窗中心
    const targetScale = CONFIG.SMART_ZOOM_TARGET;
    const viewportCenterX = wrapperRect.width / 2;
    const viewportCenterY = wrapperRect.height / 2;

    // 计算新的 translate
    const newTranslateX = viewportCenterX - seatCenterX * targetScale;
    const newTranslateY = viewportCenterY - seatCenterY * targetScale;

    // 应用变换（带动画）
    state.scale = targetScale;
    state.translateX = newTranslateX;
    state.translateY = newTranslateY;

    applyTransform(true);
    updateMinimap();

    // 隐藏提示
    setTimeout(() => {
        hideZoomHint();
    }, 300);
}

// ========== 更新选座信息 ==========
function updateSelectedInfo() {
    const count = state.selectedSeats.size;

    if (count === 0) {
        elements.selectedSeats.textContent = '未选座';
        elements.totalPrice.textContent = '¥0';
        elements.confirmBtn.disabled = true;
    } else {
        // 计算总价
        let totalPrice = 0;
        const seatNames = [];

        state.selectedSeats.forEach(seatId => {
            const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
            if (seatElement) {
                totalPrice += parseInt(seatElement.dataset.price);
                seatNames.push(seatId);
            }
        });

        elements.selectedSeats.textContent = seatNames.join(', ');
        elements.totalPrice.textContent = `¥${totalPrice}`;
        elements.confirmBtn.disabled = false;
    }
}

// ========== 手势控制：双指缩放 ==========
function handleTouchStart(e) {
    if (e.touches.length === 2) {
        // 双指缩放
        state.isPinching = true;
        state.isDragging = false;
        state.lastTouchDistance = getTouchDistance(e.touches);
        state.lastTouchCenter = getTouchCenter(e.touches);
    } else if (e.touches.length === 1) {
        // 单指拖拽
        state.isDragging = true;
        state.isPinching = false;
        state.lastTouchCenter = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
        elements.seatMapWrapper.classList.add('grabbing');
    }
}

function handleTouchMove(e) {
    e.preventDefault();

    if (state.isPinching && e.touches.length === 2) {
        // 双指缩放
        const currentDistance = getTouchDistance(e.touches);
        const currentCenter = getTouchCenter(e.touches);

        // 计算缩放比例
        const scaleChange = currentDistance / state.lastTouchDistance;
        const newScale = Math.max(
            state.minScale,
            Math.min(state.maxScale, state.scale * scaleChange)
        );

        // 以两指中心点为缩放中心
        const scaleDiff = newScale - state.scale;
        const wrapperRect = elements.seatMapWrapper.getBoundingClientRect();
        const centerX = currentCenter.x - wrapperRect.left;
        const centerY = currentCenter.y - wrapperRect.top;

        state.translateX -= (centerX - state.translateX) * (scaleDiff / state.scale);
        state.translateY -= (centerY - state.translateY) * (scaleDiff / state.scale);
        state.scale = newScale;

        state.lastTouchDistance = currentDistance;
        state.lastTouchCenter = currentCenter;

        applyTransform();
        updateMinimap();

    } else if (state.isDragging && e.touches.length === 1) {
        // 单指拖拽
        const touch = e.touches[0];
        const deltaX = touch.clientX - state.lastTouchCenter.x;
        const deltaY = touch.clientY - state.lastTouchCenter.y;

        state.translateX += deltaX;
        state.translateY += deltaY;

        state.lastTouchCenter = {
            x: touch.clientX,
            y: touch.clientY,
        };

        applyTransform();
        updateMinimap();
    }
}

function handleTouchEnd(e) {
    if (e.touches.length < 2) {
        state.isPinching = false;
    }
    if (e.touches.length === 0) {
        state.isDragging = false;
        elements.seatMapWrapper.classList.remove('grabbing');
    }
}

// ========== 鼠标控制（桌面端） ==========
function handleMouseDown(e) {
    if (e.button !== 0) return; // 只响应左键
    state.isDragging = true;
    state.lastTouchCenter = { x: e.clientX, y: e.clientY };
    elements.seatMapWrapper.classList.add('grabbing');
    e.preventDefault();
}

function handleMouseMove(e) {
    if (!state.isDragging) return;

    const deltaX = e.clientX - state.lastTouchCenter.x;
    const deltaY = e.clientY - state.lastTouchCenter.y;

    state.translateX += deltaX;
    state.translateY += deltaY;

    state.lastTouchCenter = { x: e.clientX, y: e.clientY };

    applyTransform();
    updateMinimap();
}

function handleMouseUp() {
    state.isDragging = false;
    elements.seatMapWrapper.classList.remove('grabbing');
}

function handleWheel(e) {
    e.preventDefault();

    const delta = e.deltaY > 0 ? -CONFIG.ZOOM_STEP : CONFIG.ZOOM_STEP;
    const newScale = Math.max(
        state.minScale,
        Math.min(state.maxScale, state.scale + delta)
    );

    // 以鼠标位置为缩放中心
    const rect = elements.seatMapWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleDiff = newScale - state.scale;
    state.translateX -= (x - state.translateX) * (scaleDiff / state.scale);
    state.translateY -= (y - state.translateY) * (scaleDiff / state.scale);
    state.scale = newScale;

    applyTransform();
    updateMinimap();
}

// ========== 缩放控制按钮 ==========
function zoomIn() {
    const newScale = Math.min(state.maxScale, state.scale + CONFIG.ZOOM_STEP);
    zoomToCenter(newScale);
}

function zoomOut() {
    const newScale = Math.max(state.minScale, state.scale - CONFIG.ZOOM_STEP);
    zoomToCenter(newScale);
}

function resetZoom() {
    state.scale = 1;
    state.translateX = 0;
    state.translateY = 0;
    applyTransform(true);
    updateMinimap();
}

function zoomToCenter(newScale) {
    const rect = elements.seatMapWrapper.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const scaleDiff = newScale - state.scale;
    state.translateX -= (centerX - state.translateX) * (scaleDiff / state.scale);
    state.translateY -= (centerY - state.translateY) * (scaleDiff / state.scale);
    state.scale = newScale;

    applyTransform(true);
    updateMinimap();
}

// ========== 应用变换 ==========
function applyTransform(animated = false) {
    const transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`;

    if (animated) {
        elements.seatMap.style.transition = 'transform 0.3s ease-out';
        elements.seatMap.style.transform = transform;
        setTimeout(() => {
            elements.seatMap.style.transition = 'transform 0.1s ease-out';
        }, 300);
    } else {
        elements.seatMap.style.transform = transform;
    }

    // 根据缩放级别显示/隐藏迷你地图
    if (state.scale > 1.3) {
        elements.minimap.classList.add('visible');
    } else {
        elements.minimap.classList.remove('visible');
    }
}

// ========== 迷你导航图 ==========
function initMinimap() {
    const canvas = elements.minimapCanvas;
    const ctx = canvas.getContext('2d');

    // 设置 canvas 尺寸
    const scale = window.devicePixelRatio || 1;
    const width = 120;
    const height = 100;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(scale, scale);

    // 绘制简化的座位地图
    drawMinimapContent(ctx, width, height);
}

function drawMinimapContent(ctx, width, height) {
    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 计算缩放比例
    const scaleX = width / state.mapBounds.width;
    const scaleY = height / state.mapBounds.height;
    const scale = Math.min(scaleX, scaleY) * 0.9;

    // 居中偏移
    const offsetX = (width - state.mapBounds.width * scale) / 2;
    const offsetY = (height - state.mapBounds.height * scale) / 2;

    ctx.save();
    ctx.translate(offsetX, offsetY);

    // 绘制座位区域（简化）
    const zones = document.querySelectorAll('.seat-zone');
    zones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        const mapRect = elements.seatMap.getBoundingClientRect();

        const x = (rect.left - mapRect.left) * scale;
        const y = (rect.top - mapRect.top) * scale;
        const w = rect.width * scale;
        const h = rect.height * scale;

        ctx.fillStyle = 'rgba(74, 85, 104, 0.5)';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.strokeRect(x, y, w, h);
    });

    ctx.restore();

    // 保存比例供 updateMinimap 使用
    elements.minimapCanvas.dataset.scale = scale;
    elements.minimapCanvas.dataset.offsetX = offsetX;
    elements.minimapCanvas.dataset.offsetY = offsetY;
}

function updateMinimap() {
    if (state.scale <= 1.3) return;

    const canvas = elements.minimapCanvas;
    const scale = parseFloat(canvas.dataset.scale || 1);
    const offsetX = parseFloat(canvas.dataset.offsetX || 0);
    const offsetY = parseFloat(canvas.dataset.offsetY || 0);

    const wrapperRect = elements.seatMapWrapper.getBoundingClientRect();
    const viewportWidth = wrapperRect.width / state.scale;
    const viewportHeight = wrapperRect.height / state.scale;

    // 计算视窗在迷你地图中的位置
    const viewportX = (-state.translateX / state.scale) * scale + offsetX;
    const viewportY = (-state.translateY / state.scale) * scale + offsetY;
    const viewportW = viewportWidth * scale;
    const viewportH = viewportHeight * scale;

    // 更新视窗指示器
    const viewport = elements.minimapViewport;
    viewport.style.left = `${viewportX}px`;
    viewport.style.top = `${viewportY}px`;
    viewport.style.width = `${viewportW}px`;
    viewport.style.height = `${viewportH}px`;
}

// ========== 工具函数 ==========
function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function getTouchCenter(touches) {
    return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2,
    };
}

function showZoomHint() {
    elements.zoomHint.classList.add('visible');
}

function hideZoomHint() {
    elements.zoomHint.classList.remove('visible');
}

function showToast(message) {
    // 简单的 toast 提示（可以后续优化）
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// ========== 确认选座 ==========
function handleConfirm() {
    if (state.selectedSeats.size === 0) return;

    const seatList = Array.from(state.selectedSeats).join(', ');
    const totalPrice = elements.totalPrice.textContent;

    alert(`确认选座：\n座位：${seatList}\n总价：${totalPrice}\n\n（实际项目中这里会跳转到支付页面）`);
}

// ========== 事件绑定 ==========
function bindEvents() {
    // 触摸事件
    elements.seatMapWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
    elements.seatMapWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
    elements.seatMapWrapper.addEventListener('touchend', handleTouchEnd);

    // 鼠标事件（桌面端）
    elements.seatMapWrapper.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    elements.seatMapWrapper.addEventListener('wheel', handleWheel, { passive: false });

    // 缩放按钮
    elements.zoomIn.addEventListener('click', zoomIn);
    elements.zoomOut.addEventListener('click', zoomOut);
    elements.resetZoom.addEventListener('click', resetZoom);

    // 确认按钮
    elements.confirmBtn.addEventListener('click', handleConfirm);
}

// ========== 初始化 ==========
function init() {
    renderSeats();
    bindEvents();

    // 防止页面滚动
    document.body.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    // 防止双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

// 启动应用
init();
