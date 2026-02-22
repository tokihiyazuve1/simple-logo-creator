import type { LogoConfig } from '../types';
import { ICON_MAP } from '../types';

interface Props {
    config: LogoConfig;
    previewMode: 'square' | 'circle';
    logoRef?: React.RefObject<HTMLDivElement | null>;
}

export const LogoPreview: React.FC<Props> = ({ config, previewMode, logoRef }) => {
    const IconComponent = ICON_MAP[config.icon] || ICON_MAP['ShoppingBag'];

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
