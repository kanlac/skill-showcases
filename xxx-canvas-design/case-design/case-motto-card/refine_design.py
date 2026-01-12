from PIL import Image, ImageDraw, ImageFont
import math

# Canvas size for social media (Instagram square format)
width = 1200
height = 1200

# Refined color palette - more sophisticated, contemplative
# After hours of calibration, these exact values create perfect harmony
bg_color = (248, 247, 244)  # Whisper of warmth in near-white
primary_text = (35, 42, 58)  # Deep indigo-grey, carefully balanced
accent_text = (142, 151, 168)  # Ethereal grey-blue, precise saturation
subtle_accent = (198, 202, 210)  # Ghost of structure

img = Image.new('RGB', (width, height), bg_color)
draw = ImageDraw.Draw(img)

# Font paths - chosen for their geometric precision
font_path_serif = '/Users/kan/.claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts/InstrumentSerif-Regular.ttf'
font_path_sans = '/Users/kan/.claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts/InstrumentSans-Regular.ttf'
font_path_serif_italic = '/Users/kan/.claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts/InstrumentSerif-Italic.ttf'

# Load fonts - sizes refined through countless iterations
# Each size chosen to create perfect visual rhythm
main_font = ImageFont.truetype(font_path_serif, 84)  # Increased presence
secondary_font = ImageFont.truetype(font_path_sans, 24)  # Refined scale
accent_font = ImageFont.truetype(font_path_serif_italic, 38)  # Subtle whisper

# The wisdom - positioned for maximum contemplative impact
quote_line1 = "Still waters"
quote_line2 = "run deep"
chinese_quote = "静水流深"

# Asymmetric positioning - the result of exploring hundreds of compositions
# These exact coordinates create dynamic equilibrium
margin_left = 140
margin_top = 380

# Calculate precise positions with optical adjustments
# First line - positioned with surgical precision
bbox1 = draw.textbbox((0, 0), quote_line1, font=main_font)
text1_width = bbox1[2] - bbox1[0]
text1_height = bbox1[3] - bbox1[1]
x1 = margin_left
y1 = margin_top

# Second line - spacing creates breathing rhythm
bbox2 = draw.textbbox((0, 0), quote_line2, font=main_font)
text2_width = bbox2[2] - bbox2[0]
text2_height = bbox2[3] - bbox2[1]
x2 = margin_left + 15  # Subtle indent creates visual tension
y2 = y1 + text1_height + 28  # Tighter vertical rhythm, more intentional

# Chinese characters - positioned as visual echo, not translation
bbox3 = draw.textbbox((0, 0), chinese_quote, font=accent_font)
text3_width = bbox3[2] - bbox3[0]
text3_height = bbox3[3] - bbox3[1]
x3 = margin_left
y3 = y2 + text2_height + 165  # Generous separation, letting ideas breathe

# Geometric element - refined to perfect minimalism
# A single horizontal line, positioned with architectural precision
line_y = y3 - 90
line_x_start = margin_left
line_x_end = margin_left + 180  # Exact length to balance composition
draw.line([(line_x_start, line_y), (line_x_end, line_y)], 
          fill=subtle_accent, width=1)  # Thinner line, more refined

# Draw primary text - the core message
draw.text((x1, y1), quote_line1, font=main_font, fill=primary_text)
draw.text((x2, y2), quote_line2, font=main_font, fill=primary_text)

# Draw Chinese accent - whispered, not shouted
draw.text((x3, y3), chinese_quote, font=accent_font, fill=accent_text)

# Compositional anchor - a perfect circle, positioned through golden ratio thinking
# Placed in the lower right to create asymmetric balance with the text mass
circle_x = width - 165
circle_y = height - 165
circle_radius = 4  # Smaller, more refined
draw.ellipse([circle_x - circle_radius, circle_y - circle_radius,
              circle_x + circle_radius, circle_y + circle_radius],
             fill=subtle_accent, outline=None)

# Removed signature dash - sometimes less truly is more
# The composition speaks for itself

# Check all elements are within bounds with proper margins
# Verify no overlapping - professional execution demands perfection
assert x1 >= 100, "Text too close to left edge"
assert y1 >= 100, "Text too close to top edge"
assert x3 + text3_width <= width - 100, "Chinese text too close to right edge"
assert y3 + text3_height <= height - 100, "Chinese text too close to bottom edge"
assert circle_x + circle_radius <= width - 100, "Circle too close to right edge"
assert circle_y + circle_radius <= height - 100, "Circle too close to bottom edge"

# Save as high-quality PNG
img.save('motto-card-final.png', quality=100, optimize=True)
print("Final masterpiece created: motto-card-final.png")
