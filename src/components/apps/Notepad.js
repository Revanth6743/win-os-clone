import { useState } from 'react';

export default function Notepad() {
  const [text, setText] = useState("");

  return (
    <textarea
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        resize: 'none',
        fontSize: '16px',
        fontFamily: 'monospace',
        padding: '10px'
      }}
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Start typing..."
    />
  );
}
