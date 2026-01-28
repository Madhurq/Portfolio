import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import DesktopIcon from './DesktopIcon';

const DraggableDesktopIcon = ({ label, icon, onDoubleClick, defaultPosition }) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent" // Keeps icon within the desktop
            defaultPosition={defaultPosition} // Optional: {x: 0, y: 0}
        // grid={[10, 10]} // Optional: Snap to grid if we want that retro feel
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
