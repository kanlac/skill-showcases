#!/usr/bin/env python3
"""
炒词 Logo Design
Based on Creative Imprint philosophy - Second Pass Refinement
"""

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import math

# Canvas setup
width, height = letter  # 8.5 x 11 inches
c = canvas.Canvas("/Users/kan/Documents/skill-showcases/003-canvas-design/case-chaoci-logo/chaoci-logo.pdf", pagesize=letter)

# Refined color palette - meticulously calibrated
deep_black = colors.HexColor('#0F0F0F')
pure_white = colors.white
accent_red = colors.HexColor('#DC2F39')  # Refined trust/verification accent
connection_gray = colors.HexColor('#BDBDBD')  # Softer connection color
subtle_gray = colors.HexColor('#F5F5F5')  # Background subtle tone
text_gray = colors.HexColor('#2A2A2A')  # Deep text color
meta_gray = colors.HexColor('#909090')  # Metadata color

# Background - subtle warmth
c.setFillColor(subtle_gray)
c.rect(0, 0, width, height, fill=1, stroke=0)

# Center coordinates - adjusted for perfect optical balance
cx = width / 2
cy = height / 2 + 1.2 * inch

# Main logo structure - abstract representation inspired by Chinese character strokes
# The design combines circular nodes (creators) with linear connections (network)

def draw_node(x, y, radius, fill_color, stroke_color, stroke_width=1):
    """Draw a precise circular node"""
    c.setFillColor(fill_color)
    c.setStrokeColor(stroke_color)
    c.setLineWidth(stroke_width)
    c.circle(x, y, radius, fill=1, stroke=1)

def draw_connection(x1, y1, x2, y2, color, width):
    """Draw a precise connection line"""
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)

# Logo design - refined geometric abstraction of "炒词"
# Meticulously crafted network topology with intentional asymmetry

# Define the refined geometric structure - every measurement deliberate
node_radius_primary = 22  # Central authority node
node_radius_secondary = 13  # Key network nodes
node_radius_tertiary = 7   # Supporting nodes
stroke_weight_main = 2.2   # Primary strokes
stroke_weight_connection = 1.6  # Network connections
stroke_weight_accent = 3.0  # Accent emphasis

# Main structure - 7 nodes forming a distinctive, balanced constellation
# Inspired by the character "炒" (stir/trade) and network graphs

# Center anchor node - the platform core
center_x = cx
center_y = cy

# Primary constellation (forming the main visual)
# Top node - aspirational
top_x = center_x
top_y = center_y + 58

# Upper left - creative input
upper_left_x = center_x - 48
upper_left_y = center_y + 28

# Upper right - creative output
upper_right_x = center_x + 48
upper_right_y = center_y + 28

# Bottom left cluster
bottom_left_x = center_x - 42
bottom_left_y = center_y - 48

# Bottom right cluster
bottom_right_x = center_x + 42
bottom_right_y = center_y - 48

# Small accent nodes - subtle details showing depth
accent_left_x = center_x - 68
accent_left_y = center_y - 8

accent_right_x = center_x + 68
accent_right_y = center_y - 8

# Draw subtle background circle - representing the broader ecosystem
c.setStrokeColor(colors.HexColor('#E8E8E8'))
c.setLineWidth(0.8)
c.setFillColor(pure_white)
c.circle(center_x, center_y, 95, fill=1, stroke=1)

# Draw connections first (network infrastructure)
# Using varying weights to create visual hierarchy
connections_primary = [
    (center_x, center_y, top_x, top_y, stroke_weight_connection),
    (center_x, center_y, upper_left_x, upper_left_y, stroke_weight_connection),
    (center_x, center_y, upper_right_x, upper_right_y, stroke_weight_connection),
    (center_x, center_y, bottom_left_x, bottom_left_y, stroke_weight_connection),
    (center_x, center_y, bottom_right_x, bottom_right_y, stroke_weight_connection),
]

connections_secondary = [
    (top_x, top_y, upper_left_x, upper_left_y, stroke_weight_connection * 0.7),
    (top_x, top_y, upper_right_x, upper_right_y, stroke_weight_connection * 0.7),
    (upper_left_x, upper_left_y, bottom_left_x, bottom_left_y, stroke_weight_connection * 0.6),
    (upper_right_x, upper_right_y, bottom_right_x, bottom_right_y, stroke_weight_connection * 0.6),
]

# Primary connections - stronger presence
c.setStrokeColor(connection_gray)
for x1, y1, x2, y2, weight in connections_primary:
    c.setLineWidth(weight)
    c.line(x1, y1, x2, y2)

# Secondary connections - subtle relationships
c.setStrokeColor(colors.HexColor('#D9D9D9'))
for x1, y1, x2, y2, weight in connections_secondary:
    c.setLineWidth(weight)
    c.line(x1, y1, x2, y2)

# Accent connections to peripheral nodes - very subtle
c.setStrokeColor(colors.HexColor('#E8E8E8'))
c.setLineWidth(1.0)
c.line(upper_left_x, upper_left_y, accent_left_x, accent_left_y)
c.line(upper_right_x, upper_right_y, accent_right_x, accent_right_y)

# Draw nodes - meticulously layered with refined details
# Each node represents a different aspect: creator, work, connection

# Peripheral accent nodes first (deepest layer) - very subtle
draw_node(accent_left_x, accent_left_y, node_radius_tertiary - 2, pure_white, colors.HexColor('#DDDDDD'), 1.0)
draw_node(accent_right_x, accent_right_y, node_radius_tertiary - 2, pure_white, colors.HexColor('#DDDDDD'), 1.0)

# Bottom nodes - solid foundation
draw_node(bottom_left_x, bottom_left_y, node_radius_tertiary, deep_black, deep_black, stroke_weight_main)
draw_node(bottom_right_x, bottom_right_y, node_radius_tertiary, deep_black, deep_black, stroke_weight_main)

# Upper nodes - creative energy
draw_node(upper_left_x, upper_left_y, node_radius_secondary, pure_white, deep_black, stroke_weight_main)
draw_node(upper_right_x, upper_right_y, node_radius_secondary, pure_white, deep_black, stroke_weight_main)

# Top node - aspirational
draw_node(top_x, top_y, node_radius_secondary, pure_white, text_gray, stroke_weight_main)

# Center node - THE primary focus with refined accent
# Draw with double-ring for emphasis
c.setFillColor(accent_red)
c.setStrokeColor(deep_black)
c.setLineWidth(stroke_weight_accent)
c.circle(center_x, center_y, node_radius_primary, fill=1, stroke=1)

# Inner accent circle for depth
c.setFillColor(colors.HexColor('#A01F28'))
c.setStrokeColor(accent_red)
c.setLineWidth(1.2)
c.circle(center_x, center_y, node_radius_primary * 0.35, fill=1, stroke=0)

# Typography - 炒词
# Meticulously positioned with optical balance
c.setFillColor(text_gray)

# Main wordmark - using system font with precise kerning
c.setFont("Helvetica-Bold", 52)
text_y = cy - 125

# Calculate text width and adjust for optical centering
text = "炒词"
text_width = c.stringWidth(text, "Helvetica-Bold", 52)
text_x = cx - text_width / 2

c.drawString(text_x, text_y, text)

# English subtitle - minimal, precise letter spacing
c.setFont("Helvetica", 8.5)
c.setFillColor(meta_gray)
subtitle = "AI CREATOR NETWORK"
subtitle_width = c.stringWidth(subtitle, "Helvetica", 8.5)
subtitle_y = text_y - 26

# Refined letter spacing for elegant rhythm
spacing = 5.2
total_width = subtitle_width + spacing * (len(subtitle) - 1)
subtitle_x = cx - total_width / 2
current_x = subtitle_x

for char in subtitle:
    c.drawString(current_x, subtitle_y, char)
    current_x += c.stringWidth(char, "Helvetica", 8.5) + spacing

# Verification mark - like a digital seal
# Placed with intentional asymmetry
seal_x = cx + 92
seal_y = cy + 55

c.setStrokeColor(accent_red)
c.setLineWidth(1.3)
c.setFillColor(pure_white)
c.rect(seal_x, seal_y, 7, 7, fill=1, stroke=1)

# Inner seal dot
c.setFillColor(accent_red)
c.circle(seal_x + 3.5, seal_y + 3.5, 1.8, fill=1, stroke=0)

# Minimal system annotation - evidence of craftsmanship
c.setFont("Helvetica", 5.5)
c.setFillColor(colors.HexColor('#A8A8A8'))
c.drawRightString(seal_x + 5, seal_y - 8, "EST. 2026")

# Save the PDF
c.showPage()
c.save()

print("Logo created: chaoci-logo.pdf")
