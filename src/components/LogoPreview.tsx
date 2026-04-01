import type { LogoConfig, BadgeShape } from '../types';
import { ICON_MAP } from '../types';
import type { CSSProperties } from 'react';

interface Props {
    config: LogoConfig;
    previewMode: 'square' | 'circle';
    logoRef?: React.RefObject<HTMLDivElement | null>;
}

/** Returns CSS background-image for the selected pattern */
function getPatternCSS(pattern: string, color: string): CSSProperties {
    const pc = color + '18';
    switch (pattern) {
        case 'dots': return { backgroundImage: `radial-gradient(${pc} 1.5px, transparent 1.5px)`, backgroundSize: '20px 20px' };
        case 'polka': return { backgroundImage: `radial-gradient(${pc} 6px, transparent 6px)`, backgroundSize: '40px 40px' };
        case 'diagonal-stripes': return { backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${pc} 10px, ${pc} 12px)` };
        case 'horizontal-stripes': return { backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 14px, ${pc} 14px, ${pc} 16px)` };
        case 'grid': return { backgroundImage: `linear-gradient(${pc} 1px, transparent 1px), linear-gradient(90deg, ${pc} 1px, transparent 1px)`, backgroundSize: '30px 30px' };
        case 'checkerboard': return { backgroundImage: `linear-gradient(45deg, ${pc} 25%, transparent 25%), linear-gradient(-45deg, ${pc} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${pc} 75%), linear-gradient(-45deg, transparent 75%, ${pc} 75%)`, backgroundSize: '40px 40px', backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px' };
        case 'cross-hatch': return { backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, ${pc} 8px, ${pc} 9px), repeating-linear-gradient(-45deg, transparent, transparent 8px, ${pc} 8px, ${pc} 9px)` };
        case 'diamond-grid': return { backgroundImage: `repeating-linear-gradient(45deg, ${pc} 0, ${pc} 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, ${pc} 0, ${pc} 1px, transparent 0, transparent 50%)`, backgroundSize: '30px 30px' };
        case 'zigzag': return { backgroundImage: `linear-gradient(135deg, ${pc} 25%, transparent 25%), linear-gradient(225deg, ${pc} 25%, transparent 25%), linear-gradient(315deg, ${pc} 25%, transparent 25%), linear-gradient(45deg, ${pc} 25%, transparent 25%)`, backgroundSize: '30px 30px', backgroundPosition: '0 0, 15px 0, 15px -15px, 0px 15px' };
        default: return {};
    }
}

/** Badge SVG that wraps around the icon only */
function IconBadge({ shape, color, size }: { shape: BadgeShape; color: string; size: number }) {
    if (shape === 'none') return null;

    const pad = size * 0.25;
    const total = size + pad * 2;
    const cx = total / 2;
    const cy = total / 2;
    const r = total * 0.46;

    const stroke = color;
    const sw = Math.max(3, size * 0.025);
    const common = { stroke, strokeWidth: sw, fill: 'none', opacity: 0.8 };

    let shapeEl: React.ReactNode = null;
    switch (shape) {
        case 'circle': shapeEl = <circle cx={cx} cy={cy} r={r} {...common} />; break;
        case 'rounded-square': shapeEl = <rect x={pad * 0.4} y={pad * 0.4} width={total - pad * 0.8} height={total - pad * 0.8} rx={size * 0.12} {...common} />; break;
        case 'hexagon': {
            const pts = Array.from({ length: 6 }, (_, i) => {
                const a = (Math.PI / 3) * i - Math.PI / 2;
                return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
            }).join(' ');
            shapeEl = <polygon points={pts} {...common} />;
            break;
        }
        case 'shield': shapeEl = <path d={`M${cx},${cy - r} L${cx + r * 0.85},${cy - r * 0.5} L${cx + r * 0.85},${cy + r * 0.3} Q${cx + r * 0.85},${cy + r} ${cx},${cy + r} Q${cx - r * 0.85},${cy + r} ${cx - r * 0.85},${cy + r * 0.3} L${cx - r * 0.85},${cy - r * 0.5} Z`} {...common} />; break;
        case 'diamond': shapeEl = <polygon points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`} {...common} />; break;
        case 'oval': shapeEl = <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.78} {...common} />; break;
        case 'octagon': {
            const pts = Array.from({ length: 8 }, (_, i) => {
                const a = (Math.PI / 4) * i - Math.PI / 8;
                return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
            }).join(' ');
            shapeEl = <polygon points={pts} {...common} />;
            break;
        }
        case 'star': {
            const pts = Array.from({ length: 10 }, (_, i) => {
                const a = (Math.PI / 5) * i - Math.PI / 2;
                const rv = i % 2 === 0 ? r : r * 0.5;
                return `${cx + rv * Math.cos(a)},${cy + rv * Math.sin(a)}`;
            }).join(' ');
            shapeEl = <polygon points={pts} {...common} />;
            break;
        }
        case 'ribbon': {
            const w = r * 1.7, h = r * 1.2;
            shapeEl = <path d={`M${cx - w / 2},${cy - h / 2} L${cx + w / 2},${cy - h / 2} L${cx + w / 2 + sw * 2},${cy} L${cx + w / 2},${cy + h / 2} L${cx - w / 2},${cy + h / 2} L${cx - w / 2 - sw * 2},${cy} Z`} {...common} />;
            break;
        }
    }

    return (
        <svg viewBox={`0 0 ${total} ${total}`} style={{
            width: `${total}px`, height: `${total}px`,
            pointerEvents: 'none',
            gridArea: '1 / 1',
            alignSelf: 'center',
            justifySelf: 'center',
        }}>
            {shapeEl}
        </svg>
    );
}

/** Returns CSS styles for text and icon based on the selected logo style */
function getStyleEffects(config: LogoConfig): { text: CSSProperties; icon: CSSProperties } {
    const s = config.logoStyle;
    const c = config.iconColor;
    const t = config.textColor;

    switch (s) {
        case 'neo-brutal':
            return {
                text: { WebkitTextStroke: '3px #1a1a1a', paintOrder: 'stroke fill', textShadow: '5px 5px 0px #1a1a1a' },
                icon: { filter: 'drop-shadow(5px 5px 0px #1a1a1a)', strokeWidth: 2.5 },
            };
        case 'outlined':
            return {
                text: { WebkitTextStroke: `3px ${t}`, color: 'transparent', paintOrder: 'stroke fill' },
                icon: { color: 'transparent', stroke: c, strokeWidth: 2, filter: 'none' },
            };
        case 'shadow-pop':
            return { text: { textShadow: `6px 6px 0px ${c}` }, icon: { filter: `drop-shadow(6px 6px 0px ${t})` } };
        case 'sticker':
            return {
                text: { WebkitTextStroke: '8px #ffffff', paintOrder: 'stroke fill', filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.15))' },
                icon: { filter: 'drop-shadow(0 0 0 #fff) drop-shadow(0 0 0 #fff) drop-shadow(0 0 8px #fff) drop-shadow(2px 2px 0 rgba(0,0,0,.15))' },
            };
        case 'glow':
            return { text: { textShadow: `0 0 20px ${c}, 0 0 40px ${c}, 0 0 60px ${c}` }, icon: { filter: `drop-shadow(0 0 12px ${t}) drop-shadow(0 0 24px ${t})` } };
        case 'emboss':
            return { text: { textShadow: `-2px -2px 0 rgba(255,255,255,.4), 2px 2px 4px rgba(0,0,0,.5)` }, icon: { filter: 'drop-shadow(-2px -2px 0 rgba(255,255,255,.4)) drop-shadow(2px 2px 3px rgba(0,0,0,.5))' } };
        case 'retro':
            return { text: { textShadow: `3px 3px 0 #e8985a, 6px 6px 0 #c75d3a, 9px 9px 0 #8b3a2a` }, icon: { filter: 'drop-shadow(3px 3px 0 #e8985a) drop-shadow(3px 3px 0 #c75d3a) drop-shadow(3px 3px 0 #8b3a2a)' } };
        case 'neon':
            return { text: { textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px ${c}, 0 0 82px ${c}`, color: '#fff' }, icon: { filter: `brightness(1.5) drop-shadow(0 0 7px ${t}) drop-shadow(0 0 20px ${t}) drop-shadow(0 0 40px ${t})` } };
        case '3d-extrude': {
            const ts = Array.from({ length: 12 }, (_, i) => `${i + 1}px ${i + 1}px 0 rgba(0,0,0,${(.6 - i * .03).toFixed(2)})`).join(', ');
            return { text: { textShadow: ts }, icon: { filter: Array.from({ length: 4 }, (_, i) => `drop-shadow(${(i + 1) * 3}px ${(i + 1) * 3}px 0 rgba(0,0,0,${(.5 - i * .1).toFixed(1)}))`).join(' ') } };
        }
        case 'long-shadow': {
            const ls = Array.from({ length: 30 }, (_, i) => `${i + 1}px ${i + 1}px 0 rgba(0,0,0,${(.3 - i * .01).toFixed(2)})`).join(', ');
            return { text: { textShadow: ls }, icon: { filter: Array.from({ length: 6 }, (_, i) => `drop-shadow(${(i + 1) * 4}px ${(i + 1) * 4}px 0 rgba(0,0,0,${(.25 - i * .04).toFixed(2)}))`).join(' ') } };
        }
        case 'double-stroke':
            return { text: { WebkitTextStroke: `2px ${c}`, paintOrder: 'stroke fill', textShadow: `0 0 0 ${t}, 3px 3px 0 ${c}` }, icon: { filter: `drop-shadow(0 0 0 ${t}) drop-shadow(2px 2px 0 ${c})`, strokeWidth: 2.5 } };
        case 'vintage':
            return { text: { textShadow: `2px 2px 0 rgba(139,90,43,.5), -1px -1px 0 rgba(210,180,140,.3)`, opacity: 0.9 }, icon: { filter: 'sepia(.5) saturate(.8) drop-shadow(2px 2px 0 rgba(139,90,43,.4))', opacity: 0.9 } };
        case 'clean': default:
            return { text: {}, icon: {} };
    }
}

function getLetterSpacingPx(ls: string): string {
    switch (ls) {
        case 'tight': return '-0.03em';
        case 'wide': return '0.12em';
        case 'ultra-wide': return '0.3em';
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
            }}
        >
            {config.layout !== 'text-only' && (
                <div style={{
                    ...effects.icon,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                }}>
                    <div style={{ gridArea: '1 / 1' }}>
                        <IconComponent
                            size={config.iconSize}
                            color={config.logoStyle === 'outlined' ? 'transparent' : config.iconColor}
                            strokeWidth={config.logoStyle === 'outlined' ? 2 : 1.5}
                            stroke={config.iconColor}
                        />
                    </div>
                    <IconBadge shape={config.badgeShape} color={config.textColor} size={config.iconSize} />
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
        <div className="preview-container" style={{ width: '500px', height: '500px' }}>
            <div
                className={`preview-scaler ${previewMode === 'circle' ? 'circle-crop' : ''}`}
                style={{
                    transform: 'scale(0.625)',
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
