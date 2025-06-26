// src/components/apps/Resume.js

export default function Resume() {
  return (
    <iframe
      src="/resume.pdf"
      title="Resume"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
      }}
    />
  );
}
