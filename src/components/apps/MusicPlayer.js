import { useRef, useState } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h3>🎵 Music Player</h3>
      <audio ref={audioRef} src="/audio/song.mp3" preload="auto" />
      <button onClick={togglePlay} style={btnStyle}>
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

const btnStyle = {
  padding: '8px 16px',
  background: '#444',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
};
