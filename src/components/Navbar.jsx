import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Calendar } from 'lucide-react';
import { audioEngine } from './AudioEngine';

export default function Navbar({ onOpenReservation }) {
  const [scrolled, setScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    audioEngine.toggleAtmosphere((active) => setAudioActive(active));
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: scrolled ? '16px' : '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '1280px',
        zIndex: 900,
        transition: 'all 0.4s var(--ease-out-expo)',
      }}
    >
      <div
        className={scrolled ? 'glass-panel-brass' : 'glass-panel'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px',
          borderRadius: '40px',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={() => audioEngine.playClick()}
          className="font-serif"
          style={{
            fontSize: '1.65rem',
            fontWeight: 400,
            letterSpacing: '0.18em',
            color: 'var(--color-travertine)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          data-cursor="hover"
          data-cursor-text="VELOR"
        >
          VELOR
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-brass)',
            }}
          />
        </a>

        {/* Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-only"
        >
          {[
            ['Sanctuary', '#story'],
            ['Materials', '#materials'],
            ['Coffee Craft', '#craft'],
            ['Menu', '#menu'],
            ['Gallery', '#gallery'],
            ['Location', '#location'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => audioEngine.playClick()}
              onMouseEnter={() => audioEngine.playHover()}
              style={{
                fontSize: '0.813rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(249, 246, 240, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              data-cursor="hover"
              data-cursor-text={label}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions: Sound Toggle & Reservation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => audioEngine.playHover()}
            className="btn-secondary"
            style={{
              padding: '10px 18px',
              fontSize: '0.75rem',
              gap: '8px',
            }}
            data-cursor="hover"
            data-cursor-text={audioActive ? 'MUTE' : 'SOUND'}
          >
            {audioActive ? (
              <>
                <Volume2 size={14} style={{ color: 'var(--color-brass)' }} />
                <span className="desktop-only" style={{ color: 'var(--color-brass)' }}>ATMOSPHERE ON</span>
              </>
            ) : (
              <>
                <VolumeX size={14} />
                <span className="desktop-only">ATMOSPHERE</span>
              </>
            )}
          </button>

          {/* Reserve Table CTA */}
          <button
            onClick={() => {
              audioEngine.playClick();
              onOpenReservation();
            }}
            onMouseEnter={() => audioEngine.playHover()}
            className="btn-primary"
            style={{
              padding: '10px 22px',
              fontSize: '0.75rem',
            }}
            data-cursor="hover"
            data-cursor-text="BOOK"
          >
            <Calendar size={14} />
            <span>RESERVE TABLE</span>
          </button>
        </div>
      </div>
    </header>
  );
}
