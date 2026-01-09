
# 🧬 TOM BodyVisualizer

**An interactive, high-fidelity biometric projection engine.**

TOM BodyVisualizer is a professional-grade visualization tool that transforms biometric data into realistic anatomical projections. It utilizes precision SVG morphing and WebGL 3D rendering to help users visualize body composition changes in real-time.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg)
![Three.js](https://img.shields.io/badge/Three.js-r170-000000.svg)

---

## ✨ Core Features

### 1. High-Fidelity Visualization
*   **2.5D Blueprint Engine**: Precision-crafted SVG paths that morph organically to represent different BMI categories.
*   **3D Volumetric Scan**: A full 3D mannequin that scales depth and width independently to simulate realistic body volume.

### 2. Anatomical Intelligence
*   **Gender-Specific Distribution**: The engine recognizes the difference between **Android (Apple-shaped)** and **Gynoid (Pear-shaped)** fat distribution patterns.
*   **Dynamic Morphing**: Adjusting weight doesn't just "scale" the image; it intelligently adds volume to specific anatomical regions (abdomen, hips, chest, neck).

### 3. Biometric Analysis
*   **Real-Time BMI Tracking**: Instant HUD updates as you adjust parameters.
*   **Ideal Weight Range**: Built-in calculators for healthy weight benchmarks based on biometric standards.

---

## 🛠️ Technical Stack

- **Frontend**: React 19 (Hooks, Functional Components, UseMemo for performance)
- **3D Graphics**: Three.js (WebGL Renderer, Phong Materials, Custom non-uniform scaling)
- **Styling**: Tailwind CSS (Glassmorphism, Responsive Grid System)
- **Deployment**: Vite + GitHub Actions (Automated CI/CD)

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tom-body-visualizer.git
   cd tom-body-visualizer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

---

## 📋 Use Cases
*   **Fitness Tracking**: Visually set "Target Weight" goals to see a projection of your future physique.
*   **Health Education**: A visual aid for clinicians to explain BMI and body fat distribution to patients.
*   **Digital Health Apps**: A reference implementation for body-positive health visualization.

---

## ⚖️ License & Credits
Designed and Developed with ❤️ by **Md. Hassanul Hossain Tomal**.

© 2025 All Rights Reserved.

*Disclaimer: This software is for visualization purposes only. It is not a medical device and should not be used for clinical diagnosis.*
