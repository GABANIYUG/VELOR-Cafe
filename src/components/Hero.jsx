import React from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { audioEngine } from './AudioEngine';

export default function Hero({ onOpenReservation }) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Hero Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%) scale(1.05)',
          filter: 'brightness(0.75) contrast(1.08)',
          zIndex: 0,
        }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Walnut Gradient Mask & Vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(180deg, rgba(18, 17, 16, 0.45) 0%, rgba(18, 17, 16, 0.75) 70%, rgba(18, 17, 16, 0.95) 100%),
            radial-gradient(circle at 50% 50%, transparent 40%, rgba(18, 17, 16, 0.6) 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* Hero Editorial Content Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 24px',
          marginTop: '40px',
        }}
      >
        {/* Overline Label */}
        <div
          className="text-label animate-fade-in"
          style={{
            marginBottom: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '24px', height: '1px', background: 'var(--color-brass)' }} />
          MODERN LUXURY CAFÉ & ARCHITECTURAL SANCTUARY
          <span style={{ width: '24px', height: '1px', background: 'var(--color-brass)' }} />
        </div>

        {/* Main Display Headline */}
        <h1
          className="heading-display font-serif"
          style={{
            marginBottom: '24px',
            textShadow: '0 10px 40px rgba(0,0,0,0.6)',
          }}
        >
          Crafting Moments of <br />
          <span style={{ fontStyle: 'italic', color: 'var(--color-brass-light)' }}>
            Unhurried Sanctuary
          </span>
        </h1>

        {/* Subtitle / Lead Paragraph */}
        <p
          className="text-lead"
          style={{
            maxWidth: '680px',
            margin: '0 auto 40px auto',
            color: 'rgba(249, 246, 240, 0.85)',
          }}
        >
          VELOR is built around intentional living. Where single-origin coffee rituals, raw travertine architecture, and boutique hospitality merge into a timeless experience.
        </p>

        {/* Call to Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => {
              audioEngine.playClick();
              onOpenReservation();
            }}
            onMouseEnter={() => audioEngine.playHover()}
            className="btn-primary"
            data-cursor="hover"
            data-cursor-text="RESERVE"
          >
            EXPERIENCE THE RITUAL
          </button>
          
          <a
            href="#story"
            onClick={() => audioEngine.playClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="btn-secondary"
            data-cursor="hover"
            data-cursor-text="DISCOVER"
          >
            EXPLORE THE PHILOSOPHY
          </a>
        </div>
      </div>

      {/* Bottom Scroll Down Indicator */}
      <a
        href="#story"
        onClick={() => audioEngine.playClick()}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(249, 246, 240, 0.6)',
          textDecoration: 'none',
          fontSize: '0.688rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          transition: 'color 0.3s',
        }}
        data-cursor="hover"
        data-cursor-text="SCROLL"
      >
        <span>SCROLL TO DISCOVER</span>
        <ArrowDown
          size={16}
          style={{
            color: 'var(--color-brass)',
            animation: 'fadeIn 1.5s ease-in-out infinite alternate',
          }}
        />
      </a>
    </section>
  );
}
