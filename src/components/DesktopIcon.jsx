import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DesktopIcon = ({ label, icon, onDoubleClick, onClick }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsSelected(true);
        // If onClick is provided (mobile mode), open immediately on single click
        if (onClick) {
            onClick();
        }
    };

    const handleDoubleClick = () => {
        if (onDoubleClick) {
            onDoubleClick();
        }
    };

    // Deselect when clicking elsewhere
    React.useEffect(() => {
        const handleDeselect = () => setIsSelected(false);
        document.addEventListener('click', handleDeselect);
        return () => document.removeEventListener('click', handleDeselect);
    }, []);

    return (
        <div
            className={`desktop-icon ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '90px',
                cursor: 'pointer',
                color: 'white',
                textShadow: '1px 1px 1px rgba(0,0,0,0.8)',
                gap: '4px',
            }}
        >
            <img
                src={icon}
                alt={label}
                style={{
                    width: '48px',
                    height: '48px',
                    imageRendering: 'pixelated',
                    transition: 'filter 0.2s ease',
                    filter: isSelected ? 'brightness(1.3) drop-shadow(0 0 3px rgba(100, 150, 255, 0.6))' : 'none',
                }}
            />
            <span style={{
                fontSize: '12px',
                textAlign: 'center',
                padding: '1px 3px',
                borderRadius: '2px',
                backgroundColor: isSelected ? 'rgba(0, 0, 128, 0.7)' : 'transparent',
                transition: 'background-color 0.15s ease',
            }}>
                {label}
            </span>
        </div>
    );
};

DesktopIcon.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
};

export default DesktopIcon;
