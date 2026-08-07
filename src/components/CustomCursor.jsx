import React, { useEffect, useState } from 'react';

// Custom SVG Coffee Bean Icon component
function CoffeeBeanIcon({ size = 20, isHovered = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: isHovered ? 'drop-shadow(0 0 8px rgba(197, 160, 89, 0.8))' : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s',
        transform: isHovered ? 'scale(1.3) rotate(12deg)' : 'scale(1) rotate(-15deg)',
      }}
    >
      {/* Coffee Bean Outer Shell */}
      <path
        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
        fill="url(#beanGradient)"
        stroke="#C5A059"
        strokeWidth="1.2"
      />
      {/* Coffee Bean S-Curve Line */}
      <path
        d="M12 4C10.5 7 13.5 10 12 12C10.5 14 13.5 17 12 20"
        stroke="#121110"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Gradients */}
      <defs>
        <linearGradient id="beanGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DFBF7A" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#2C221E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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
      {/* Inner Custom Coffee Bean Cursor */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      >
        <CoffeeBeanIcon size={24} isHovered={isHovered} />
      </div>

      {/* Trailing Outer Glassmorphic Ring */}
      <div
        style={{
          position: 'fixed',
          top: trailingPos.y,
          left: trailingPos.x,
          width: isHovered ? '72px' : '40px',
          height: isHovered ? '72px' : '40px',
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
