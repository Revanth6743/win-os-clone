import { useState, useEffect } from 'react';
import Window from './components/Window';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';

export default function App() {
  const [windows, setWindows] = useState(() => {
    const saved = localStorage.getItem('windows');
    return saved ? JSON.parse(saved) : [];
  });

  const [zCount, setZCount] = useState(() => {
    const saved = localStorage.getItem('zCount');
    return saved ? parseInt(saved) : 1;
  });

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('windows', JSON.stringify(windows));
    localStorage.setItem('zCount', zCount.toString());
  }, [windows, zCount]);

  // 🔓 Open App
  const openApp = (appName) => {
    const isOpen = windows.find(w => w.appName === appName);
    if (isOpen) return;

    const newWindow = {
      id: Date.now(),
      appName,
      zIndex: zCount,
      minimized: false,
      maximized: false,
    };

    setWindows([...windows, newWindow]);
    setZCount(zCount + 1);
  };

  // ❌ Close App
  const closeApp = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  // 🟡 Minimize
  const minimizeApp = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: true } : w));
  };

  // ⬜ Toggle Maximize
  const toggleMaximizeApp = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  };

  // ⬆️ Bring to Front
  const bringToFront = (id) => {
    const newZ = zCount + 1;
    setZCount(newZ);
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
  };

  return (
    <>
      {/* Desktop Icons */}
      <Desktop onOpen={openApp} />

      {/* Open Windows (not minimized) */}
      {windows
        .filter(w => !w.minimized)
        .map(win => (
          <Window
            key={win.id}
            id={win.id}
            appName={win.appName}
            onClose={() => closeApp(win.id)}
            onMinimize={() => minimizeApp(win.id)}
            onMaximize={() => toggleMaximizeApp(win.id)}
            bringToFront={() => bringToFront(win.id)}
            zIndex={win.zIndex}
            maximized={win.maximized}
          />
        ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows.filter(w => w.minimized)}
        onLaunch={(appName) => {
          const existing = windows.find(w => w.appName === appName);
          if (existing) {
            setWindows(windows.map(w =>
              w.appName === appName ? { ...w, minimized: false } : w
            ));
          } else {
            openApp(appName);
          }
        }}
      />
    </>
  );
}
