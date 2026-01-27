import { useState } from 'react';

// Content Component mapping would typically happen here or in App
// For now, we just manage the state

export const useWindowManager = () => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);

    const openWindow = (id, title, icon, content) => {
        setWindows((prev) => {
            // If window already exists, just restore and focus it
            const existing = prev.find(w => w.id === id);
            if (existing) {
                return prev.map(w => w.id === id ? { ...w, isMinimized: false } : w);
            }
            // Else create new
            return [...prev, { id, title, icon, content, isMinimized: false }];
        });
        setActiveWindowId(id);
    };

    const closeWindow = (id) => {
        setWindows((prev) => prev.filter(w => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const minimizeWindow = (id) => {
        setWindows((prev) => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        setActiveWindowId(null);
    };

    const focusWindow = (id) => {
        setWindows((prev) => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
        setActiveWindowId(id);
    };

    const toggleWindow = (id) => {
        const win = windows.find(w => w.id === id);
        if (!win) return;

        if (win.id === activeWindowId && !win.isMinimized) {
            minimizeWindow(id);
        } else {
            focusWindow(id);
        }
    };

    return {
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        toggleWindow
    };
};
