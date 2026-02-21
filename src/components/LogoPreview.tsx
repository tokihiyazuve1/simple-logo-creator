import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LogoConfig } from '../types';

interface Props {
    config: LogoConfig;
    previewMode: 'square' | 'circle';
    // This ref is passed down so we can capture the raw logo div ignoring the preview crop container
    logoRef?: React.RefObject<HTMLDivElement | null>;
}

export const LogoPreview: React.FC<Props> = ({ config, previewMode, logoRef }) => {
    const IconComponent = (LucideIcons as any)[config.icon] || LucideIcons.ShoppingBag;

    // The actual 800x800 logo container. This is what gets captured by html2canvas.
    const logoContent = (
        <div
            ref={logoRef}
            style={{
                width: '800px',
                height: '800px',
                backgroundColor: config.bgColor,
                display: 'flex',
                flexDirection: config.layout === 'icon-left' ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: config.layout === 'icon-left' ? '24px' : '40px', // Tighter gap for row layout
                padding: '60px',
                fontFamily: `"${config.fontFamily}", sans-serif`,
                boxSizing: 'border-box',
            }}
        >
            {config.layout !== 'text-only' && (
                <IconComponent
                    size={config.iconSize}
                    color={config.iconColor}
                    strokeWidth={1.5}
                />
            )}

            {config.layout !== 'icon-only' && (
                <div
                    style={{
                        color: config.textColor,
                        fontSize: `${config.fontSize}px`,
                        fontWeight: 700,
                        textAlign: 'center',
                        lineHeight: 1.1,
                        wordBreak: 'break-word',
                    }}
                >
                    {config.name || 'My Shop'}
                </div>
            )}
        </div>
    );

    return (
        <div className="preview-container">
            <div
                className={`preview-scaler ${previewMode === 'circle' ? 'circle-crop' : ''}`}
                style={{
                    // We scale the 800x800 down to fit nicely in the UI (e.g., 400x400)
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    width: '800px',
                    height: '800px',
                }}
            >
                {logoContent}
            </div>

            <style>{`
        .preview-container {
          width: 400px;
          height: 400px;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAHUlEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAAAxG8v8Rofxt0AAAAASUVORK5CYII=');
          border-radius: ${previewMode === 'circle' ? '50%' : '16px'};
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-radius 0.3s ease;
        }
        .preview-scaler.circle-crop {
          border-radius: 50%;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};
