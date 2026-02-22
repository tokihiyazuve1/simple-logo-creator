import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { renderToStaticMarkup } from 'react-dom/server';

import { LogoPreview } from './components/LogoPreview';
import { ControlPanel } from './components/ControlPanel';
import { PALETTES, FONTS, ICONS, ICON_MAP } from './types';
import type { LogoConfig } from './types';

import './index.css';

function App() {
  const [config, setConfig] = useState<LogoConfig>({
    name: 'My Shop',
    fontFamily: 'Inter',
    layout: 'icon-top',
    icon: 'ShoppingBag',
    bgColor: PALETTES[0].bg,
    textColor: PALETTES[0].text,
    iconColor: PALETTES[0].icon,
    iconSize: 200,
    fontSize: 100,
  });

  const [previewMode, setPreviewMode] = useState<'circle' | 'square'>('square');
  const [isDownloading, setIsDownloading] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleSuggest = () => {
    const randomPalette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];
    const randomIcon = ICONS[Math.floor(Math.random() * ICONS.length)];

    setConfig(prev => ({
      ...prev,
      bgColor: randomPalette.bg,
      textColor: randomPalette.text,
      iconColor: randomPalette.icon,
      fontFamily: randomFont,
      icon: randomIcon,
    }));
  };

  const generateSvgString = (currentConfig: LogoConfig, shape: 'square' | 'circle') => {
    const IconComponent = ICON_MAP[currentConfig.icon] || ICON_MAP['ShoppingBag'];

    const isIconOnly = currentConfig.layout === 'icon-only';
    const isTextOnly = currentConfig.layout === 'text-only';
    const isRow = currentConfig.layout === 'icon-left';

    const iconSize = currentConfig.iconSize;
    const fontSize = currentConfig.fontSize;

    const iconMarkup = renderToStaticMarkup(
      <IconComponent size={iconSize} color={currentConfig.iconColor} strokeWidth={1.5} />
    );

    let content = '';

    if (isRow) {
      // Icon-left layout: icon on the left, text on the right
      const iconX = 60;
      const iconY = 400 - iconSize / 2;
      const textX = iconX + iconSize + 24;
      const textWidth = 800 - textX - 60;

      if (!isTextOnly) {
        content += `<g transform="translate(${iconX}, ${iconY})">${iconMarkup.replace('<svg', `<svg width="${iconSize}" height="${iconSize}"`)}</g>`;
      }
      if (!isIconOnly) {
        content += `
          <foreignObject x="${textX}" y="0" width="${textWidth}" height="800">
            <div xmlns="http://www.w3.org/1999/xhtml" style="
              display: flex; align-items: center; height: 100%;
              color: ${currentConfig.textColor};
              font-family: '${currentConfig.fontFamily}', sans-serif;
              font-size: ${fontSize}px;
              font-weight: 700;
              line-height: 1.1;
              word-break: break-word;
            ">${currentConfig.name}</div>
          </foreignObject>`;
      }
    } else {
      // Icon-top / icon-only / text-only: vertically stacked, centered
      const gap = 40;
      const padding = 60;

      if (!isTextOnly) {
        const iconX = 400 - iconSize / 2;
        // Position icon in the upper portion
        const iconY = isIconOnly ? (400 - iconSize / 2) : (padding + 40);
        content += `<g transform="translate(${iconX}, ${iconY})">${iconMarkup.replace('<svg', `<svg width="${iconSize}" height="${iconSize}"`)}</g>`;
      }

      if (!isIconOnly) {
        // Position text below icon using foreignObject for wrapping
        const textTop = isTextOnly ? 0 : (padding + 40 + iconSize + gap);
        const textHeight = 800 - textTop - padding;
        content += `
          <foreignObject x="${padding}" y="${textTop}" width="${800 - padding * 2}" height="${textHeight}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="
              ${isTextOnly ? 'display: flex; align-items: center; height: 100%;' : ''}
              color: ${currentConfig.textColor};
              font-family: '${currentConfig.fontFamily}', sans-serif;
              font-size: ${fontSize}px;
              font-weight: 700;
              text-align: center;
              line-height: 1.1;
              word-break: break-word;
            ">${currentConfig.name}</div>
          </foreignObject>`;
      }
    }

    const clipDef = shape === 'circle'
      ? `<defs><clipPath id="circleClip"><circle cx="400" cy="400" r="400"/></clipPath></defs>`
      : '';
    const clipAttr = shape === 'circle' ? ' clip-path="url(#circleClip)"' : '';

    return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" viewBox="0 0 800 800" width="800" height="800">
        ${clipDef}
        <g${clipAttr}>
          <rect width="800" height="800" fill="${currentConfig.bgColor === 'transparent' ? 'none' : currentConfig.bgColor}" />
          ${content}
        </g>
      </svg>
    `.trim();
  };

  /**
   * Create an offscreen clone of the logo element at full 800x800 size,
   * outside any CSS transform, so html2canvas captures it accurately.
   */
  const captureOffscreen = async (
    targetConfig: LogoConfig,
    isTransparent: boolean
  ): Promise<HTMLCanvasElement | null> => {
    if (!logoRef.current) return null;

    // Clone the visible logo element
    const clone = logoRef.current.cloneNode(true) as HTMLElement;

    // Override styles for the target variation
    clone.style.width = '800px';
    clone.style.height = '800px';
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.transform = 'none';
    clone.style.backgroundColor = isTransparent ? 'transparent' : targetConfig.bgColor;

    // Override text & icon colors for monochrome variations
    if (targetConfig.textColor !== config.textColor) {
      const textNode = clone.querySelector('div > div') as HTMLElement;
      if (textNode) textNode.style.color = targetConfig.textColor;
    }
    // Override SVG icon color
    const svgEl = clone.querySelector('svg') as SVGElement;
    if (svgEl && targetConfig.iconColor !== config.iconColor) {
      svgEl.style.color = targetConfig.iconColor;
      svgEl.querySelectorAll('[stroke]').forEach(el => {
        el.setAttribute('stroke', targetConfig.iconColor);
      });
    }

    document.body.appendChild(clone);
    await new Promise(r => setTimeout(r, 100)); // Let browser paint

    const canvas = await html2canvas(clone, {
      backgroundColor: isTransparent ? null : targetConfig.bgColor,
      scale: 2,
      logging: false,
      width: 800,
      height: 800,
    });

    document.body.removeChild(clone);
    return canvas;
  };

  const generateVariation = async (
    targetConfig: LogoConfig,
    isTransparent: boolean,
    shape: 'square' | 'circle'
  ): Promise<{ pngBlob: Blob | null, svgString: string }> => {

    const svgString = generateSvgString(targetConfig, shape);

    const captured = await captureOffscreen(targetConfig, isTransparent);
    if (!captured) return { pngBlob: null, svgString };

    // Apply circular mask if circle mode
    let finalCanvas = captured;
    if (shape === 'circle') {
      const size = captured.width;
      const circCanvas = document.createElement('canvas');
      circCanvas.width = size;
      circCanvas.height = size;
      const ctx = circCanvas.getContext('2d')!;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(captured, 0, 0);
      finalCanvas = circCanvas;
    }

    return new Promise(resolve => {
      finalCanvas.toBlob(blob => resolve({ pngBlob: blob, svgString }), 'image/png');
    });
  };

  const handleDownload = async () => {
    if (!logoRef.current) return;
    setIsDownloading(true);

    try {
      const zip = new JSZip();

      const variations = [
        { name: 'Main', cfg: config, trans: false },
        { name: 'Transparent', cfg: { ...config, bgColor: 'transparent' }, trans: true },
        { name: 'Black', cfg: { ...config, bgColor: 'transparent', textColor: '#000000', iconColor: '#000000' }, trans: true },
        { name: 'White', cfg: { ...config, bgColor: 'transparent', textColor: '#ffffff', iconColor: '#ffffff' }, trans: true },
      ];

      const prefix = config.name.replace(/\s+/g, '_');
      const shapeSuffix = previewMode === 'circle' ? '_Circle' : '';

      for (const v of variations) {
        const { pngBlob, svgString } = await generateVariation(v.cfg, v.trans, previewMode);
        if (pngBlob) zip.file(`${prefix}_${v.name}${shapeSuffix}.png`, pngBlob);
        zip.file(`${prefix}_${v.name}${shapeSuffix}.svg`, svgString);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${config.name.replace(/\s+/g, '_')}_Logos.zip`);
    } catch (e) {
      console.error('Export failed', e);
      alert('Failed to generate export bundle.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 480px',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Left — Preview */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}>
        <LogoPreview config={config} previewMode={previewMode} logoRef={logoRef} />
      </div>

      {/* Right — Controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '24px 28px',
        overflowY: 'auto',
        gap: '12px',
      }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '4px', fontWeight: 800 }}>Logo Creator</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0' }}>
            Generate profile pictures for TikTok or Shopee.
          </p>
        </div>
        <ControlPanel
          config={config}
          setConfig={setConfig}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          onSuggest={handleSuggest}
          onDownload={handleDownload}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  );
}

export default App;
