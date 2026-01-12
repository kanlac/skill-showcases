#!/usr/bin/env python3
"""
炒词 Logo 设计生成器
基于"碰撞与创造"设计哲学
"""

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.graphics import shapes
from reportlab.graphics.shapes import Drawing, Circle, Path, Group
from reportlab.graphics import renderPDF
import math


def create_bubble_path(cx, cy, radius, irregularity=0.08):
    """
    创建一个略带不规则性的气泡形状
    使用贝塞尔曲线来模拟手绘感
    """
    # 使用8个控制点创建圆形，但添加微小的随机变化
    points = []
    angles = [i * 45 for i in range(8)]

    for i, angle in enumerate(angles):
        rad = math.radians(angle)
        # 添加微小的半径变化以创造有机感
        r_variation = radius * (1 + irregularity * math.sin(angle * 3))
        x = cx + r_variation * math.cos(rad)
        y = cy + r_variation * math.sin(rad)
        points.append((x, y))

    return points


def create_chaoci_logo():
    """
    创建炒词logo - 三个碰撞的对话气泡
    """
    # 画布尺寸 400x400
    width = 400
    height = 400

    d = Drawing(width, height)

    # Z世代配色方案
    # 主色：活力橙、电子紫、霓虹青
    color1 = HexColor('#FF6B35')  # 活力橙
    color2 = HexColor('#7B2CBF')  # 电子紫
    color3 = HexColor('#00F5FF')  # 霓虹青

    # 三个气泡的位置和大小
    # 左上气泡
    bubble1 = Circle(
        cx=150,
        cy=250,
        r=80,
        fillColor=color1,
        strokeColor=None
    )

    # 右上气泡（稍小）
    bubble2 = Circle(
        cx=260,
        cy=240,
        r=70,
        fillColor=color2,
        strokeColor=None
    )

    # 下方气泡
    bubble3 = Circle(
        cx=200,
        cy=140,
        r=75,
        fillColor=color3,
        strokeColor=None
    )

    # 添加气泡到画布
    d.add(bubble1)
    d.add(bubble2)
    d.add(bubble3)

    # 添加重叠区域的强调效果（白色小圆点）
    # 这些小圆点象征"碰撞产生的火花"
    spark1 = Circle(cx=205, cy=220, r=8, fillColor=HexColor('#FFFFFF'), strokeColor=None)
    spark2 = Circle(cx=175, cy=180, r=6, fillColor=HexColor('#FFFFFF'), strokeColor=None)
    spark3 = Circle(cx=235, cy=175, r=7, fillColor=HexColor('#FFFFFF'), strokeColor=None)

    d.add(spark1)
    d.add(spark2)
    d.add(spark3)

    return d


def create_logo_with_text():
    """
    创建带文字的logo版本
    """
    width = 600
    height = 400

    d = Drawing(width, height)

    # 添加图形标志（缩小一点）
    logo_graphic = create_chaoci_logo()
    # 将logo向左移动
    g = Group(logo_graphic)
    g.transform = (0.8, 0, 0, 0.8, -40, 0)  # 缩放到80%并向左移
    d.add(g)

    # 添加文字 "炒词" （右侧）
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont

    # 注意：这里使用系统字体，如果没有可以使用Helvetica
    try:
        # macOS 系统中文字体
        pdfmetrics.registerFont(TTFont('STHeiti', '/System/Library/Fonts/STHeiti Light.ttc'))
        font_name = 'STHeiti'
    except:
        # 如果中文字体不可用，使用默认字体
        font_name = 'Helvetica-Bold'

    from reportlab.graphics.shapes import String
    text = String(
        x=370,
        y=190,
        text='炒词',
        fontName=font_name,
        fontSize=48,
        fillColor=HexColor('#1A1A1A'),
        textAnchor='start'
    )
    d.add(text)

    return d


def main():
    """
    生成logo的多个版本
    """
    # 版本1：仅图形标志
    logo = create_chaoci_logo()
    renderPDF.drawToFile(logo, 'chaoci-logo-symbol.pdf', 'Logo Symbol')
    print("✓ 生成图形标志: chaoci-logo-symbol.pdf")

    # 版本2：图形+文字
    logo_with_text = create_logo_with_text()
    renderPDF.drawToFile(logo_with_text, 'chaoci-logo-full.pdf', 'Logo Full')
    print("✓ 生成完整标志: chaoci-logo-full.pdf")

    # 版本3：黑色背景版本（用于深色主题）
    width = 400
    height = 400
    d_dark = Drawing(width, height)

    # 添加黑色背景
    from reportlab.graphics.shapes import Rect
    bg = Rect(0, 0, width, height, fillColor=HexColor('#000000'), strokeColor=None)
    d_dark.add(bg)

    # 添加logo
    logo_graphic = create_chaoci_logo()
    d_dark.add(logo_graphic)

    renderPDF.drawToFile(d_dark, 'chaoci-logo-dark.pdf', 'Logo Dark')
    print("✓ 生成深色版本: chaoci-logo-dark.pdf")

    print("\n🎨 Logo设计完成！")
    print("   - chaoci-logo-symbol.pdf: 图形标志（可独立使用）")
    print("   - chaoci-logo-full.pdf: 完整标志（图形+文字）")
    print("   - chaoci-logo-dark.pdf: 深色背景版本")


if __name__ == '__main__':
    main()
