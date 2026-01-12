#!/usr/bin/env python3
"""
Chaoci Logo Generator - Kinetic Orbits Philosophy
Creates a minimal, geometric logo for the AI creator value exchange platform
"""

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import math

def draw_arc_segment(c, center_x, center_y, radius, start_angle, end_angle, stroke_width, color):
    """Draw a precise circular arc segment"""
    c.setStrokeColor(color)
    c.setLineWidth(stroke_width)
    c.setLineCap(1)  # Round cap for smooth ends
    
    # Create arc path
    path = c.beginPath()
    # Convert angles to radians
    start_rad = math.radians(start_angle)
    end_rad = math.radians(end_angle)
    
    # Calculate arc points
    steps = 100
    for i in range(steps + 1):
        angle = start_rad + (end_rad - start_rad) * i / steps
        x = center_x + radius * math.cos(angle)
        y = center_y + radius * math.sin(angle)
        if i == 0:
            path.moveTo(x, y)
        else:
            path.lineTo(x, y)
    
    c.drawPath(path, stroke=1, fill=0)

def create_chaoci_logo():
    """Generate the Chaoci logo with kinetic orbital design"""
    
    # Canvas setup - square format for logo
    size = 800
    margin = 100
    center = size / 2
    
    c = canvas.Canvas("chaoci-logo-symbol.pdf", pagesize=(size, size))
    
    # Background - clean white
    c.setFillColor(HexColor('#FFFFFF'))
    c.rect(0, 0, size, size, fill=1, stroke=0)
    
    # Color palette - bold, contemporary, Gen Z
    color_primary = HexColor('#0066FF')    # Electric blue
    color_secondary = HexColor('#FF3366')  # Vibrant pink/coral
    color_accent = HexColor('#00FFAA')     # Electric mint
    
    # Logo parameters
    logo_size = size - 2 * margin
    logo_center_x = center
    logo_center_y = center
    
    # Arc parameters - creating interlocking C shapes
    arc_radius = logo_size / 2.5
    stroke_width = logo_size / 8
    
    # First C - rotated, electric blue
    # Creates a C shape from 45° to 315° (270° arc)
    draw_arc_segment(c, logo_center_x, logo_center_y, arc_radius, 
                     45, 315, stroke_width, color_primary)
    
    # Second C - rotated opposite, vibrant pink
    # Creates a C shape from 225° to 135° (going backwards, 270° arc)
    draw_arc_segment(c, logo_center_x, logo_center_y, arc_radius, 
                     225, 495, stroke_width, color_secondary)
    
    # Add subtle accent dots at the "exchange points" where gaps meet
    dot_radius = stroke_width / 4
    c.setFillColor(color_accent)
    
    # Calculate dot positions at the four cardinal points where arcs open
    angle1 = math.radians(45)
    angle2 = math.radians(315)
    angle3 = math.radians(225)
    angle4 = math.radians(135)
    
    for angle in [angle1, angle3]:
        dot_x = logo_center_x + arc_radius * math.cos(angle)
        dot_y = logo_center_y + arc_radius * math.sin(angle)
        c.circle(dot_x, dot_y, dot_radius, fill=1, stroke=0)
    
    # Add minimal typography - platform name
    c.setFillColor(HexColor('#1A1A1A'))
    c.setFont("Helvetica", 24)
    text_y = margin - 40
    c.drawCentredString(center, text_y, "炒词")
    
    c.setFont("Helvetica", 12)
    c.drawCentredString(center, text_y - 25, "CHAOCI")
    
    c.save()
    print("✓ Logo PDF generated: chaoci-logo-symbol.pdf")

def create_full_logo_with_text():
    """Create a version with more prominent text for website headers"""
    
    size_w = 1200
    size_h = 400
    
    c = canvas.Canvas("chaoci-logo-full.pdf", pagesize=(size_w, size_h))
    
    # Background
    c.setFillColor(HexColor('#FFFFFF'))
    c.rect(0, 0, size_w, size_h, fill=1, stroke=0)
    
    # Colors
    color_primary = HexColor('#0066FF')
    color_secondary = HexColor('#FF3366')
    color_accent = HexColor('#00FFAA')
    
    # Logo symbol (smaller, left side)
    logo_size = 200
    logo_center_x = 200
    logo_center_y = size_h / 2
    
    arc_radius = logo_size / 2.5
    stroke_width = logo_size / 8
    
    # Draw symbol
    draw_arc_segment(c, logo_center_x, logo_center_y, arc_radius, 
                     45, 315, stroke_width, color_primary)
    draw_arc_segment(c, logo_center_x, logo_center_y, arc_radius, 
                     225, 495, stroke_width, color_secondary)
    
    # Accent dots
    dot_radius = stroke_width / 4
    c.setFillColor(color_accent)
    angle1 = math.radians(45)
    angle3 = math.radians(225)
    
    for angle in [angle1, angle3]:
        dot_x = logo_center_x + arc_radius * math.cos(angle)
        dot_y = logo_center_y + arc_radius * math.sin(angle)
        c.circle(dot_x, dot_y, dot_radius, fill=1, stroke=0)
    
    # Typography - brand name
    c.setFillColor(HexColor('#1A1A1A'))
    c.setFont("Helvetica-Bold", 72)
    c.drawString(380, size_h / 2 - 20, "炒词")
    
    c.setFont("Helvetica", 32)
    c.setFillColor(HexColor('#666666'))
    c.drawString(382, size_h / 2 - 70, "AI Creator Exchange")
    
    c.save()
    print("✓ Full logo generated: chaoci-logo-full.pdf")

def create_dark_version():
    """Create dark background version for versatile usage"""
    
    size = 800
    margin = 100
    center = size / 2
    
    c = canvas.Canvas("chaoci-logo-dark.pdf", pagesize=(size, size))
    
    # Dark background
    c.setFillColor(HexColor('#0A0A0A'))
    c.rect(0, 0, size, size, fill=1, stroke=0)
    
    # Adjusted colors for dark mode - more vibrant
    color_primary = HexColor('#3399FF')
    color_secondary = HexColor('#FF3366')
    color_accent = HexColor('#00FFAA')
    
    # Logo parameters
    logo_size = size - 2 * margin
    logo_center_x = center
    logo_center_y = center
    
    arc_radius = logo_size / 2.5
    stroke_width = logo_size / 8
    
    # Draw arcs
    draw_arc_segment(c, logo_center_x, logo_center_y, arc_radius, 
                     45, 315, stroke_width, color_primary)
    draw_arc_segment(c, logo_center_x, logo_center_y, arc_radius, 
                     225, 495, stroke_width, color_secondary)
    
    # Accent dots
    dot_radius = stroke_width / 4
    c.setFillColor(color_accent)
    
    angle1 = math.radians(45)
    angle3 = math.radians(225)
    
    for angle in [angle1, angle3]:
        dot_x = logo_center_x + arc_radius * math.cos(angle)
        dot_y = logo_center_y + arc_radius * math.sin(angle)
        c.circle(dot_x, dot_y, dot_radius, fill=1, stroke=0)
    
    # Typography
    c.setFillColor(HexColor('#FFFFFF'))
    c.setFont("Helvetica", 24)
    text_y = margin - 40
    c.drawCentredString(center, text_y, "炒词")
    
    c.setFont("Helvetica", 12)
    c.drawCentredString(center, text_y - 25, "CHAOCI")
    
    c.save()
    print("✓ Dark version generated: chaoci-logo-dark.pdf")

if __name__ == "__main__":
    print("\n🎨 Generating Chaoci Logo - Kinetic Orbits Design\n")
    create_chaoci_logo()
    create_full_logo_with_text()
    create_dark_version()
    print("\n✨ All logo variants generated successfully!\n")
