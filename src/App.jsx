import React from 'react';
import './App.css';
import { useWindowManager } from './hooks/useWindowManager';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';
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

  return (
    <div className="pc-container">
      <div className="monitor-frame">
        <div className="monitor-bezel">
          <div className="desktop">
            <div className="crt-overlay" />

            <div className="desktop-icons">
              <DesktopIcon
                label="My Computer"
                icon="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                onDoubleClick={handleOpenAbout}
              />
              <DesktopIcon
                label="My Projects"
                icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
                onDoubleClick={handleOpenProjects}
              />
              <DesktopIcon
                label="Contact Me"
                icon="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png"
                onDoubleClick={handleOpenContact}
              />
              <DesktopIcon
                label="Recycle Bin"
                icon="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png"
                onDoubleClick={() => alert("It's empty!")}
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
