import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="status-bar-field" style={{ padding: '0 10px', minWidth: '60px', textAlign: 'center', fontSize: '12px' }}>
            <motion.span
                key={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                initial={{ opacity: 0.6, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </motion.span>
        </div>
    );
};

const startMenuVariants = {
    hidden: {
        opacity: 0,
        y: 10,
        scaleY: 0.8,
        transformOrigin: 'bottom left',
    },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
            staggerChildren: 0.04,
        },
    },
    exit: {
        opacity: 0,
        y: 8,
        scaleY: 0.9,
        transition: {
            duration: 0.15,
            ease: 'easeIn',
        },
    },
};

const menuItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0 },
};

const Taskbar = ({ openWindows, activeWindowId, onToggleWindow, onOpenAbout, onOpenProjects, onOpenContact, onShutDown }) => {
    const [isStartOpen, setIsStartOpen] = useState(false);
    const startMenuRef = useRef(null);
    const startBtnRef = useRef(null);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isStartOpen &&
                startMenuRef.current && !startMenuRef.current.contains(e.target) &&
                startBtnRef.current && !startBtnRef.current.contains(e.target)
            ) {
                setIsStartOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isStartOpen]);

    const handleMenuAction = (action) => {
        setIsStartOpen(false);
        if (action) action();
    };

    return (
        <div className="taskbar">
            <div style={{ position: 'relative' }}>
                <button
                    ref={startBtnRef}
                    onClick={() => setIsStartOpen(!isStartOpen)}
                    className={isStartOpen ? 'active' : ''}
                    style={{
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '2px 8px',
                        height: '30px',
                    }}
                >
                    <img
                        src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
                        alt="start"
                        style={{ height: '20px' }}
                    />
                    Start
                </button>

                <AnimatePresence>
                    {isStartOpen && (
                        <motion.div
                            ref={startMenuRef}
                            className="window"
                            variants={startMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{
                                position: 'absolute',
                                bottom: '35px',
                                left: '0',
                                width: '200px',
                                zIndex: 10001,
                            }}
                        >
                            <div className="window-body" style={{ display: 'flex', padding: 0 }}>
                                <div style={{
                                    background: 'linear-gradient(180deg, #000080 0%, #1084d0 100%)',
                                    color: 'white',
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                    padding: '8px 5px',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    letterSpacing: '1px',
                                }}>
                                    Windows 98
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2px 0' }}>
                                    <motion.button
                                        variants={menuItemVariants}
                                        className="start-menu-item"
                                        onClick={() => handleMenuAction(onOpenProjects)}
                                    >
                                        📁 Programs
                                    </motion.button>
                                    <motion.button
                                        variants={menuItemVariants}
                                        className="start-menu-item"
                                        onClick={() => handleMenuAction(onOpenAbout)}
                                    >
                                        📄 Documents
                                    </motion.button>
                                    <motion.button
                                        variants={menuItemVariants}
                                        className="start-menu-item"
                                        onClick={() => handleMenuAction(onOpenContact)}
                                    >
                                        ⚙️ Settings
                                    </motion.button>
                                    <hr style={{ width: '90%', margin: '2px auto', borderColor: '#808080' }} />
                                    <motion.button
                                        variants={menuItemVariants}
                                        className="start-menu-item"
                                        onClick={() => handleMenuAction(onShutDown)}
                                    >
                                        🔌 Shut Down...
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="vertical-divider" style={{ width: '2px', height: '28px', margin: '0 5px', borderLeft: '1px solid gray', borderRight: '1px solid white' }} />

            <div style={{ flex: 1, display: 'flex', gap: '4px', overflowX: 'auto', padding: '0 2px' }}>
                <AnimatePresence>
                    {openWindows.map((win) => (
                        <motion.button
                            key={win.id}
                            className={activeWindowId === win.id && !win.isMinimized ? 'active' : ''}
                            onClick={() => onToggleWindow(win.id)}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            style={{
                                minWidth: '140px',
                                maxWidth: '180px',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                height: '28px',
                                fontSize: '12px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <img src={win.icon} alt="" style={{ height: '16px', flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{win.title}</span>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            <div className="vertical-divider" style={{ width: '2px', height: '28px', margin: '0 5px', borderLeft: '1px solid gray', borderRight: '1px solid white' }} />

            <Clock />
        </div>
    );
};

Taskbar.propTypes = {
    openWindows: PropTypes.array.isRequired,
    activeWindowId: PropTypes.string,
    onToggleWindow: PropTypes.func.isRequired,
    onOpenAbout: PropTypes.func,
    onOpenProjects: PropTypes.func,
    onOpenContact: PropTypes.func,
    onShutDown: PropTypes.func
};

export default Taskbar;
