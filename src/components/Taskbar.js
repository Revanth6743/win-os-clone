import { useState, useEffect } from 'react';

export default function Taskbar({ windows, onLaunch }) {
  const [showStart, setShowStart] = useState(false);
  const [time, setTime] = useState('');

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const pinnedApps = ['notepad', 'browser', 'explorer']; // customize as needed

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40px',
          background: '#222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          zIndex: 9999,
        }}
      >
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowStart(!showStart)}
            style={btnStyle}
          >
            ⊞ Start
          </button>

          {/* Pinned Apps */}
          {pinnedApps.map((app, idx) => (
            <button
              key={idx}
              style={iconStyle}
              onClick={() => onLaunch(app)}
              title={app}
            >
              {getEmoji(app)}
            </button>
          ))}

          {/* Running (Minimized) Apps */}
          {windows.map(w => (
            <button
              key={w.id}
              onClick={() => onLaunch(w.appName)}
              style={iconStyle}
            >
              {getEmoji(w.appName)}
            </button>
          ))}
        </div>

        {/* Clock */}
	<div style={{ color: 'white', marginRight: '20px' }}>{time}</div>
      </div>

      {/* Start Menu */}
      {showStart && (
        <div
          style={{
            position: 'fixed',
            bottom: '40px',
            left: 0,
            width: '200px',
            background: '#333',
            color: 'white',
            padding: '10px',
            boxShadow: '0 0 8px rgba(0,0,0,0.4)',
            zIndex: 9998,
          }}
        >
          <div onClick={() => onLaunch('notepad')} style={menuItem}>📝 Notepad</div>
          <div onClick={() => onLaunch('browser')} style={menuItem}>🌐 Browser</div>
          <div onClick={() => onLaunch('explorer')} style={menuItem}>📁 Explorer</div>
          <div style={{ marginTop: '10px', borderTop: '1px solid #444', paddingTop: '10px' }}>
            🔒 Shutdown
          </div>
        </div>
      )}
    </>
  );
}

const btnStyle = {
  background: '#444',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
};

const iconStyle = {
  background: 'transparent',
  color: 'white',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
};

const menuItem = {
  marginBottom: '10px',
  cursor: 'pointer',
};

function getEmoji(appName) {
  switch (appName) {
    case 'notepad': return '📝';
    case 'browser': return '🌐';
    case 'explorer': return '📁';
    default: return '❓';
  }
}
