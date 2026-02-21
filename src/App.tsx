import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { renderToStaticMarkup } from 'react-dom/server';
import * as LucideIcons from 'lucide-react';

import { LogoPreview } from './components/LogoPreview';
import { ControlPanel } from './components/ControlPanel';
import { PALETTES, FONTS, ICONS } from './types';
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

  const generateSvgString = (currentConfig: LogoConfig) => {
    const IconComponent = (LucideIcons as any)[currentConfig.icon] || LucideIcons.ShoppingBag;

    const isIconOnly = currentConfig.layout === 'icon-only';
    const isTextOnly = currentConfig.layout === 'text-only';
    const isRow = currentConfig.layout === 'icon-left';

    const iconSize = currentConfig.iconSize;
    const fontSize = currentConfig.fontSize;

    // Render the Lucide icon to an SVG string
    const iconMarkup = renderToStaticMarkup(
      <IconComponent size={iconSize} color={currentConfig.iconColor} strokeWidth={1.5} />
    );

    // Extract inner contents of the Lucide SVG to embed it easily
    // const innerIconMatch = iconMarkup.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);

    // SVG coordinates must match the React DOM layout closely
    // 800 center is 400.
    // If row: tighter gap means icon is less far left, text is less far right.
    const gap = 24;

    // Approximate total width of icon + gap + text (very rough estimate since text width varies)
    // Let's just hardcode a visual center that looks better than before.
    const textY = isRow ? 400 + (fontSize * 0.35) : (isIconOnly ? 0 : 580);
    const textX = isRow ? 440 - (gap / 2) : 400; // Shift text left slightly
    const iconY = isRow ? 400 - (iconSize / 2) : (isTextOnly ? 0 : 220);
    const iconX = isRow ? 160 + (gap / 2) : (400 - (iconSize / 2)); // Shift icon right slightly

    let content = '';

    if (!isTextOnly) {
      content += `<g transform="translate(${iconX}, ${iconY})">${iconMarkup.replace('<svg', `<svg width="${iconSize}" height="${iconSize}"`)
        }</g>`;
    }

    if (!isIconOnly) {
      content += `
        <text 
          x="${textX}" 
          y="${textY}" 
          font-family="${currentConfig.fontFamily}, sans-serif" 
          font-size="${fontSize}px" 
          font-weight="bold" 
          fill="${currentConfig.textColor}" 
          text-anchor="${isRow ? 'start' : 'middle'}"
        >
          ${currentConfig.name}
        </text>
      `;
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
        <rect width="800" height="800" fill="${currentConfig.bgColor === 'transparent' ? 'none' : currentConfig.bgColor}" />
        ${content}
      </svg>
    `.trim();
  };

  const generateVariation = async (
    targetConfig: LogoConfig,
    forcedRef: React.RefObject<HTMLDivElement | null>,
    isTransparent: boolean
  ): Promise<{ pngBlob: Blob | null, svgString: string }> => {

    // Temporarily apply the target config to the DOM ref for html2canvas
    if (!forcedRef.current) return { pngBlob: null, svgString: '' };

    const el = forcedRef.current;
    const originalBg = el.style.backgroundColor;

    // SVG is pure data driven, so we can generate it immediately
    const svgString = generateSvgString(targetConfig);

    // For PNG, we update DOM
    el.style.backgroundColor = isTransparent ? 'transparent' : targetConfig.bgColor;

    if (targetConfig.textColor !== config.textColor) {
      // Deep traverse to force colors for monochrome
      const textNode = Array.from(el.children).find(c => c.tagName === 'DIV') as HTMLElement;
      if (textNode) textNode.style.color = targetConfig.textColor;

      const svgNode = Array.from(el.children).find(c => c.tagName === 'svg') as HTMLElement;
      if (svgNode) svgNode.style.color = targetConfig.iconColor; // Lucide uses currentColor sometimes
    }

    // Small delay to ensure DOM paints
    await new Promise(r => setTimeout(r, 50));

    const canvas = await html2canvas(el, {
      backgroundColor: isTransparent ? null : targetConfig.bgColor,
      scale: 2, // 1600x1600 output for crispness
      logging: false,
    });

    // Reset DOM
    el.style.backgroundColor = originalBg;
    if (targetConfig.textColor !== config.textColor) {
      const textNode = Array.from(el.children).find(c => c.tagName === 'DIV') as HTMLElement;
      if (textNode) textNode.style.color = config.textColor; // REVERT to current config, not originalColor which is empty string
      const svgNode = Array.from(el.children).find(c => c.tagName === 'svg') as HTMLElement;
      if (svgNode) svgNode.style.color = config.iconColor;
    }

    return new Promise(resolve => {
      canvas.toBlob(blob => resolve({ pngBlob: blob, svgString }), 'image/png');
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

      for (const v of variations) {
        const { pngBlob, svgString } = await generateVariation(v.cfg, logoRef, v.trans);
        if (pngBlob) zip.file(`${config.name.replace(/\s+/g, '_')}_${v.name}.png`, pngBlob);
        zip.file(`${config.name.replace(/\s+/g, '_')}_${v.name}.svg`, svgString);
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '64px',
      padding: '40px',
      flexWrap: 'wrap'
    }}>
      <LogoPreview config={config} previewMode={previewMode} logoRef={logoRef} />

      <div style={{ width: '400px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', fontWeight: 800 }}>Logo Creator</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Instantly generate profile pictures for your TikTok or Shopee store.
        </p>
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
