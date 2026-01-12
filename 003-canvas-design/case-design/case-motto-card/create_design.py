from PIL import Image, ImageDraw, ImageFont
import math

# Canvas size for social media (Instagram square format)
width = 1200
height = 1200

# Create image with a sophisticated color palette
# Using a deep, contemplative blue-grey
bg_color = (245, 245, 242)  # Warm off-white
accent_color = (45, 55, 72)  # Deep blue-grey
secondary_color = (160, 174, 192)  # Soft grey-blue

img = Image.new('RGB', (width, height), bg_color)
draw = ImageDraw.Draw(img)

# Font paths
font_path_serif = '/Users/kan/.claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts/InstrumentSerif-Regular.ttf'
font_path_sans = '/Users/kan/.claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts/InstrumentSans-Regular.ttf'
font_path_serif_italic = '/Users/kan/.claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts/InstrumentSerif-Italic.ttf'

# Load fonts with careful sizing
main_font = ImageFont.truetype(font_path_serif, 72)
secondary_font = ImageFont.truetype(font_path_sans, 28)
accent_font = ImageFont.truetype(font_path_serif_italic, 42)

# The wisdom quote - split into lines for visual impact
quote_line1 = "Still waters"
quote_line2 = "run deep"
chinese_quote = "静水流深"

# Generous margins for breathing room
margin_top = 320
margin_left = 120

# Calculate text positions with asymmetric balance
# Position first line
bbox1 = draw.textbbox((0, 0), quote_line1, font=main_font)
text1_width = bbox1[2] - bbox1[0]
text1_height = bbox1[3] - bbox1[1]
x1 = margin_left
y1 = margin_top

# Position second line with careful spacing
bbox2 = draw.textbbox((0, 0), quote_line2, font=main_font)
text2_width = bbox2[2] - bbox2[0]
text2_height = bbox2[3] - bbox2[1]
x2 = margin_left
y2 = y1 + text1_height + 35  # Precise vertical rhythm

# Position Chinese characters as a subtle accent
bbox3 = draw.textbbox((0, 0), chinese_quote, font=accent_font)
text3_width = bbox3[2] - bbox3[0]
text3_height = bbox3[3] - bbox3[1]
x3 = margin_left
y3 = y2 + text2_height + 180  # Generous separation

# Draw geometric accent - a single line as visual anchor
# Positioned with asymmetric balance
line_y = y3 - 100
line_x_start = margin_left
line_x_end = margin_left + 220
draw.line([(line_x_start, line_y), (line_x_end, line_y)], 
          fill=secondary_color, width=2)

# Draw main text with precise kerning
draw.text((x1, y1), quote_line1, font=main_font, fill=accent_color)
draw.text((x2, y2), quote_line2, font=main_font, fill=accent_color)

# Draw Chinese characters as subtle accent
draw.text((x3, y3), chinese_quote, font=accent_font, fill=secondary_color)

# Add a subtle mark in the bottom right as compositional balance
# A small circle - geometric and minimal
circle_x = width - 140
circle_y = height - 140
circle_radius = 6
draw.ellipse([circle_x - circle_radius, circle_y - circle_radius,
              circle_x + circle_radius, circle_y + circle_radius],
             fill=secondary_color)

# Add a refined signature element - minimal text
signature = "—"
bbox_sig = draw.textbbox((0, 0), signature, font=secondary_font)
sig_width = bbox_sig[2] - bbox_sig[0]
sig_x = width - margin_left - sig_width
sig_y = height - 160
draw.text((sig_x, sig_y), signature, font=secondary_font, fill=secondary_color)

# Save as PNG
img.save('motto-card-draft1.png', quality=100, optimize=True)
print("Draft 1 created: motto-card-draft1.png")
