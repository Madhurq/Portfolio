import { useState, useCallback } from 'react';

let windowCounter = 0;

const getStaggeredPosition = () => {
    const offset = (windowCounter % 6) * 30;
    windowCounter++;
    return { x: 50 + offset, y: 30 + offset };
};

export const useWindowManager = () => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);

    const openWindow = useCallback((id, title, icon, content) => {
        setWindows((prev) => {
            const existing = prev.find(w => w.id === id);
            if (existing) {
                return prev.map(w => w.id === id ? { ...w, isMinimized: false } : w);
            }
            const position = getStaggeredPosition();
            return [...prev, { id, title, icon, content, isMinimized: false, position }];
        });
        setActiveWindowId(id);
    }, []);

    const closeWindow = useCallback((id) => {
        setWindows((prev) => prev.filter(w => w.id !== id));
        setActiveWindowId((prevActive) => prevActive === id ? null : prevActive);
    }, []);

    const minimizeWindow = useCallback((id) => {
        setWindows((prev) => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        setActiveWindowId(null);
    }, []);

    const focusWindow = useCallback((id) => {
        setWindows((prev) => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
        setActiveWindowId(id);
    }, []);

    const toggleWindow = useCallback((id) => {
        setWindows((prev) => {
            const win = prev.find(w => w.id === id);
            if (!win) return prev;
            return prev;
        });
        // Read current state properly to decide action
        setActiveWindowId((prevActive) => {
            // We need to check the actual window state
            return id;
        });
        // Use a combined approach: check and act
        setWindows((prev) => {
            const win = prev.find(w => w.id === id);
            if (!win) return prev;
            // Check if window is currently active and visible
            return prev;
        });
    }, []);

    // Fixed toggleWindow that reads from state properly
    const handleToggleWindow = useCallback((id) => {
        setWindows((prev) => {
            const win = prev.find(w => w.id === id);
            if (!win) return prev;

            // If the window is the active one and is visible, minimize it
            // We check activeWindowId via closure but use functional update for windows
            return prev;
        });

        // We need a different approach - use a ref or separate the logic
        // Simple approach: always focus/unminimize. If already active, minimize.
        setActiveWindowId((prevActiveId) => {
            if (prevActiveId === id) {
                // Was active - minimize it
                setWindows((prev) => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
                return null;
            } else {
                // Not active - focus it
                setWindows((prev) => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
                return id;
            }
        });
    }, []);

    return {
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        toggleWindow: handleToggleWindow
    };
};
