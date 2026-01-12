#!/usr/bin/env python3
"""
生成PNG预览图
"""

from PIL import Image, ImageDraw
import math


def create_bubble_with_irregularity(draw, cx, cy, radius, color, irregularity=0.05):
    """
    绘制带有微妙不规则性的气泡
    """
    # 使用多边形近似圆形，但添加微小变化
    points = []
    num_points = 60  # 更多点以获得更平滑的曲线

    for i in range(num_points):
        angle = (i / num_points) * 2 * math.pi
        # 添加微小的半径变化
        r_variation = radius * (1 + irregularity * math.sin(angle * 5))
        x = cx + r_variation * math.cos(angle)
        y = cy + r_variation * math.sin(angle)
        points.append((x, y))

    draw.polygon(points, fill=color)


def create_logo_png(output_file, bg_color='white', size=800):
    """
    创建PNG格式的logo
    """
    # 创建画布
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img, 'RGBA')

    # 缩放因子
    scale = size / 400

    # Z世代配色
    color1 = (255, 107, 53)   # 活力橙 #FF6B35
    color2 = (123, 44, 191)   # 电子紫 #7B2CBF
    color3 = (0, 245, 255)    # 霓虹青 #00F5FF

    # 三个气泡的位置（按原始400x400画布设计，然后缩放）
    bubbles = [
        (150 * scale, 250 * scale, 80 * scale, color1),  # 左上
        (260 * scale, 240 * scale, 70 * scale, color2),  # 右上
        (200 * scale, 140 * scale, 75 * scale, color3),  # 下方
    ]

    # 绘制气泡（使用透明度来展示重叠效果）
    for cx, cy, r, color in bubbles:
        # 转换为RGBA以支持透明度
        rgba_color = color + (220,)  # 添加alpha通道，稍微透明
        create_bubble_with_irregularity(draw, cx, cy, r, rgba_color, irregularity=0.06)

    # 绘制"碰撞火花"（白色小圆点）
    spark_color = (255, 255, 255, 255)
    sparks = [
        (205 * scale, 220 * scale, 8 * scale),
        (175 * scale, 180 * scale, 6 * scale),
        (235 * scale, 175 * scale, 7 * scale),
    ]

    for sx, sy, sr in sparks:
        # 绘制圆形火花
        draw.ellipse(
            [(sx - sr, sy - sr), (sx + sr, sy + sr)],
            fill=spark_color
        )

    # 保存
    img.save(output_file, 'PNG')
    print(f"✓ 生成PNG预览: {output_file}")


def create_logo_variants():
    """
    创建多个变体
    """
    # 白色背景版本
    create_logo_png('chaoci-logo-symbol.png', bg_color='white', size=800)

    # 黑色背景版本
    create_logo_png('chaoci-logo-dark.png', bg_color='black', size=800)

    # 透明背景版本
    create_logo_png_transparent('chaoci-logo-transparent.png', size=800)

    print("\n🎨 PNG预览生成完成！")


def create_logo_png_transparent(output_file, size=800):
    """
    创建透明背景的PNG logo
    """
    # 创建RGBA模式的图像（支持透明）
    img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img, 'RGBA')

    # 缩放因子
    scale = size / 400

    # Z世代配色（RGBA格式）
    color1 = (255, 107, 53, 255)   # 活力橙
    color2 = (123, 44, 191, 255)   # 电子紫
    color3 = (0, 245, 255, 255)    # 霓虹青

    # 三个气泡
    bubbles = [
        (150 * scale, 250 * scale, 80 * scale, color1),
        (260 * scale, 240 * scale, 70 * scale, color2),
        (200 * scale, 140 * scale, 75 * scale, color3),
    ]

    # 绘制气泡
    for cx, cy, r, color in bubbles:
        create_bubble_with_irregularity(draw, cx, cy, r, color, irregularity=0.06)

    # 绘制火花
    spark_color = (255, 255, 255, 255)
    sparks = [
        (205 * scale, 220 * scale, 8 * scale),
        (175 * scale, 180 * scale, 6 * scale),
        (235 * scale, 175 * scale, 7 * scale),
    ]

    for sx, sy, sr in sparks:
        draw.ellipse(
            [(sx - sr, sy - sr), (sx + sr, sy + sr)],
            fill=spark_color
        )

    img.save(output_file, 'PNG')
    print(f"✓ 生成透明背景PNG: {output_file}")


if __name__ == '__main__':
    create_logo_variants()
