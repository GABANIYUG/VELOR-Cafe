import React, { useState } from 'react';
import { MapPin, Clock, Mail, ArrowRight } from 'lucide-react';
import { audioEngine } from './AudioEngine';

export default function Footer({ onOpenReservation }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    audioEngine.playClick();
    if (email) setSubscribed(true);
  };

  return (
    <footer
      id="location"
      style={{
        backgroundColor: 'var(--color-obsidian)',
        borderTop: '1px solid rgba(249, 246, 240, 0.08)',
        paddingTop: '120px',
        paddingBottom: '40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Flagship Location & Hours Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '48px',
            marginBottom: '100px',
          }}
        >
          {/* Col 1: Flagship Details */}
          <div style={{ gridColumn: 'span 5' }}>
            <span className="text-label" style={{ marginBottom: '16px', display: 'block' }}>
              FLAGSHIP SANCTUARY
            </span>
            <h3 className="heading-2 font-serif" style={{ color: 'var(--color-travertine)', marginBottom: '24px' }}>
              VELOR Flagship No. 01
            </h3>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '20px' }}>
              <MapPin size={20} style={{ color: 'var(--color-brass)', flexShrink: 0, marginTop: '2px' }} />
              <p className="text-body" style={{ color: 'var(--color-travertine)' }}>
                42 Sanctuary Boulevard, Architectural District <br />
                New Delhi / Tokyo Flagship Partner
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '32px' }}>
              <Clock size={20} style={{ color: 'var(--color-brass)', flexShrink: 0, marginTop: '2px' }} />
              <p className="text-body" style={{ color: 'var(--color-travertine)' }}>
                Monday – Sunday: 08:00 AM – 10:00 PM <br />
                Tasting Flight Hours: 10:00 AM – 04:00 PM
              </p>
            </div>

            <button
              onClick={() => {
                audioEngine.playClick();
                onOpenReservation();
              }}
              className="btn-primary"
            >
              RESERVE A TABLE
            </button>
          </div>

          {/* Col 2: Journal & Newsletter */}
          <div style={{ gridColumn: 'span 7' }}>
            <div className="glass-panel-brass" style={{ padding: '40px', borderRadius: '16px' }}>
              <span className="text-label" style={{ marginBottom: '12px', display: 'block' }}>
                EDITORIAL JOURNAL & LIMITED LOT RELEASES
              </span>
              <h3 className="heading-3 font-serif" style={{ color: 'var(--color-travertine)', marginBottom: '16px' }}>
                Join the VELOR Sanctuary Circle
              </h3>
              <p className="text-body" style={{ marginBottom: '24px' }}>
                Receive private invitations to seasonal micro-lot tastings, architectural events, and limited-edition ceramic releases.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: '260px',
                      padding: '14px 20px',
                      borderRadius: '30px',
                      background: 'rgba(249, 246, 240, 0.06)',
                      border: '1px solid var(--glass-border-light)',
                      color: 'var(--color-travertine)',
                    }}
                    required
                  />
                  <button type="submit" className="btn-primary">
                    SUBSCRIBE <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <div style={{ color: 'var(--color-brass)', fontWeight: 500, fontSize: '0.95rem' }}>
                  ✓ Thank you. You have been added to the VELOR Sanctuary Journal.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Massive Watermark Typography */}
        <div style={{ textAlign: 'center', margin: '40px 0 20px 0', opacity: 0.15, userSelect: 'none' }}>
          <span
            className="font-serif"
            style={{
              fontSize: 'clamp(6rem, 18vw, 22rem)',
              fontWeight: 300,
              letterSpacing: '0.2em',
              color: 'var(--color-travertine)',
              lineHeight: 0.8,
            }}
          >
            VELOR
          </span>
        </div>

        {/* Bottom Credits & Copyright */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '32px',
            borderTop: '1px solid rgba(249, 246, 240, 0.08)',
            fontSize: '0.75rem',
            color: 'rgba(249, 246, 240, 0.4)',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            © 2026 VELOR Modern Luxury Café. All rights reserved. ₹50 Lakh Digital Agency Specification.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>INSTAGRAM</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>ARCHDAILY</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>KINFOLK</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>AWWWARDS</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
