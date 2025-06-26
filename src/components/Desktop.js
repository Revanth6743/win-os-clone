export default function Desktop({ onOpen }) {
  return (
    <div
      className="desktop"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 40, // leave space for taskbar
        backgroundImage: "url('/wallpapers/windows11.jpg')",
	backgroundSize: 'cover',
	backgroundPosition: 'center', // or use backgroundImage here
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        zIndex: 0,
      }}
    >
      {/* Notepad Icon */}
      <div
        onDoubleClick={() => onOpen('notepad')}
        className="icon"
        style={{ textAlign: 'center', cursor: 'pointer' }}
      >
        <img src="/icons/notepad.png" alt="Notepad" style={{ width: '48px' }} />
        <div style={{ color: 'white', fontSize: '12px' }}>Notepad</div>
      </div>

      {/* Resume Icon */}
      <div
        onDoubleClick={() => onOpen('resume')}
        className="icon"
        style={{ textAlign: 'center', cursor: 'pointer' }}
      >
        <img src="/icons/resume.png" alt="Resume" style={{ width: '48px' }} />
        <div style={{ color: 'white', fontSize: '12px' }}>Resume</div>
      </div>

      {/* Music Icon */}
      <div
        onDoubleClick={() => onOpen('music')}
        className="icon"
        style={{ textAlign: 'center', cursor: 'pointer' }}
      >
        <img src="/icons/music.png" alt="Music" style={{ width: '48px' }} />
        <div style={{ color: 'white', fontSize: '12px' }}>Music</div>
      </div>
	<div onDoubleClick={() => onOpen('browser')}
  	className="icon"
  	style={{ textAlign: 'center', cursor: 'pointer' }}>
  	<img src="/icons/browser.png" alt="Browser" style={{ width: '48px' }} />
  	<div style={{ color: 'white', fontSize: '12px' }}>Browser</div>
	</div>
    </div>
  );
}
