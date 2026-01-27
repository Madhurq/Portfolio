import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="status-bar-field" style={{ padding: '0 10px', minWidth: '60px', textAlign: 'center' }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
    );
};

const Taskbar = ({ openWindows, activeWindowId, onToggleWindow }) => {
    const [isStartOpen, setIsStartOpen] = useState(false);

    return (
        <div
            className="taskbar"
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40px',
                backgroundColor: '#c0c0c0',
                borderTop: '2px solid #dfdfdf',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                zIndex: 10000
            }}
        >
            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => setIsStartOpen(!isStartOpen)}
                    className={isStartOpen ? 'active' : ''}
                    style={{
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '2px 5px',
                        height: '30px'
                    }}
                >
                    <img
                        src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
                        alt="start"
                        style={{ height: '20px' }}
                    />
                    Start
                </button>

                {isStartOpen && (
                    <div
                        className="window"
                        style={{
                            position: 'absolute',
                            bottom: '35px',
                            left: '0',
                            width: '200px',
                            zIndex: 10001
                        }}
                    >
                        <div className="window-body" style={{ display: 'flex' }}>
                            <div style={{ background: 'navy', color: 'white', writingMode: 'vertical-rl', transform: 'rotate(180deg)', padding: '5px', fontWeight: 'bold' }}>
                                Windows 98
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <button style={{ textAlign: 'left', border: 'none' }}>Programs</button>
                                <button style={{ textAlign: 'left', border: 'none' }}>Documents</button>
                                <button style={{ textAlign: 'left', border: 'none' }}>Settings</button>
                                <hr style={{ width: '100%' }} />
                                <button style={{ textAlign: 'left', border: 'none' }} onClick={() => window.close()}>Shut Down...</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="vertical-divider" style={{ width: '2px', height: '28px', margin: '0 5px', borderLeft: '1px solid gray', borderRight: '1px solid white' }} />

            <div style={{ flex: 1, display: 'flex', gap: '5px', overflowX: 'auto' }}>
                {openWindows.map((win) => (
                    <button
                        key={win.id}
                        className={activeWindowId === win.id && !win.isMinimized ? 'active' : ''}
                        onClick={() => onToggleWindow(win.id)}
                        style={{
                            minWidth: '150px',
                            maxWidth: '200px',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            height: '30px'
                        }}
                    >
                        <img src={win.icon} alt="" style={{ height: '16px' }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{win.title}</span>
                    </button>
                ))}
            </div>

            <div className="vertical-divider" style={{ width: '2px', height: '28px', margin: '0 5px', borderLeft: '1px solid gray', borderRight: '1px solid white' }} />

            <Clock />
        </div>
    );
};

Taskbar.propTypes = {
    openWindows: PropTypes.array.isRequired,
    activeWindowId: PropTypes.string,
    onToggleWindow: PropTypes.func.isRequired
};

export default Taskbar;
