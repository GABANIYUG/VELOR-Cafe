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

  // Smooth trailing inertia effect for outer halo
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
      {/* Inner Real Coffee Bean Photo Cursor */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          width: isHovered ? '36px' : '26px',
          height: isHovered ? '36px' : '26px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo)',
        }}
      >
        <img
          src="/images/real_coffee_bean.png"
          alt="Real Coffee Bean Cursor"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: isHovered ? 'drop-shadow(0 0 10px rgba(197, 160, 89, 0.85))' : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6))',
            transform: isHovered ? 'rotate(15deg) scale(1.15)' : 'rotate(-10deg) scale(1)',
            transition: 'transform 0.3s var(--ease-out-expo), filter 0.3s',
          }}
        />
      </div>

      {/* Trailing Outer Glassmorphic Halo Ring */}
      <div
        style={{
          position: 'fixed',
          top: trailingPos.y,
          left: trailingPos.x,
          width: isHovered ? '76px' : '44px',
          height: isHovered ? '76px' : '44px',
          border: isHovered ? '1px solid var(--color-brass)' : '1px solid rgba(197, 160, 89, 0.35)',
          backgroundColor: isHovered ? 'rgba(197, 160, 89, 0.14)' : 'rgba(18, 17, 16, 0.1)',
          backdropFilter: isHovered ? 'blur(6px)' : 'none',
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
