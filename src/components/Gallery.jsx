import React, { useState } from 'react';
import { X } from 'lucide-react';
import { audioEngine } from './AudioEngine';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Monolithic Travertine Bar',
    category: 'ARCHITECTURE',
    image: '/images/velor_interior_travertine.png',
    className: 'gallery-item-1',
  },
  {
    id: 2,
    title: 'Macro Espresso Extraction',
    category: 'CRAFT',
    image: '/images/velor_espresso_macro.png',
    className: 'gallery-item-2',
  },
  {
    id: 3,
    title: 'Hand-Poured Geisha Ritual',
    category: 'RITUAL',
    image: '/images/velor_pourover_ritual.png',
    className: 'gallery-item-3',
  },
  {
    id: 4,
    title: 'Crystal Cold Brew Architecture',
    category: 'CRAFT',
    image: '/images/velor_coldbrew_crystal.png',
    className: 'gallery-item-4',
  },
  {
    id: 5,
    title: 'Sanctuary Corner & Quiet Pause',
    category: 'LIFESTYLE',
    image: '/images/velor_lifestyle_sanctuary.png',
    className: 'gallery-item-5',
  },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section
      id="gallery"
      style={{
        padding: '140px 0',
        backgroundColor: 'var(--color-obsidian)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="text-label" style={{ marginBottom: '16px', display: 'block' }}>
            PART III — ARCHITECTURAL & LIFESTYLE GALLERY
          </span>
          <h2 className="heading-1 font-serif" style={{ color: 'var(--color-travertine)' }}>
            Atmosphere & Visual Symphony
          </h2>
        </div>

        {/* Masonry Layout Grid */}
        <div className="gallery-masonry-grid">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                audioEngine.playClick();
                setSelectedImg(item);
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className={item.className}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid var(--glass-border-light)',
              }}
              data-cursor="hover"
              data-cursor-text="EXPAND"
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s var(--ease-out-expo)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(18, 17, 16, 0.85) 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <span className="text-label" style={{ fontSize: '0.65rem', marginBottom: '4px' }}>{item.category}</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--color-travertine)', fontFamily: 'var(--font-serif)' }}>
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(18, 17, 16, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <button
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'absolute',
              top: '32px',
              right: '32px',
              background: 'transparent',
              border: 'none',
              color: 'var(--color-travertine)',
              cursor: 'pointer',
            }}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImg.image}
            alt={selectedImg.title}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              borderRadius: '12px',
              boxShadow: 'var(--shadow-elevated)',
            }}
          />
        </div>
      )}
    </section>
  );
}
