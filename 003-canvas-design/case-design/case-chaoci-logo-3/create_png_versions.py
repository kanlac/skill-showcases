#!/usr/bin/env python3
"""
Create high-quality PNG versions of the Chaoci logo
"""

from PIL import Image, ImageDraw
import math

def draw_smooth_arc(draw, center, radius, start_angle, end_angle, stroke_width, color):
    """Draw a smooth arc using PIL with high quality anti-aliasing"""
    # Calculate bounding box for the circle
    bbox = [
        center[0] - radius - stroke_width,
        center[1] - radius - stroke_width,
        center[0] + radius + stroke_width,
        center[1] + radius + stroke_width
    ]
    
    # Draw the arc
    draw.arc(bbox, start_angle, end_angle, fill=color, width=int(stroke_width))

def create_symbol_png():
    """Create the symbol-only PNG version"""
    size = 1200
    margin = 150
    center = size // 2
    
    # Create image with white background
    img = Image.new('RGB', (size, size), '#FFFFFF')
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Colors
    color_primary = '#0066FF'
    color_secondary = '#FF3366'
    color_accent = '#00FFAA'
    
    # Logo parameters
    logo_size = size - 2 * margin
    arc_radius = logo_size / 2.5
    stroke_width = logo_size / 8
    
    # Draw the two interlocking C shapes
    # First C - blue (45° to 315°)
    draw_smooth_arc(draw, (center, center), arc_radius, 
                   45, 315, stroke_width, color_primary)
    
    # Second C - pink (225° to 495°, wrapping around)
    draw_smooth_arc(draw, (center, center), arc_radius, 
                   225, 495, stroke_width, color_secondary)
    
    # Add accent dots at exchange points
    dot_radius = int(stroke_width / 4)
    
    # Calculate dot positions
    angle1 = math.radians(45)
    angle3 = math.radians(225)
    
    for angle in [angle1, angle3]:
        dot_x = center + arc_radius * math.cos(angle)
        dot_y = center + arc_radius * math.sin(angle)
        
        # Draw circle (using ellipse with same width/height)
        draw.ellipse([
            dot_x - dot_radius,
            dot_y - dot_radius,
            dot_x + dot_radius,
            dot_y + dot_radius
        ], fill=color_accent)
    
    # Save high-quality PNG
    img.save('chaoci-logo-symbol.png', 'PNG', quality=100, optimize=True)
    print("✓ Symbol PNG created: chaoci-logo-symbol.png")

def create_dark_png():
    """Create dark background version PNG"""
    size = 1200
    margin = 150
    center = size // 2
    
    # Create image with dark background
    img = Image.new('RGB', (size, size), '#0A0A0A')
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Adjusted colors for dark mode
    color_primary = '#3399FF'
    color_secondary = '#FF3366'
    color_accent = '#00FFAA'
    
    # Logo parameters
    logo_size = size - 2 * margin
    arc_radius = logo_size / 2.5
    stroke_width = logo_size / 8
    
    # Draw arcs
    draw_smooth_arc(draw, (center, center), arc_radius, 
                   45, 315, stroke_width, color_primary)
    draw_smooth_arc(draw, (center, center), arc_radius, 
                   225, 495, stroke_width, color_secondary)
    
    # Accent dots
    dot_radius = int(stroke_width / 4)
    angle1 = math.radians(45)
    angle3 = math.radians(225)
    
    for angle in [angle1, angle3]:
        dot_x = center + arc_radius * math.cos(angle)
        dot_y = center + arc_radius * math.sin(angle)
        
        draw.ellipse([
            dot_x - dot_radius,
            dot_y - dot_radius,
            dot_x + dot_radius,
            dot_y + dot_radius
        ], fill=color_accent)
    
    img.save('chaoci-logo-dark.png', 'PNG', quality=100, optimize=True)
    print("✓ Dark PNG created: chaoci-logo-dark.png")

def create_transparent_png():
    """Create transparent background version for flexible usage"""
    size = 1200
    margin = 150
    center = size // 2
    
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Colors
    color_primary = '#0066FF'
    color_secondary = '#FF3366'
    color_accent = '#00FFAA'
    
    # Logo parameters
    logo_size = size - 2 * margin
    arc_radius = logo_size / 2.5
    stroke_width = logo_size / 8
    
    # Draw arcs
    draw_smooth_arc(draw, (center, center), arc_radius, 
                   45, 315, stroke_width, color_primary)
    draw_smooth_arc(draw, (center, center), arc_radius, 
                   225, 495, stroke_width, color_secondary)
    
    # Accent dots
    dot_radius = int(stroke_width / 4)
    angle1 = math.radians(45)
    angle3 = math.radians(225)
    
    for angle in [angle1, angle3]:
        dot_x = center + arc_radius * math.cos(angle)
        dot_y = center + arc_radius * math.sin(angle)
        
        draw.ellipse([
            dot_x - dot_radius,
            dot_y - dot_radius,
            dot_x + dot_radius,
            dot_y + dot_radius
        ], fill=color_accent)
    
    img.save('chaoci-logo-transparent.png', 'PNG', quality=100, optimize=True)
    print("✓ Transparent PNG created: chaoci-logo-transparent.png")

if __name__ == "__main__":
    print("\n🎨 Generating PNG versions of Chaoci logo\n")
    create_symbol_png()
    create_dark_png()
    create_transparent_png()
    print("\n✨ All PNG versions created successfully!\n")
