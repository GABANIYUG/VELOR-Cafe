import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MaterialShowcase from './components/MaterialShowcase';
import CoffeeCraft from './components/CoffeeCraft';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import ReservationDrawer from './components/ReservationDrawer';
import Footer from './components/Footer';
import { X, Sparkles } from 'lucide-react';
import { audioEngine } from './components/AudioEngine';

export default function App() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--color-obsidian)' }}>
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Fluid Custom Cursor */}
      <CustomCursor />

      {/* Ambient Particle Canvas */}
      <ParticleCanvas />

      {/* Floating Glassmorphic Top Navbar */}
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      {/* Hero Section with Video Background */}
      <Hero onOpenReservation={() => setReservationOpen(true)} />

      {/* Brand Philosophy & PBR Material Showcase */}
      <MaterialShowcase />

      {/* Coffee Craftsmanship & Origin Selector */}
      <CoffeeCraft />

      {/* Interactive Editorial Menu */}
      <Menu onSelectItem={(item) => setSelectedMenuItem(item)} />

      {/* Architectural & Ambiance Gallery */}
      <Gallery />

      {/* Footer & Flagship Details */}
      <Footer onOpenReservation={() => setReservationOpen(true)} />

      {/* Reservation Slide-Over Drawer */}
      <ReservationDrawer
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      {/* Menu Item Tasting Detail Modal */}
      {selectedMenuItem && (
        <div
          onClick={() => setSelectedMenuItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(18, 17, 16, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-brass"
            style={{
              maxWidth: '540px',
              width: '100%',
              padding: '40px',
              position: 'relative',
              borderRadius: '16px',
              background: 'var(--color-obsidian)',
            }}
          >
            <button
              onClick={() => setSelectedMenuItem(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-travertine)',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            <span className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              TASTING PROFILE & ORIGIN METADATA
            </span>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
              <h3 className="heading-2 font-serif" style={{ color: 'var(--color-travertine)' }}>
                {selectedMenuItem.name}
              </h3>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-brass)' }}>
                {selectedMenuItem.price}
              </span>
            </div>

            <p className="text-body" style={{ fontSize: '1.05rem', marginBottom: '24px' }}>
              {selectedMenuItem.description}
            </p>

            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(197, 160, 89, 0.1)',
                border: '1px solid var(--glass-border-brass)',
                marginBottom: '24px',
              }}
            >
              <span className="text-label" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '4px' }}>FLAVOR PALETTE</span>
              <span style={{ fontSize: '0.95rem', color: 'var(--color-travertine)', fontWeight: 500 }}>
                {selectedMenuItem.notes}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setSelectedMenuItem(null);
                  setReservationOpen(true);
                }}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                RESERVE A TABLE TO SAMPLE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
