#!/bin/bash
# Create placeholder images using ImageMagick (if available) or simple files

# Check if ImageMagick is available
if command -v convert &> /dev/null; then
    # Home hero image - fuel truck at construction site
    convert -size 2000x1333 gradient:darkgreen-lightgreen \
        -pointsize 60 -fill white -gravity center \
        -annotate +0+0 'Penley Oil Fuel Delivery\nTruck at Construction Site' \
        home-hero-1.jpg
    
    # Emergency fueling image
    convert -size 1600x1067 gradient:darkblue-lightblue \
        -pointsize 50 -fill white -gravity center \
        -annotate +0+0 '24/7 Emergency\nFuel Delivery' \
        home-emergency-1.jpg
else
    # Create simple text files as placeholders
    echo "Placeholder: Penley Oil fuel delivery truck at construction site (2000x1333)" > home-hero-1.jpg
    echo "Placeholder: Emergency fuel delivery truck (1600x1067)" > home-emergency-1.jpg
fi

echo "Placeholder images created in $(pwd)"
