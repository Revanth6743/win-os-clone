import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Notepad from './apps/Notepad';
import Resume from './apps/Resume';
import MusicPlayer from './apps/MusicPlayer';
import Browser from './apps/Browser';



export default function Window({
  appName,
  id,
  onClose,
  onMinimize,
  onMaximize,
  bringToFront,
  zIndex,
  maximized,
}) {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const windowRef = useRef(null);
  const isResizing = useRef(false);

  useEffect(() => {
    if (maximized) {
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 }); // minus taskbar height
      setPosition({ x: 0, y: 0 });
    }
  }, [maximized]);

  const renderAppContent = () => {
    switch (appName) {
      case 'notepad':
        return <Notepad />;
      case 'resume':
  	return <Resume />;
    case 'music':
  return <MusicPlayer />;
	case 'browser':
  return <Browser />;
      default:
        return <div>Coming soon: {appName}</div>;
    }
  };

  const handleMouseDownResize = (e) => {
    e.preventDefault();
    isResizing.current = true;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (e) => {
      if (!isResizing.current) return;
      setSize({
        width: Math.max(startWidth + (e.clientX - startX), 250),
        height: Math.max(startHeight + (e.clientY - startY), 150),
      });
    };

    const onMouseUp = () => {
      isResizing.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <motion.div
      drag={!maximized}
      dragMomentum={false}
      onMouseDown={() => bringToFront(id)}
      dragConstraints={{ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }}
      className="window"
      style={{
        width: size.width,
        height: size.height,
        position: 'absolute',
        top: maximized ? 0 : position.y,
        left: maximized ? 0 : position.x,
        zIndex: zIndex,
        backgroundColor: '#fff',
        border: '1px solid #333',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      onDragEnd={(e, info) => {
        if (!maximized) {
          setPosition({
            x: info.point.x,
            y: info.point.y,
          });
        }
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          background: '#444',
          color: 'white',
          padding: '6px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
          cursor: maximized ? 'default' : 'grab',
        }}
      >
        <span>{appName}</span>
        <div>
          <button onClick={() => onMinimize(id)} style={btnStyle}>_</button>
          <button onClick={() => onMaximize(id)} style={btnStyle}>▢</button>
          <button onClick={() => onClose(id)} style={btnStyle}>✕</button>
        </div>
      </div>

      {/* App Content */}
      <div style={{ flexGrow: 1, padding: '10px', overflow: 'auto' }}>
        {renderAppContent()}
      </div>

      {/* Resize Handle */}
      {!maximized && (
        <div
          onMouseDown={handleMouseDownResize}
          style={{
            position: 'absolute',
            width: '16px',
            height: '16px',
            right: 0,
            bottom: 0,
            cursor: 'se-resize',
            background: 'transparent',
          }}
        />
      )}
    </motion.div>
  );
}

const btnStyle = {
  marginLeft: '5px',
  padding: '2px 6px',
  border: 'none',
  background: '#666',
  color: 'white',
  cursor: 'pointer',
};
