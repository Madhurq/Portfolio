import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import './MobileLayout.css';

const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.08,
            type: 'spring',
            stiffness: 350,
            damping: 20,
        },
    }),
};

const windowVariants = {
    hidden: { y: '100%', opacity: 0.8 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
    exit: {
        y: '100%',
        opacity: 0.5,
        transition: {
            duration: 0.25,
            ease: 'easeIn',
        },
    },
};

const MobileLayout = ({ onOpenWindow, windows, activeWindowId, onCloseWindow }) => {
    const activeWindow = windows ? windows.find(w => w.id === activeWindowId) : null;

    // Live clock
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const icons = [
        { label: 'About Me', icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png', id: 'about' },
        { label: 'Projects', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png', id: 'projects' },
        { label: 'Contact', icon: 'https://win98icons.alexmeub.com/icons/png/outlook_express-4.png', id: 'contact' },
        { label: 'Typing Test', icon: 'https://win98icons.alexmeub.com/icons/png/notepad-4.png', id: 'typing' },
        { label: 'Snake', icon: 'https://win98icons.alexmeub.com/icons/png/joystick-2.png', id: 'snake' },
        { label: 'Recycle Bin', icon: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png', id: 'recycle' },
    ];

    const dockIcons = [
        { label: 'About', icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png', id: 'about' },
        { label: 'Projects', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png', id: 'projects' },
        { label: 'Contact', icon: 'https://win98icons.alexmeub.com/icons/png/outlook_express-4.png', id: 'contact' },
    ];

    return (
        <div className="mobile-container">
            <motion.div
                className="mobile-status-bar"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <span className="time">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="status-icons">
                    <span>5G</span>
                    <span>100%</span>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {activeWindow ? (
                    <motion.div
                        key="window"
                        className="mobile-window"
                        variants={windowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="mobile-window-header">
                            <button className="mobile-back-btn" onClick={() => onCloseWindow(activeWindow.id)}>
                                ← Back
                            </button>
                            <span className="mobile-window-title">{activeWindow.title}</span>
                        </div>
                        <div className="mobile-window-content">
                            {activeWindow.content}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'contents' }}
                    >
                        <div className="mobile-app-grid">
                            {icons.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    custom={i}
                                    variants={iconVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <DesktopIcon
                                        label={item.label}
                                        icon={item.icon}
                                        onClick={() => onOpenWindow(item.id)}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mobile-dock"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                        >
                            {dockIcons.map((item) => (
                                <button
                                    key={item.id}
                                    className="mobile-dock-btn"
                                    onClick={() => onOpenWindow(item.id)}
                                    aria-label={item.label}
                                >
                                    <img src={item.icon} alt={item.label} style={{ width: '28px', height: '28px', imageRendering: 'pixelated' }} />
                                </button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileLayout;
