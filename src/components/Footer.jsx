import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
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
        paddingTop: '80px',
        paddingBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        
        {/* Flagship Location & Hours Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Flagship Details */}
          <div>
            <span className="text-label" style={{ marginBottom: '12px', display: 'block' }}>
              FLAGSHIP SANCTUARY
            </span>
            <h3 className="heading-2 font-serif" style={{ color: 'var(--color-travertine)', marginBottom: '20px' }}>
              VELOR Flagship No. 01
            </h3>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <MapPin size={18} style={{ color: 'var(--color-brass)', flexShrink: 0, marginTop: '2px' }} />
              <p className="text-body" style={{ color: 'var(--color-travertine)', fontSize: '0.9rem' }}>
                Waterfield Road, Bandra West, Mumbai <br />
                <em>Upcoming: Qutub Heritage Precinct, Mehrauli, New Delhi</em>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '24px' }}>
              <Clock size={18} style={{ color: 'var(--color-brass)', flexShrink: 0, marginTop: '2px' }} />
              <p className="text-body" style={{ color: 'var(--color-travertine)', fontSize: '0.9rem' }}>
                Monday – Sunday: 08:00 AM – 11:00 PM <br />
                Tasting Flight Hours: 10:00 AM – 05:00 PM
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

          {/* Journal & Newsletter */}
          <div>
            <div className="glass-panel-brass" style={{ padding: '24px', borderRadius: '16px' }}>
              <span className="text-label" style={{ marginBottom: '8px', display: 'block' }}>
                EDITORIAL JOURNAL & LIMITED LOT RELEASES
              </span>
              <h3 className="heading-3 font-serif" style={{ color: 'var(--color-travertine)', marginBottom: '12px' }}>
                Join the VELOR Sanctuary Circle
              </h3>
              <p className="text-body" style={{ marginBottom: '20px', fontSize: '0.875rem' }}>
                Receive private invitations to seasonal Araku micro-lot tastings, architectural salons, and limited-edition ceramic releases.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: '220px',
                      padding: '12px 18px',
                      borderRadius: '30px',
                      background: 'rgba(249, 246, 240, 0.06)',
                      border: '1px solid var(--glass-border-light)',
                      color: 'var(--color-travertine)',
                      fontSize: '0.85rem',
                    }}
                    required
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
                    SUBSCRIBE <ArrowRight size={14} />
                  </button>
                </form>
              ) : (
                <div style={{ color: 'var(--color-brass)', fontWeight: 500, fontSize: '0.9rem' }}>
                  ✓ Thank you. You have been added to the VELOR Sanctuary Journal.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Watermark Typography */}
        <div style={{ textAlign: 'center', margin: '20px 0 10px 0', opacity: 0.12, userSelect: 'none', overflow: 'hidden' }}>
          <span
            className="font-serif"
            style={{
              fontSize: 'clamp(4rem, 16vw, 18rem)',
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: 'var(--color-travertine)',
              lineHeight: 0.85,
              display: 'block',
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
            paddingTop: '24px',
            borderTop: '1px solid rgba(249, 246, 240, 0.08)',
            fontSize: '0.75rem',
            color: 'rgba(249, 246, 240, 0.4)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            © 2026 VELOR Modern Luxury Café (India). All rights reserved. ₹50 Lakh Digital Agency Benchmark.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>INSTAGRAM</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>ARCHDAILY</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>AWWWARDS</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
