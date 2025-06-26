import { useState } from 'react';

export default function Browser() {
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/OpenAI');
  const [input, setInput] = useState(url);

  const handleGo = () => {
    let finalUrl = input.trim();
    if (!finalUrl.startsWith('http')) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#1e1e2f' }}>
      {/* Address Bar */}
      <div style={{ padding: '8px', background: '#333', display: 'flex', gap: '6px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter URL"
          style={{
            flex: 1,
            padding: '6px',
            background: '#222',
            color: 'white',
            border: '1px solid #555',
          }}
        />
        <button onClick={handleGo} style={btnStyle}>Go</button>
      </div>

      {/* Web View */}
      <iframe
        src={url}
        title="Browser"
        style={{ flex: 1, border: 'none' }}
      />
    </div>
  );
}

const btnStyle = {
  padding: '6px 12px',
  background: '#444',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};
