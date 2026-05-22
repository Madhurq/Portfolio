import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import DesktopIcon from './DesktopIcon';

const DraggableDesktopIcon = ({ label, icon, onDoubleClick, defaultPosition }) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            defaultPosition={defaultPosition}
        >
            <div ref={nodeRef} style={{ position: 'absolute', width: 'fit-content' }}>
                <DesktopIcon
                    label={label}
                    icon={icon}
                    onDoubleClick={onDoubleClick}
                />
            </div>
        </Draggable>
    );
};

export default DraggableDesktopIcon;
