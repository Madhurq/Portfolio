import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

const WindowFrame = ({
    id,
    title,
    children,
    isActive,
    onClose,
    onMinimize,
    onFocus,
    initialPosition = { x: 50, y: 50 }
}) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            handle=".title-bar"
            nodeRef={nodeRef}
            defaultPosition={initialPosition}
            onMouseDown={() => onFocus(id)}
            bounds="parent"
        >
            <div
                ref={nodeRef}
                className="window"
                style={{
                    position: 'absolute',
                    zIndex: isActive ? 100 : 10,
                    width: '400px', // Default width
                }}
                onClick={() => onFocus(id)}
            >
                <div className="title-bar">
                    <div className="title-bar-text">{title}</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" onClick={(e) => { e.stopPropagation(); onMinimize(id); }} />
                        <button aria-label="Maximize" disabled />
                        <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(id); }} />
                    </div>
                </div>
                <div className="window-body">
                    {children}
                </div>
            </div>
        </Draggable>
    );
};

WindowFrame.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    isActive: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onMinimize: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    initialPosition: PropTypes.object
};

export default WindowFrame;
