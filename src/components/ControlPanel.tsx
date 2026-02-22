import React from 'react';
import { FONTS, ICONS, PALETTES } from '../types';
import type { LogoConfig } from '../types';
import { RefreshCw, Download } from 'lucide-react';

interface Props {
    config: LogoConfig;
    setConfig: React.Dispatch<React.SetStateAction<LogoConfig>>;
    previewMode: 'square' | 'circle';
    setPreviewMode: (mode: 'square' | 'circle') => void;
    onSuggest: () => void;
    onDownload: () => void;
    isDownloading: boolean;
}

export const ControlPanel: React.FC<Props> = ({
    config, setConfig, previewMode, setPreviewMode, onSuggest, onDownload, isDownloading
}) => {
    const handleChange = (key: keyof LogoConfig, value: string | number) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Primary Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn" style={{ flex: 1 }} onClick={onSuggest}>
                    <RefreshCw size={16} /> Suggest Design
                </button>
                <button
                    className="btn"
                    style={{ flex: 1, backgroundColor: '#10b981' }}
                    onClick={onDownload}
                    disabled={isDownloading}
                >
                    <Download size={16} /> {isDownloading ? 'Generating...' : 'Download All'}
                </button>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            {/* Content */}
            <div>
                <label className="label">Shop Name</label>
                <input
                    type="text"
                    className="input-field"
                    value={config.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="My Awesome Shop"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                    <label className="label">Font Family</label>
                    <select
                        className="input-field"
                        value={config.fontFamily}
                        onChange={e => handleChange('fontFamily', e.target.value)}
                    >
                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>

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
            </div>

            {/* Icon */}
            <div>
                <label className="label">Icon</label>
                <select
                    className="input-field"
                    value={config.icon}
                    onChange={e => handleChange('icon', e.target.value)}
                >
                    {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            {/* Colors */}
            <div>
                <label className="label">Color Palette Theme</label>
                <select
                    className="input-field"
                    style={{ marginBottom: '16px' }}
                    onChange={e => {
                        const p = PALETTES.find(pal => pal.name === e.target.value);
                        if (p) {
                            setConfig(prev => ({ ...prev, bgColor: p.bg, textColor: p.text, iconColor: p.icon }));
                        }
                    }}
                    value={PALETTES.find(p => p.bg === config.bgColor && p.text === config.textColor && p.icon === config.iconColor)?.name || 'Custom'}
                >
                    <option value="Custom">Custom...</option>
                    {PALETTES.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                </select>

                {/* Manual Pickers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div>
                        <label className="label" style={{ fontSize: '0.75rem' }}>Background</label>
                        <input
                            type="color"
                            value={config.bgColor}
                            onChange={e => handleChange('bgColor', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label" style={{ fontSize: '0.75rem' }}>Text</label>
                        <input
                            type="color"
                            value={config.textColor}
                            onChange={e => handleChange('textColor', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label" style={{ fontSize: '0.75rem' }}>Icon</label>
                        <input
                            type="color"
                            value={config.iconColor}
                            onChange={e => handleChange('iconColor', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            {/* Sizing */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <label className="label" style={{ marginBottom: 0 }}>Icon Size</label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{config.iconSize}px</span>
                </div>
                <input
                    type="range"
                    min="50" max="600"
                    value={config.iconSize}
                    onChange={e => handleChange('iconSize', Number(e.target.value))}
                    style={{ width: '100%', marginBottom: '16px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <label className="label" style={{ marginBottom: 0 }}>Text Size</label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{config.fontSize}px</span>
                </div>
                <input
                    type="range"
                    min="20" max="250"
                    value={config.fontSize}
                    onChange={e => handleChange('fontSize', Number(e.target.value))}
                    style={{ width: '100%' }}
                />
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            {/* Preview Toggle */}
            <div>
                <label className="label" style={{ marginBottom: '12px' }}>Preview Mode</label>
                <div style={{ display: 'flex', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '6px', borderRadius: '12px' }}>
                    <button
                        className={`btn ${previewMode === 'square' ? '' : 'btn-secondary'}`}
                        style={{ flex: 1, padding: '8px' }}
                        onClick={() => setPreviewMode('square')}
                    >
                        Square
                    </button>
                    <button
                        className={`btn ${previewMode === 'circle' ? '' : 'btn-secondary'}`}
                        style={{ flex: 1, padding: '8px' }}
                        onClick={() => setPreviewMode('circle')}
                    >
                        Circle (TikTok/Shopee)
                    </button>
                </div>
            </div>

        </div>
    );
};
