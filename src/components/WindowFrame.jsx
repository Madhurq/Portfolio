import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const windowVariants = {
    hidden: {
        scale: 0.3,
        opacity: 0,
        y: 40,
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.8,
        },
    },
    exit: {
        scale: 0.4,
        opacity: 0,
        y: 30,
        transition: {
            duration: 0.25,
            ease: [0.4, 0, 1, 1],
        },
    },
};

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
            <div ref={nodeRef} style={{ position: 'absolute', zIndex: isActive ? 100 : 10 }}>
                <motion.div
                    className="window"
                    variants={windowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    style={{
                        width: '400px',
                        boxShadow: isActive
                            ? '2px 2px 8px rgba(0,0,0,0.4), inset -1px -1px #0a0a0a, inset 1px 1px #ffffff'
                            : '1px 1px 4px rgba(0,0,0,0.2), inset -1px -1px #0a0a0a, inset 1px 1px #ffffff',
                        transition: 'box-shadow 0.2s ease',
                    }}
                    onClick={() => onFocus(id)}
                >
                    <div className="title-bar" style={{ cursor: 'grab' }}>
                        <div className="title-bar-text">{title}</div>
                        <div className="title-bar-controls">
                            <button aria-label="Minimize" onClick={(e) => { e.stopPropagation(); onMinimize(id); }} />
                            <button aria-label="Maximize" disabled />
                            <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(id); }} />
                        </div>
                    </div>
                    <div className="window-body" style={{ overflow: 'auto', maxHeight: '350px' }}>
                        {children}
                    </div>
                </motion.div>
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
