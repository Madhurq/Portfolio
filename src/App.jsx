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

  const handleOpenProjectDetail = (proj) => {
    const icon = (proj.icon.startsWith('http') || proj.icon.startsWith('/'))
      ? proj.icon
      : 'https://win98icons.alexmeub.com/icons/png/notepad-4.png';

    openWindow(
      `project-${proj.name}`,
      proj.name,
      icon,
      <div style={{ padding: '20px', backgroundColor: 'white', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          {(proj.icon.startsWith('http') || proj.icon.startsWith('/')) ? (
            <img src={proj.icon} alt={proj.name} style={{ width: '32px', height: '32px' }} />
          ) : (
            <span style={{ fontSize: '32px' }}>{proj.icon}</span>
          )}
          <h2 style={{ margin: 0 }}>{proj.name}</h2>
        </div>
        <fieldset>
          <legend>Description</legend>
          <p>{proj.desc}</p>
        </fieldset>
        <fieldset style={{ marginTop: '10px' }}>
          <legend>Tech Stack</legend>
          <p>{proj.tech}</p>
        </fieldset>
      </div>
    );
  };

  const handleOpenProjects = () => {
    openWindow('projects', 'My Projects', 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png', <Projects onOpenProject={handleOpenProjectDetail} />);
  };

  const handleOpenContact = () => {
    openWindow('contact', 'Contact Me - Outlook Express', 'https://win98icons.alexmeub.com/icons/png/outlook_express-4.png', <Contact />);
  };

  // Open About Me by default
  React.useEffect(() => {
    handleOpenAbout();
  }, []); // Run once on mount

  // Detect mobile/small screen
  const [isMobile, setIsMobile] = React.useState(window.matchMedia("(max-width: 768px)").matches);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Power state
  const [isScreenOn, setIsScreenOn] = React.useState(true);

  const togglePower = () => {
    setIsScreenOn(!isScreenOn);
  };

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
          <div
            className="desktop"
            style={!isScreenOn ? {
              backgroundColor: '#050505',
              boxShadow: 'none',
              backgroundImage: 'none'
            } : {}}
          >
            {isScreenOn && (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="monitor-brand">Madhur's PC</div>
        <div className="monitor-controls">
          <div
            className="power-btn"
            onClick={togglePower}
            style={!isScreenOn ? { boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1)' } : {}}
          >
            {!isScreenOn && <style>{`.power-btn::after { background-color: #333 !important; box-shadow: none !important; }`}</style>}
          </div>
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
