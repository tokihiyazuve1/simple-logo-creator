# Simple Logo Creator

A lightning-fast, local-only web application for generating premium profile pictures, specifically optimized for TikTok and Shopee stores.

## Features
*   **Live Instant Preview:** See your logo update in real-time as you tweak names, fonts, and colors.
*   **Platform-Specific Previews:** Toggle between a standard Square view and a Circular Crop view to ensure your text isn't cut off on mobile apps like TikTok or Shopee.
*   **Extensive Customization:** Choose from 11 premium Google Fonts and dynamically color-pick your background, text, and icons.
*   **One-Click "Brand Kit" Export:** Clicking "Download" instantly generates a `.zip` file containing 8 variations of your design:
    *   Main Color (PNG + SVG)
    *   Transparent Background (PNG + SVG)
    *   Monochrome Black (PNG + SVG)
    *   Monochrome White (PNG + SVG)

## Tech Stack
*   **Runtime:** Node.js / Bun
*   **Framework:** React 19 (scaffolding via Vite)
*   **Language:** TypeScript
*   **Styling:** Vanilla CSS (Glassmorphism & Modern UI)
*   **Libraries:** 
    *   `lucide-react` (Icons)
    *   `html2canvas` (Rasterizing DOM to PNG)
    *   `jszip` & `file-saver` (Bundling exports)

## How to Run Locally

Since this tool handles file generation entirely in your browser, no backend server or database is required.

1.  Make sure you have [Bun](https://bun.sh/) installed.
2.  Open this directory in your terminal.
3.  Install dependencies (if not already done):
    ```bash
    bun install
    ```
4.  Start the development server:
    ```bash
    bun run dev
    ```
5.  Open your browser to `http://localhost:3500`.
