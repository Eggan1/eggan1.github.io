---
layout: post
title: EcoBox
description: Low-power E-Ink dashboard using Raspberry Pi Zero 2 W and Waveshare 7.5" display. Features custom CAD-designed housing and a 3-color image processing pipeline.
skills: 
  - AutoCAD (Tolerance Design)
  - Python / Image Processing
  - Hardware Integration
  - Raspberry Pi / Linux
main-image: /_projects/eco-box/ecobox-hero.png
---

# EcoBox: E-Ink Information Dashboard

## 🌿 Project Overview
EcoBox is a sustainable, low-power smart display designed to show live web data on a 7.5-inch E-Ink screen. The challenge was twofold: designing a frame with precise tolerances for delicate ribbon cables and creating a software bridge for the 3-color display limitation.

## ⚙️ Technical Deep Dive

### 1. Mechanical Design (AutoCAD)
* Designed the frame specifically for the **Waveshare 7.5-inch E-Ink HAT**.
* **Tolerance Engineering:** Calculated exact offsets for the display bezel and internal routing to protect the fragile E-Ink ribbon cable and the Pi Zero 2 W mounting points.

### 2. Software Pipeline & Color Mapping
* **The Constraint:** The display only supports **Black, White, and Yellow**.
* **The Solution:** Developed a Python pipeline to capture web views and convert them into the specific 3-color bit depth required by the Waveshare driver.

---

## 📸 Build Gallery
<details>
<summary><b>View Build Photos & CAD Renders (Click to Expand)</b></summary>

| CAD Design | Physical Assembly |
| :---: | :---: |
| ![CAD Render](/_projects/eco-box/autocad-design.png) | ![Final Build](/_projects/eco-box/final-build.png) |

</details>

---

## 🔧 Hardware Stack
* **Controller:** Raspberry Pi Zero 2 W
* **Display:** Waveshare 7.5" E-Ink HAT (V3)
* **Power:** Micro-USB (Optimized for low-draw idle states)
