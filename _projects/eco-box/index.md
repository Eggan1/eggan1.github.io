---
layout: post
title: EcoBox Smart Display
description: Low-power E-Ink dashboard using Raspberry Pi Zero 2 W and Waveshare 7.5" display. Features custom CAD-designed housing and a 3-color image processing pipeline.
skills: 
  - AutoCAD
  - Python
  - Hardware Integration
  - Raspberry Pi
main-image: /_projects/eco-box/DAD.png
---

# EcoBox: E-Ink Information Dashboard

## 🌿 Project Overview
EcoBox is a sustainable, low-power smart display designed to show live web data on a 7.5-inch E-Ink screen. This project required precise mechanical tolerances and a custom software bridge to handle the 3-color display limitation.

## ⚙️ Technical Deep Dive

### 1. Mechanical Design
* Developed the housing using **AutoCAD**, ensuring a high-precision fit for the **Waveshare 7.5-inch E-Ink HAT**.
* Engineered internal routing to protect the delicate ribbon cables from the **Raspberry Pi Zero 2 W**.

### 2. Software Pipeline
* Created a Python-based image processing script to map standard web content into a **3-color (Black/White/Yellow)** bit-depth.
* Optimized refresh cycles to prevent ghosting on the E-Ink panel.

---

## 📸 Build Gallery
<details>
<summary><b>View Build Photos & CAD Renders (Click to Expand)</b></summary>

| 1. AutoCAD Design | 2. Component Wiring | 3. Final Build |
| :---: | :---: | :---: |
| ![CAD Drawing](/_projects/eco-box/autocard-design.png) | ![Wiring Detail](/_projects/eco-box/final-build.png) | ![Finished Box](/_projects/eco-box/DAD.png) |

</details>

---

## 🔧 Hardware Stack
* **Controller:** Raspberry Pi Zero 2 W
* **Display:** Waveshare 7.5" E-Ink HAT (V3)
* **Design Tool:** AutoCAD
