import React from 'react';
import PropTypes from 'prop-types';

const DesktopIcon = ({ label, icon, onDoubleClick }) => {
    return (
        <div
            className="desktop-icon"
            onDoubleClick={onDoubleClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80px',
                cursor: 'pointer',
                color: 'white',
                textShadow: '1px 1px 0px black',
                gap: '5px'
            }}
        >
            <img src={icon} alt={label} style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }} />
            <span style={{ fontSize: '13px', textAlign: 'center' }}>{label}</span>
        </div>
    );
};

DesktopIcon.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onDoubleClick: PropTypes.func.isRequired
};

export default DesktopIcon;
