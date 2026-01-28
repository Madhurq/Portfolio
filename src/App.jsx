import React from 'react';
import './App.css';
import { useWindowManager } from './hooks/useWindowManager';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';
import DraggableDesktopIcon from './components/DraggableDesktopIcon';
import MobileLayout from './components/MobileLayout';
import WindowFrame from './components/WindowFrame';
import AboutMe from './content/AboutMe';
import Projects from './content/Projects';
import Contact from './content/Contact';

function App() {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    toggleWindow
  } = useWindowManager();

  const handleOpenAbout = () => {
    openWindow('about', 'About Me', 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png', <AboutMe />);
  };

  const handleOpenProjects = () => {
    openWindow('projects', 'My Projects', 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png', <Projects />);
  };

  const handleOpenContact = () => {
    openWindow('contact', 'Contact Me - Outlook Express', 'https://win98icons.alexmeub.com/icons/png/outlook_express-4.png', <Contact />);
  };

  // Open About Me by default
  React.useEffect(() => {
    handleOpenAbout();
  }, []); // Run once on mount

  // Detect mobile/small screen
  const [isMobile, setIsMobile] = React.useState(window.matchMedia("(max-height: 550px)").matches);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-height: 550px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (isMobile) {
    return (
      <MobileLayout
        windows={windows}
        activeWindowId={activeWindowId}
        onCloseWindow={closeWindow}
        onOpenWindow={(id) => {
          // Map simple IDs to the full openWindow calls
          if (id === 'about') handleOpenAbout();
          if (id === 'projects') handleOpenProjects();
          if (id === 'contact') handleOpenContact();
        }}
      />
    );
  }

  return (
    <div className="pc-container">
      <div className="monitor-frame">
        <div className="monitor-bezel">
          <div className="desktop">
            <div className="crt-overlay" />

            <div className="desktop-icons">
              <DraggableDesktopIcon
                label="My Computer"
                icon="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                onDoubleClick={handleOpenAbout}
                defaultPosition={{ x: 20, y: 20 }}
              />
              <DraggableDesktopIcon
                label="My Projects"
                icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
                onDoubleClick={handleOpenProjects}
                defaultPosition={{ x: 20, y: 120 }}
              />
              <DraggableDesktopIcon
                label="Contact Me"
                icon="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png"
                onDoubleClick={handleOpenContact}
                defaultPosition={{ x: 20, y: 220 }}
              />
              <DraggableDesktopIcon
                label="Recycle Bin"
                icon="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png"
                onDoubleClick={() => alert("It's empty!")}
                defaultPosition={{ x: 20, y: 320 }}
              />
            </div>

            {windows.map((win) => (
              !win.isMinimized && (
                <WindowFrame
                  key={win.id}
                  id={win.id}
                  title={win.title}
                  isActive={activeWindowId === win.id}
                  onClose={closeWindow}
                  onMinimize={minimizeWindow}
                  onFocus={focusWindow}
                >
                  {win.content}
                </WindowFrame>
              )
            ))}

            <Taskbar
              openWindows={windows}
              activeWindowId={activeWindowId}
              onToggleWindow={toggleWindow}
            />
          </div>
        </div>
        <div className="monitor-brand">CodeMaster 3000</div>
        <div className="monitor-controls">
          <div className="power-btn"></div>
        </div>
      </div>
      <div className="monitor-stand">
        <div className="stand-connect"></div>
        <div className="stand-base"></div>
      </div>
    </div>
  );
}

export default App;
