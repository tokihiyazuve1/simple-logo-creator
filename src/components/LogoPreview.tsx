import type { LogoConfig, BgPattern, BadgeShape } from '../types';
import { ICON_MAP } from '../types';
import type { CSSProperties } from 'react';

interface Props {
    config: LogoConfig;
    previewMode: 'square' | 'circle';
    logoRef?: React.RefObject<HTMLDivElement | null>;
}

/** Returns CSS background-image for the selected pattern */
function getPatternCSS(pattern: BgPattern, color: string): CSSProperties {
    // Use a semi-transparent version of the text color for patterns
    const pc = color + '18'; // ~10% opacity hex

    switch (pattern) {
        case 'dots':
            return { backgroundImage: `radial-gradient(${pc} 1.5px, transparent 1.5px)`, backgroundSize: '20px 20px' };
        case 'polka':
            return { backgroundImage: `radial-gradient(${pc} 6px, transparent 6px)`, backgroundSize: '40px 40px' };
        case 'diagonal-stripes':
            return { backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${pc} 10px, ${pc} 12px)` };
        case 'horizontal-stripes':
            return { backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 14px, ${pc} 14px, ${pc} 16px)` };
        case 'grid':
            return { backgroundImage: `linear-gradient(${pc} 1px, transparent 1px), linear-gradient(90deg, ${pc} 1px, transparent 1px)`, backgroundSize: '30px 30px' };
        case 'checkerboard':
            return {
                backgroundImage: `linear-gradient(45deg, ${pc} 25%, transparent 25%), linear-gradient(-45deg, ${pc} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${pc} 75%), linear-gradient(-45deg, transparent 75%, ${pc} 75%)`,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
            };
        case 'cross-hatch':
            return { backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, ${pc} 8px, ${pc} 9px), repeating-linear-gradient(-45deg, transparent, transparent 8px, ${pc} 8px, ${pc} 9px)` };
        case 'diamond-grid':
            return { backgroundImage: `repeating-linear-gradient(45deg, ${pc} 0, ${pc} 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, ${pc} 0, ${pc} 1px, transparent 0, transparent 50%)`, backgroundSize: '30px 30px' };
        case 'zigzag':
            return { backgroundImage: `linear-gradient(135deg, ${pc} 25%, transparent 25%), linear-gradient(225deg, ${pc} 25%, transparent 25%), linear-gradient(315deg, ${pc} 25%, transparent 25%), linear-gradient(45deg, ${pc} 25%, transparent 25%)`, backgroundSize: '30px 30px', backgroundPosition: '0 0, 15px 0, 15px -15px, 0px 15px' };
        case 'none':
        default:
            return {};
    }
}

/** Returns SVG path for badge shapes, centered at 400,400 */
function getBadgeSVG(shape: BadgeShape, color: string): React.ReactNode {
    if (shape === 'none') return null;

    const stroke = color;
    const sw = 6;
    const fill = 'none';
    const common = { stroke, strokeWidth: sw, fill, opacity: 0.8 };

    switch (shape) {
        case 'circle':
            return <circle cx="400" cy="400" r="330" {...common} />;
        case 'rounded-square':
            return <rect x="70" y="70" width="660" height="660" rx="60" {...common} />;
        case 'hexagon':
            return <polygon points="400,50 720,200 720,600 400,750 80,600 80,200" {...common} />;
        case 'shield':
            return <path d="M400,60 L700,180 L700,480 Q700,680 400,760 Q100,680 100,480 L100,180 Z" {...common} />;
        case 'diamond':
            return <polygon points="400,60 720,400 400,740 80,400" {...common} />;
        case 'oval':
            return <ellipse cx="400" cy="400" rx="340" ry="300" {...common} />;
        case 'octagon':
            return <polygon points="270,60 530,60 740,270 740,530 530,740 270,740 60,530 60,270" {...common} />;
        case 'star': {
            const pts = Array.from({ length: 10 }, (_, i) => {
                const angle = (Math.PI / 5) * i - Math.PI / 2;
                const r = i % 2 === 0 ? 340 : 170;
                return `${400 + r * Math.cos(angle)},${400 + r * Math.sin(angle)}`;
            }).join(' ');
            return <polygon points={pts} {...common} />;
        }
        case 'ribbon':
            return <path d="M120,160 L680,160 L720,400 L680,640 L120,640 L80,400 Z" {...common} />;
        default:
            return null;
    }
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
                text: { textShadow: `6px 6px 0px ${c}` },
                icon: { filter: `drop-shadow(6px 6px 0px ${t})` },
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
                text: { textShadow: `0 0 20px ${c}, 0 0 40px ${c}, 0 0 60px ${c}` },
                icon: { filter: `drop-shadow(0 0 12px ${t}) drop-shadow(0 0 24px ${t})` },
            };
        case 'emboss':
            return {
                text: { textShadow: `-2px -2px 0px rgba(255,255,255,0.4), 2px 2px 4px rgba(0,0,0,0.5)` },
                icon: { filter: 'drop-shadow(-2px -2px 0px rgba(255,255,255,0.4)) drop-shadow(2px 2px 3px rgba(0,0,0,0.5))' },
            };
        case 'retro':
            return {
                text: { textShadow: `3px 3px 0px #e8985a, 6px 6px 0px #c75d3a, 9px 9px 0px #8b3a2a` },
                icon: { filter: 'drop-shadow(3px 3px 0px #e8985a) drop-shadow(3px 3px 0px #c75d3a) drop-shadow(3px 3px 0px #8b3a2a)' },
            };
        case 'neon':
            return {
                text: {
                    textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${c}, 0 0 82px ${c}, 0 0 92px ${c}`,
                    color: '#ffffff',
                },
                icon: { filter: `brightness(1.5) drop-shadow(0 0 7px ${t}) drop-shadow(0 0 20px ${t}) drop-shadow(0 0 40px ${t})` },
            };
        case '3d-extrude': {
            const ts = Array.from({ length: 12 }, (_, i) => `${i + 1}px ${i + 1}px 0px rgba(0,0,0,${0.6 - i * 0.03})`).join(', ');
            return {
                text: { textShadow: ts },
                icon: { filter: Array.from({ length: 4 }, (_, i) => `drop-shadow(${(i + 1) * 3}px ${(i + 1) * 3}px 0px rgba(0,0,0,${0.5 - i * 0.1}))`).join(' ') },
            };
        }
        case 'long-shadow': {
            const ls = Array.from({ length: 30 }, (_, i) => `${i + 1}px ${i + 1}px 0px rgba(0,0,0,${0.3 - i * 0.01})`).join(', ');
            return {
                text: { textShadow: ls },
                icon: { filter: Array.from({ length: 6 }, (_, i) => `drop-shadow(${(i + 1) * 4}px ${(i + 1) * 4}px 0px rgba(0,0,0,${0.25 - i * 0.04}))`).join(' ') },
            };
        }
        case 'double-stroke':
            return {
                text: { WebkitTextStroke: `2px ${c}`, paintOrder: 'stroke fill', textShadow: `0 0 0 ${t}, 3px 3px 0px ${c}` },
                icon: { filter: `drop-shadow(0 0 0px ${t}) drop-shadow(2px 2px 0px ${c})`, strokeWidth: 2.5 },
            };
        case 'vintage':
            return {
                text: { textShadow: `2px 2px 0px rgba(139,90,43,0.5), -1px -1px 0px rgba(210,180,140,0.3)`, opacity: 0.9 },
                icon: { filter: 'sepia(0.5) saturate(0.8) drop-shadow(2px 2px 0px rgba(139,90,43,0.4))', opacity: 0.9 },
            };
        case 'clean':
        default:
            return { text: {}, icon: {} };
    }
}

/** Map letterSpacing config to CSS value */
function getLetterSpacingPx(ls: string): string {
    switch (ls) {
        case 'tight': return '-0.03em';
        case 'wide': return '0.12em';
        case 'ultra-wide': return '0.3em';
        case 'normal':
        default: return '0';
    }
}

export const LogoPreview: React.FC<Props> = ({ config, previewMode, logoRef }) => {
    const IconComponent = ICON_MAP[config.icon] || ICON_MAP['ShoppingBag'];
    const effects = getStyleEffects(config);
    const patternCSS = getPatternCSS(config.bgPattern, config.textColor);

    const logoContent = (
        <div
            ref={logoRef}
            style={{
                width: '800px',
                height: '800px',
                backgroundColor: config.bgColor,
                ...patternCSS,
                display: 'flex',
                flexDirection: config.layout === 'icon-left' ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: config.layout === 'icon-left' ? '24px' : '40px',
                padding: '60px',
                fontFamily: `"${config.fontFamily}", sans-serif`,
                boxSizing: 'border-box' as const,
                position: 'relative' as const,
            }}
        >
            {/* Badge shape SVG overlay */}
            {config.badgeShape !== 'none' && (
                <svg
                    viewBox="0 0 800 800"
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        pointerEvents: 'none',
                    }}
                >
                    {getBadgeSVG(config.badgeShape, config.textColor)}
                </svg>
            )}

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
                        textTransform: config.textCase === 'none' ? undefined : config.textCase,
                        letterSpacing: getLetterSpacingPx(config.letterSpacing),
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
