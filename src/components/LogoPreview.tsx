import type { LogoConfig } from '../types';
import { ICON_MAP } from '../types';
import type { CSSProperties } from 'react';

interface Props {
    config: LogoConfig;
    previewMode: 'square' | 'circle';
    logoRef?: React.RefObject<HTMLDivElement | null>;
}

/** Returns CSS styles for text and icon based on the selected logo style */
function getStyleEffects(config: LogoConfig): { text: CSSProperties; icon: CSSProperties } {
    const s = config.logoStyle;
    const c = config.iconColor;
    const t = config.textColor;

    switch (s) {
        case 'neo-brutal':
            return {
                text: {
                    WebkitTextStroke: '3px #1a1a1a',
                    paintOrder: 'stroke fill',
                    textShadow: '5px 5px 0px #1a1a1a',
                },
                icon: {
                    filter: 'drop-shadow(5px 5px 0px #1a1a1a)',
                    strokeWidth: 2.5,
                },
            };
        case 'outlined':
            return {
                text: {
                    WebkitTextStroke: `3px ${t}`,
                    color: 'transparent',
                    paintOrder: 'stroke fill',
                },
                icon: {
                    color: 'transparent',
                    stroke: c,
                    strokeWidth: 2,
                    filter: 'none',
                },
            };
        case 'shadow-pop':
            return {
                text: {
                    textShadow: `6px 6px 0px ${c}`,
                },
                icon: {
                    filter: `drop-shadow(6px 6px 0px ${t})`,
                },
            };
        case 'sticker':
            return {
                text: {
                    WebkitTextStroke: '8px #ffffff',
                    paintOrder: 'stroke fill',
                    filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.15))',
                },
                icon: {
                    filter: 'drop-shadow(0px 0px 0px #ffffff) drop-shadow(0px 0px 0px #ffffff) drop-shadow(0px 0px 8px #ffffff) drop-shadow(2px 2px 0px rgba(0,0,0,0.15))',
                },
            };
        case 'glow':
            return {
                text: {
                    textShadow: `0 0 20px ${c}, 0 0 40px ${c}, 0 0 60px ${c}`,
                },
                icon: {
                    filter: `drop-shadow(0 0 12px ${t}) drop-shadow(0 0 24px ${t})`,
                },
            };
        case 'clean':
        default:
            return { text: {}, icon: {} };
    }
}

export const LogoPreview: React.FC<Props> = ({ config, previewMode, logoRef }) => {
    const IconComponent = ICON_MAP[config.icon] || ICON_MAP['ShoppingBag'];
    const effects = getStyleEffects(config);

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
                gap: config.layout === 'icon-left' ? '24px' : '40px',
                padding: '60px',
                fontFamily: `"${config.fontFamily}", sans-serif`,
                boxSizing: 'border-box' as const,
            }}
        >
            {config.layout !== 'text-only' && (
                <div style={effects.icon}>
                    <IconComponent
                        size={config.iconSize}
                        color={config.logoStyle === 'outlined' ? 'transparent' : config.iconColor}
                        strokeWidth={config.logoStyle === 'outlined' ? 2 : 1.5}
                        stroke={config.iconColor}
                    />
                </div>
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
                        ...effects.text,
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
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    width: '800px',
                    height: '800px',
                }}
            >
                {logoContent}
            </div>
        </div>
    );
};
