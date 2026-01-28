import React from 'react';
import DesktopIcon from './DesktopIcon';
import './MobileLayout.css';

const MobileLayout = ({ onOpenWindow, windows, activeWindowId, onCloseWindow }) => {
    const handleOpenAbout = () => {
        onOpenWindow('about');
    };

    const handleOpenProjects = () => {
        onOpenWindow('projects');
    };

    const handleOpenContact = () => {
        onOpenWindow('contact');
    };

    const activeWindow = windows ? windows.find(w => w.id === activeWindowId) : null;

    return (
        <div className="mobile-container">
            {/* Mobile Status Bar */}
            <div className="mobile-status-bar">
                <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="status-icons">
                    <span>5G</span>
                    <span>100%</span>
                </div>
            </div>

            {activeWindow ? (
                <div className="mobile-window">
                    <div className="mobile-window-header">
                        <button className="mobile-back-btn" onClick={() => onCloseWindow(activeWindow.id)}>
                            ← Back
                        </button>
                        <span className="mobile-window-title">{activeWindow.title}</span>
                    </div>
                    <div className="mobile-window-content">
                        {activeWindow.content}
                    </div>
                </div>
            ) : (
                <>
                    {/* App Grid */}
                    <div className="mobile-app-grid">
                        <DesktopIcon
                            label="About Me"
                            icon="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                            onDoubleClick={handleOpenAbout}
                            onClick={handleOpenAbout}
                        />
                        <DesktopIcon
                            label="Projects"
                            icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
                            onDoubleClick={handleOpenProjects}
                            onClick={handleOpenProjects}
                        />
                        <DesktopIcon
                            label="Contact"
                            icon="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png"
                            onDoubleClick={handleOpenContact}
                            onClick={handleOpenContact}
                        />
                        <DesktopIcon
                            label="Recycle Bin"
                            icon="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png"
                            onDoubleClick={() => alert("It's empty!")}
                            onClick={() => alert("It's empty!")}
                        />
                    </div>

                    {/* Dock (optional based on preference but adds to the look) */}
                    <div className="mobile-dock">
                        {/* Could put favorite apps here */}
                    </div>
                </>
            )}
        </div>
    );
};

export default MobileLayout;
