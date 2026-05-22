import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import { useWindowManager } from './hooks/useWindowManager';
import Taskbar from './components/Taskbar';
import DraggableDesktopIcon from './components/DraggableDesktopIcon';
import MobileLayout from './components/MobileLayout';
import WindowFrame from './components/WindowFrame';
import AboutMe from './content/AboutMe';
import Projects from './content/Projects';
import Contact from './content/Contact';
import TypingGame from './content/TypingGame';
import SnakeGame from './content/SnakeGame';
import BSOD from './content/BSOD';

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

  const [showBSOD, setShowBSOD] = useState(false);

  const handleOpenAbout = useCallback(() => {
    openWindow('about', 'About Me', 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png', <AboutMe />);
  }, [openWindow]);

  const handleOpenProjectDetail = useCallback((proj) => {
    const icon = (typeof proj.icon === 'string' && (proj.icon.startsWith('http') || proj.icon.startsWith('/')))
      ? proj.icon
      : typeof proj.icon === 'string' && proj.icon.length <= 4
        ? 'https://win98icons.alexmeub.com/icons/png/notepad-4.png'
        : proj.icon;

    openWindow(
      `project-${proj.name}`,
      proj.name,
      typeof icon === 'string' && icon.startsWith('http') ? icon : 'https://win98icons.alexmeub.com/icons/png/notepad-4.png',
      <div style={{ padding: '16px', backgroundColor: 'white', height: '100%', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          {(typeof proj.icon === 'string' && (proj.icon.startsWith('http') || proj.icon.startsWith('/'))) ? (
            <img src={proj.icon} alt={proj.name} style={{ width: '32px', height: '32px' }} />
          ) : typeof proj.icon === 'string' && proj.icon.length <= 4 ? (
            <span style={{ fontSize: '32px' }}>{proj.icon}</span>
          ) : (
            <img src={proj.icon} alt={proj.name} style={{ width: '32px', height: '32px' }} />
          )}
          <h2 style={{ margin: 0, fontSize: '16px' }}>{proj.name}</h2>
        </div>

        <fieldset>
          <legend>Description</legend>
          <p style={{ margin: '4px 0' }}>{proj.desc}</p>
        </fieldset>

        {proj.bullets && proj.bullets.length > 0 && (
          <fieldset style={{ marginTop: '8px' }}>
            <legend>Key Highlights</legend>
            <ul style={{ margin: '4px 0', paddingLeft: '18px', fontSize: '11px', lineHeight: '1.5' }}>
              {proj.bullets.map((bullet, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{bullet}</li>
              ))}
            </ul>
          </fieldset>
        )}

        <fieldset style={{ marginTop: '8px' }}>
          <legend>Tech Stack</legend>
          <p style={{ margin: '4px 0' }}>{proj.tech}</p>
        </fieldset>

        <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {proj.github && (
            <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '11px' }}>
                🔗 GitHub
              </button>
            </a>
          )}
          {proj.demo && (
            <a href={proj.demo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '11px' }}>
                🌐 Live Demo
              </button>
            </a>
          )}
          {proj.demoNote && !proj.demo && (
            <button disabled style={{ padding: '4px 12px', fontSize: '11px', opacity: 0.6 }}>
              💾 {proj.demoNote}
            </button>
          )}
        </div>
      </div>
    );
  }, [openWindow]);

  const handleOpenProjects = useCallback(() => {
    openWindow('projects', 'My Projects', 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png', <Projects onOpenProject={handleOpenProjectDetail} />);
  }, [openWindow, handleOpenProjectDetail]);

  const handleOpenContact = useCallback(() => {
    openWindow('contact', 'Contact Me - Outlook Express', 'https://win98icons.alexmeub.com/icons/png/outlook_express-4.png', <Contact />);
  }, [openWindow]);

  const handleOpenTypingGame = useCallback(() => {
    openWindow('typing', 'Typing Speed Test', 'https://win98icons.alexmeub.com/icons/png/notepad-4.png', <TypingGame />);
  }, [openWindow]);

  const handleOpenSnakeGame = useCallback(() => {
    openWindow('snake', 'Snake', 'https://win98icons.alexmeub.com/icons/png/joystick-2.png', <SnakeGame />);
  }, [openWindow]);

  const handleRecycleBin = useCallback(() => {
    setShowBSOD(true);
  }, []);

  const [bootPhase, setBootPhase] = useState('booting');

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootPhase('ready');
      handleOpenAbout();
    }, 1400);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const togglePower = () => {
    if (bootPhase === 'ready' || bootPhase === 'booting') {
      setBootPhase('shutting-down');
      setTimeout(() => setBootPhase('off'), 700);
    } else if (bootPhase === 'off') {
      setBootPhase('booting');
      setTimeout(() => setBootPhase('ready'), 1400);
    }
  };

  const isScreenOn = bootPhase === 'booting' || bootPhase === 'ready';

  useEffect(() => {
    if (!showBSOD) return;
    const handler = (e) => {
      setShowBSOD(false);
      e.preventDefault();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showBSOD]);

  if (showBSOD) {
    return <BSOD onDismiss={() => setShowBSOD(false)} />;
  }

  if (isMobile) {
    return (
      <MobileLayout
        windows={windows}
        activeWindowId={activeWindowId}
        onCloseWindow={closeWindow}
        onOpenWindow={(id) => {
          if (id === 'about') handleOpenAbout();
          if (id === 'projects') handleOpenProjects();
          if (id === 'contact') handleOpenContact();
          if (id === 'typing') handleOpenTypingGame();
          if (id === 'snake') handleOpenSnakeGame();
          if (id === 'recycle') handleRecycleBin();
        }}
      />
    );
  }

  return (
    <div className="pc-container">
      <div className="monitor-frame">
        <div className="monitor-bezel">
          <div
            className={`desktop ${bootPhase === 'booting' ? 'booting' : ''} ${bootPhase === 'shutting-down' ? 'shutting-down' : ''}`}
            style={!isScreenOn && bootPhase !== 'shutting-down' ? {
              backgroundColor: '#050505',
              boxShadow: 'none',
              backgroundImage: 'none'
            } : {}}
          >
            {(isScreenOn || bootPhase === 'shutting-down') && (
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
                    label="Snake"
                    icon="https://win98icons.alexmeub.com/icons/png/joystick-2.png"
                    onDoubleClick={handleOpenSnakeGame}
                    defaultPosition={{ x: 110, y: 20 }}
                  />
                  <DraggableDesktopIcon
                    label="My Projects"
                    icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
                    onDoubleClick={handleOpenProjects}
                    defaultPosition={{ x: 20, y: 110 }}
                  />
                  <DraggableDesktopIcon
                    label="Contact Me"
                    icon="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png"
                    onDoubleClick={handleOpenContact}
                    defaultPosition={{ x: 20, y: 200 }}
                  />
                  <DraggableDesktopIcon
                    label="Typing Test"
                    icon="https://win98icons.alexmeub.com/icons/png/notepad-4.png"
                    onDoubleClick={handleOpenTypingGame}
                    defaultPosition={{ x: 20, y: 290 }}
                  />
                  <DraggableDesktopIcon
                    label="Recycle Bin"
                    icon="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png"
                    onDoubleClick={handleRecycleBin}
                    defaultPosition={{ x: 20, y: 380 }}
                  />
                </div>

                <AnimatePresence mode="popLayout">
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
                        initialPosition={win.position}
                      >
                        {win.content}
                      </WindowFrame>
                    )
                  ))}
                </AnimatePresence>

                <Taskbar
                  openWindows={windows}
                  activeWindowId={activeWindowId}
                  onToggleWindow={toggleWindow}
                  onOpenAbout={handleOpenAbout}
                  onOpenProjects={handleOpenProjects}
                  onOpenContact={handleOpenContact}
                  onShutDown={togglePower}
                />
              </>
            )}
          </div>
        </div>
        <div className="monitor-brand">Madhur's PC</div>
        <div className="monitor-controls">
          <div
            className={`power-btn ${!isScreenOn ? 'off' : ''}`}
            onClick={togglePower}
          />
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
