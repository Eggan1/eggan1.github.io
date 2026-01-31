---
layout: post
title: EcoBox Smart Display
description: A sustainable, low-power information dashboard. This project integrates a Raspberry Pi Zero 2 W with a 7.5" E-Ink display, featuring a custom AutoCAD-designed enclosure and a Python image-processing pipeline.
skills: 
  - AutoCAD
  - Python
  - Hardware Integration
  - Raspberry Pi
  - Image Processing
  - Thermal Management

main-image: /_projects/eco-box/design.png
---

## Project Overview
The EcoBox was designed to provide a "distraction-free" data dashboard. The main engineering challenges involved managing tight tolerances for the E-Ink ribbon cables and developing a software solution to map web content into a 3-color (Black, White, Yellow) palette.

---

## Build Gallery
### Design & Assembly
{% include image-gallery.html images="autocard-design.png, final-build.png" height="400" %}
<span style="font-size: 10px">1. AutoCAD chassis design | 3. Final display output</span>



---

## Technical Implementation

### Mechanical Engineering
Using **AutoCAD**, I designed a custom frame to house the **Waveshare 7.5" E-Ink HAT**. 
- **Tolerance Design:** Created specific offsets for the display bezel to prevent pressure on the fragile E-Ink glass substrate.
- **Cable Management:** Integrated internal routing channels to protect the GPIO connections and ribbon cables.

### Software Architecture
The display requires a specific 1-bit color depth for three distinct layers (Black, White, and Yellow). I developed a **Python** script to fetch web data and convert it using the following logic:

```python
def update_display():
    # Fetch web content
    # Process image for 3-color palette
    # Push to Waveshare driver
    print("EcoBox Updated Successfully")
