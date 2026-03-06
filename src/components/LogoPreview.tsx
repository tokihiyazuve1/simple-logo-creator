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
        case 'emboss':
            return {
                text: {
                    textShadow: `-2px -2px 0px rgba(255,255,255,0.4), 2px 2px 4px rgba(0,0,0,0.5)`,
                },
                icon: {
                    filter: 'drop-shadow(-2px -2px 0px rgba(255,255,255,0.4)) drop-shadow(2px 2px 3px rgba(0,0,0,0.5))',
                },
            };
        case 'retro': {
            // Layered warm-toned shadows in retro palette
            return {
                text: {
                    textShadow: `3px 3px 0px #e8985a, 6px 6px 0px #c75d3a, 9px 9px 0px #8b3a2a`,
                },
                icon: {
                    filter: 'drop-shadow(3px 3px 0px #e8985a) drop-shadow(3px 3px 0px #c75d3a) drop-shadow(3px 3px 0px #8b3a2a)',
                },
            };
        }
        case 'neon': {
            // Intense neon sign — sharper inner, wider outer glow
            return {
                text: {
                    textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${c}, 0 0 82px ${c}, 0 0 92px ${c}`,
                    color: '#ffffff',
                },
                icon: {
                    filter: `brightness(1.5) drop-shadow(0 0 7px ${t}) drop-shadow(0 0 20px ${t}) drop-shadow(0 0 40px ${t})`,
                },
            };
        }
        case '3d-extrude': {
            // Generate many 1px offset shadows to create solid 3D block
            const layers = 12;
            const textShadows = Array.from({ length: layers }, (_, i) =>
                `${i + 1}px ${i + 1}px 0px rgba(0,0,0,${0.6 - i * 0.03})`
            ).join(', ');
            return {
                text: { textShadow: textShadows },
                icon: {
                    filter: Array.from({ length: 4 }, (_, i) =>
                        `drop-shadow(${(i + 1) * 3}px ${(i + 1) * 3}px 0px rgba(0,0,0,${0.5 - i * 0.1}))`
                    ).join(' '),
                },
            };
        }
        case 'long-shadow': {
            // Dramatic diagonal shadow stretching far
            const longShadows = Array.from({ length: 30 }, (_, i) =>
                `${i + 1}px ${i + 1}px 0px rgba(0,0,0,${0.3 - i * 0.01})`
            ).join(', ');
            return {
                text: { textShadow: longShadows },
                icon: {
                    filter: Array.from({ length: 6 }, (_, i) =>
                        `drop-shadow(${(i + 1) * 4}px ${(i + 1) * 4}px 0px rgba(0,0,0,${0.25 - i * 0.04}))`
                    ).join(' '),
                },
            };
        }
        case 'double-stroke':
            return {
                text: {
                    WebkitTextStroke: `2px ${c}`,
                    paintOrder: 'stroke fill',
                    textShadow: `0 0 0 ${t}, 3px 3px 0px ${c}`,
                },
                icon: {
                    filter: `drop-shadow(0 0 0px ${t}) drop-shadow(2px 2px 0px ${c})`,
                    strokeWidth: 2.5,
                },
            };
        case 'vintage':
            return {
                text: {
                    textShadow: `2px 2px 0px rgba(139,90,43,0.5), -1px -1px 0px rgba(210,180,140,0.3)`,
                    opacity: 0.9,
                },
                icon: {
                    filter: 'sepia(0.5) saturate(0.8) drop-shadow(2px 2px 0px rgba(139,90,43,0.4))',
                    opacity: 0.9,
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
