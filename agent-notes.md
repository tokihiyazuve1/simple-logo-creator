# Agent Notes & Project Context

**Target Audience for these notes:** Future AI Agents working on this project. Read this file alongside `README.md` and `progress.log` to immediately understand the architecture and user constraints without needing to read the entire codebase.

## 1. Project Constraints & Philosophy
*   **Local Only:** The user explicitly requested this tool ONLY be used locally by them for their own stores. Do NOT introduce external databases, backend API routes (like Next.js API), or complex deployment scripts unless requested.
*   **Design First:** The user values premium, modern aesthetics. The CSS uses glassmorphism and subtle animations. Do not revert to basic unstyled HTML.
*   **Platform Specific:** The primary use case is generating avatars for TikTok and Shopee. These platforms use circular crops. The UI has a toggle to preview this crop.

## 2. Architecture & File Structure
This is a standard Vite React SPA (Single Page Application).
*   `src/index.css`: Contains ALL styling. It acts as a mini design system with CSS variables. Do not use Tailwind; vanilla CSS was chosen for this project based on user rules.
*   `src/types.ts`: Holds the `LogoConfig` interface and all constants (Available Fonts, Icons, and predefined Color Palettes). If adding new fonts or icons, add them here *and* update the Google Fonts import in `index.css` if necessary.
*   `src/components/ControlPanel.tsx`: The left-side UI panel. It takes the state and a `setConfig` dispatcher.
*   `src/components/LogoPreview.tsx`: The right-side visual preview. It receives a `ref` from `App.tsx` which is crucial for the export pipeline.
*   `src/App.tsx`: The heart of the application. Manages state and houses the complex `html2canvas` and JSZip export logic.

## 3. The Export Pipeline (Crucial Context)
When the user clicks "Download All", we generate 8 files instantly (4 PNGs, 4 SVGs) inside a `MyShop_Logos.zip`. 
*   **PNG Generation:** We use `html2canvas` directly on the `LogoPreview` DOM element. We dynamically change the DOM element's background color and text color (via a temporary forced ref update), wait 50ms for the Browser to paint, capture the canvas, then revert the DOM. 
*   **SVG Generation:** We do *not* use html2canvas for SVGs. Because `lucide-react` uses SVGs natively, we use `renderToStaticMarkup` on the Lucide icon, grab its inner paths, and manually construct a raw `<svg>` string combining the icon and the custom text using the selected Google Font. This ensures the SVG is a true, editable vector graphic and not just a base64 raster embedded in an SVG wrapper.
*   *Warning:* When editing `App.tsx`, be very careful modifying `generateVariation` or `generateSvgString` as the DOM manipulation logic for exports is tightly coupled to the structure of `LogoPreview.tsx`.

## 4. Current State
The app is fully functional and running locally on port `3500`. No known bugs. The user is currently satisfied with the core functionality.
