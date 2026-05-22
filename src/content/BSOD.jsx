import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BSOD = ({ onDismiss }) => {
    const [showCursor, setShowCursor] = useState(true);
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 800),
            setTimeout(() => setPhase(2), 1600),
            setTimeout(() => setPhase(3), 2400),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05 }}
            onClick={onDismiss}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#0000AA',
                color: 'white',
                fontFamily: '"Lucida Console", "Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.6',
                padding: '10vh 10vw',
                zIndex: 999999,
                cursor: 'pointer',
                userSelect: 'none',
                overflow: 'hidden',
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <span style={{
                    backgroundColor: '#A8A8A8',
                    color: '#0000AA',
                    padding: '2px 12px',
                    letterSpacing: '2px',
                }}>
                    Windows
                </span>
            </div>

            {phase >= 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                >
                    A fatal exception 0E has occurred at 0028:C0034B03 in VXD VFAT(01) +
                    00010E43. The current application will be terminated.
                </motion.p>
            )}

            {phase >= 1 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                >
                    * ERROR: Just kidding! This is my Portfolio. 😄
                </motion.p>
            )}

            {phase >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                >
                    <p>* The Recycle Bin is empty. There's nothing to see here.</p>
                    <p>* But hey, thanks for exploring! You clearly have great attention to detail.</p>
                </motion.div>
            )}

            {phase >= 3 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    style={{ marginTop: '30px' }}
                >
                    Press any key or click anywhere to return to desktop...{showCursor ? '█' : ' '}
                </motion.p>
            )}
        </motion.div>
    );
};

export default BSOD;
