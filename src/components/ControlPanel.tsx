import React, { useState } from 'react';
import { FONTS, ICONS, PALETTES, ICON_MAP, LOGO_STYLES } from '../types';
import type { LogoConfig } from '../types';
import { RefreshCw, Download, ChevronDown } from 'lucide-react';

interface Props {
    config: LogoConfig;
    setConfig: React.Dispatch<React.SetStateAction<LogoConfig>>;
    previewMode: 'square' | 'circle';
    setPreviewMode: (mode: 'square' | 'circle') => void;
    onSuggest: () => void;
    onDownload: () => void;
    isDownloading: boolean;
}

const PaletteSwatch: React.FC<{ bg: string; text: string; icon: string }> = ({ bg, text, icon }) => (
    <div style={{
        display: 'flex', width: '36px', height: '18px', borderRadius: '0',
        overflow: 'hidden', border: '2px solid #1a1a1a', flexShrink: 0
    }}>
        <div style={{ flex: 1, backgroundColor: bg }} />
        <div style={{ flex: 1, backgroundColor: text }} />
        <div style={{ flex: 1, backgroundColor: icon }} />
    </div>
);

/* Reusable custom dropdown */
function CustomDropdown<T extends { label: string; value: string }>({
    items, value, onChange, renderItem, label
}: {
    items: T[];
    value: string;
    onChange: (value: string) => void;
    renderItem: (item: T, isActive: boolean) => React.ReactNode;
    label: string;
}) {
    const [open, setOpen] = useState(false);
    const active = items.find(i => i.value === value);

    return (
        <div style={{ position: 'relative' }}>
            <label className="label">{label}</label>
            <button
                type="button"
                className="input-field"
                onClick={() => setOpen(!open)}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', textAlign: 'left', width: '100%',
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                    {active ? renderItem(active, true) : 'Select...'}
                </span>
                <ChevronDown size={14} style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }} />
            </button>

            {open && (
                <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                    marginTop: '4px', maxHeight: '220px', overflowY: 'auto',
                    background: '#ffffff', border: '3px solid #1a1a1a',
                    borderRadius: '6px', boxShadow: '5px 5px 0px #1a1a1a',
                }}>
                    {items.map(item => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => { onChange(item.value); setOpen(false); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                width: '100%', padding: '7px 12px',
                                background: item.value === value ? '#fff3cd' : 'transparent',
                                border: 'none', borderBottom: '1px solid #e0e0e0',
                                color: '#1a1a1a', cursor: 'pointer',
                                fontSize: '0.85rem', textAlign: 'left',
                                fontFamily: 'inherit', fontWeight: 500,
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#f0ebe3')}
                            onMouseLeave={e => (e.currentTarget.style.background = item.value === value ? '#fff3cd' : 'transparent')}
                        >
                            {renderItem(item, false)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export const ControlPanel: React.FC<Props> = ({
    config, setConfig, previewMode, setPreviewMode, onSuggest, onDownload, isDownloading
}) => {
    const handleChange = (key: keyof LogoConfig, value: string | number) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const paletteItems = PALETTES.map(p => ({
        label: p.name, value: p.name,
        bg: p.bg, text: p.text, icon: p.icon,
    }));
    const activePaletteName = PALETTES.find(p => p.bg === config.bgColor && p.text === config.textColor && p.icon === config.iconColor)?.name || '';

    const iconItems = ICONS.map(name => ({ label: name, value: name }));

    return (
        <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Primary Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn" style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }} onClick={onSuggest}>
                    <RefreshCw size={14} /> Suggest
                </button>
                <button
                    className="btn"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem', backgroundColor: 'var(--accent-green)' }}
                    onClick={onDownload}
                    disabled={isDownloading}
                >
                    <Download size={14} /> {isDownloading ? 'Wait...' : 'Download'}
                </button>
            </div>

            <hr />

            {/* Two-column controls grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

                {/* Shop Name — full width */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label className="label">Shop Name</label>
                    <input
                        type="text"
                        className="input-field"
                        value={config.name}
                        onChange={e => handleChange('name', e.target.value)}
                        placeholder="My Awesome Shop"
                    />
                </div>

                {/* Font */}
                <div>
                    <label className="label">Font</label>
                    <select
                        className="input-field"
                        value={config.fontFamily}
                        onChange={e => handleChange('fontFamily', e.target.value)}
                    >
                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>

                {/* Layout */}
                <div>
                    <label className="label">Layout</label>
                    <select
                        className="input-field"
                        value={config.layout}
                        onChange={e => handleChange('layout', e.target.value)}
                    >
                        <option value="icon-top">Icon Top</option>
                        <option value="icon-left">Icon Left</option>
                        <option value="text-only">Text Only</option>
                        <option value="icon-only">Icon Only</option>
                    </select>
                </div>

                {/* Logo Style — full width */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <CustomDropdown
                        label="Logo Style"
                        items={LOGO_STYLES.map(s => ({ label: s.label, value: s.value, desc: s.desc }))}
                        value={config.logoStyle}
                        onChange={val => handleChange('logoStyle', val)}
                        renderItem={(item) => (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontWeight: 700 }}>{item.label}</span>
                                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{(item as any).desc}</span>
                            </span>
                        )}
                    />
                </div>

                {/* Icon — full width with preview */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <CustomDropdown
                        label="Icon"
                        items={iconItems}
                        value={config.icon}
                        onChange={val => handleChange('icon', val)}
                        renderItem={(item) => {
                            const Ic = ICON_MAP[item.value];
                            return (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {Ic && <Ic size={16} strokeWidth={1.5} />}
                                    <span>{item.label}</span>
                                </span>
                            );
                        }}
                    />
                </div>

                {/* Palette — full width with preview */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <CustomDropdown
                        label="Color Palette"
                        items={paletteItems}
                        value={activePaletteName}
                        onChange={val => {
                            const p = PALETTES.find(pal => pal.name === val);
                            if (p) setConfig(prev => ({ ...prev, bgColor: p.bg, textColor: p.text, iconColor: p.icon }));
                        }}
                        renderItem={(item) => (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <PaletteSwatch bg={(item as any).bg} text={(item as any).text} icon={(item as any).icon} />
                                <span>{item.label}</span>
                            </span>
                        )}
                    />
                </div>

                {/* Manual Color Pickers */}
                <div>
                    <label className="label" style={{ fontSize: '0.7rem' }}>BG Color</label>
                    <input type="color" value={config.bgColor} onChange={e => handleChange('bgColor', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                        <label className="label" style={{ fontSize: '0.7rem' }}>Text</label>
                        <input type="color" value={config.textColor} onChange={e => handleChange('textColor', e.target.value)} />
                    </div>
                    <div>
                        <label className="label" style={{ fontSize: '0.7rem' }}>Icon</label>
                        <input type="color" value={config.iconColor} onChange={e => handleChange('iconColor', e.target.value)} />
                    </div>
                </div>

                {/* Sizing — side by side */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <label className="label" style={{ marginBottom: 0 }}>Icon Size</label>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>{config.iconSize}px</span>
                    </div>
                    <input
                        type="range" min="50" max="600"
                        value={config.iconSize}
                        onChange={e => handleChange('iconSize', Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <label className="label" style={{ marginBottom: 0 }}>Text Size</label>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>{config.fontSize}px</span>
                    </div>
                    <input
                        type="range" min="20" max="250"
                        value={config.fontSize}
                        onChange={e => handleChange('fontSize', Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            <hr />

            {/* Preview Toggle */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    className={`btn ${previewMode === 'square' ? '' : 'btn-secondary'}`}
                    style={{
                        flex: 1, padding: '6px', fontSize: '0.8rem',
                        ...(previewMode === 'square' ? { backgroundColor: 'var(--accent-blue)' } : {}),
                    }}
                    onClick={() => setPreviewMode('square')}
                >
                    ◼ Square
                </button>
                <button
                    className={`btn ${previewMode === 'circle' ? '' : 'btn-secondary'}`}
                    style={{
                        flex: 1, padding: '6px', fontSize: '0.8rem',
                        ...(previewMode === 'circle' ? { backgroundColor: 'var(--accent-purple)' } : {}),
                    }}
                    onClick={() => setPreviewMode('circle')}
                >
                    ● Circle
                </button>
            </div>

        </div>
    );
};
