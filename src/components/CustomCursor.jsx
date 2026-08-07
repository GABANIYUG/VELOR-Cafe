import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState({ mode: 'default', text: '' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovering elements
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const mode = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorState({ mode, text });
      } else {
        setCursorState({ mode: 'default', text: '' });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth trailing effect
  useEffect(() => {
    let animationFrame;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrame = requestAnimationFrame(updateTrailing);
    };
    animationFrame = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animationFrame);
  }, [pos]);

  if (!isVisible) return null;

  const isHovered = cursorState.mode !== 'default';

  return (
    <>
      {/* Inner Dot */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          width: isHovered ? '0px' : '8px',
          height: isHovered ? '0px' : '8px',
          backgroundColor: 'var(--color-brass)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        }}
      />

      {/* Trailing Outer Ring */}
      <div
        style={{
          position: 'fixed',
          top: trailingPos.y,
          left: trailingPos.x,
          width: isHovered ? '70px' : '36px',
          height: isHovered ? '70px' : '36px',
          border: isHovered ? '1px solid var(--color-brass)' : '1px solid rgba(197, 160, 89, 0.4)',
          backgroundColor: isHovered ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
          backdropFilter: isHovered ? 'blur(4px)' : 'none',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo), background-color 0.3s',
        }}
      >
        {isHovered && cursorState.text && (
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--color-travertine)',
              textTransform: 'uppercase',
            }}
          >
            {cursorState.text}
          </span>
        )}
      </div>
    </>
  );
}
