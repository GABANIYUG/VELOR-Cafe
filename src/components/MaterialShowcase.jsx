import React, { useState } from 'react';
import { Layers, Sparkles, Compass, Shield } from 'lucide-react';
import { audioEngine } from './AudioEngine';

const MATERIALS = [
  {
    id: 'travertine',
    name: 'Raw Travertine Stone',
    origin: 'Tivoli, Italy',
    roughness: '0.85 (Tactile Matte)',
    description: 'Porous mineral limestone carved by hand for our central bar. Establishes monumental calm and tactile grounding.',
    badge: 'CORE COUNTER',
    image: '/images/velor_interior_travertine.png',
  },
  {
    id: 'oak',
    name: 'Aged European Oak',
    origin: 'Black Forest, Germany',
    roughness: '0.62 (Satin Grain)',
    description: 'Fumed 120-year-old oak offering acoustic dampening, warmth, and organic luxury for communal dining alcoves.',
    badge: 'SEATING & JOINERY',
    image: '/images/velor_lifestyle_sanctuary.png',
  },
  {
    id: 'brass',
    name: 'Hand-Brushed Aged Brass',
    origin: 'Kyoto, Japan',
    roughness: '0.28 (Restrained Metallic)',
    description: 'Unlacquered solid brass accents that patina naturally over time, catching morning light with soft golden glows.',
    badge: 'METALLIC ACCENTS',
    image: '/images/velor_pourover_ritual.png',
  },
  {
    id: 'ceramic',
    name: 'Handmade Matte Ceramic',
    origin: 'Mashiko, Japan',
    roughness: '0.74 (Organic Clay)',
    description: 'Bespoke ceramic vessels crafted with specific wall thickness to maintain extraction temperature and ergonomics.',
    badge: 'RITUAL VESSEL',
    image: '/images/velor_espresso_macro.png',
  },
];

export default function MaterialShowcase() {
  const [activeMaterial, setActiveMaterial] = useState(MATERIALS[0]);

  return (
    <section
      id="story"
      style={{
        padding: '160px 0 120px 0',
        position: 'relative',
        background: 'linear-gradient(180deg, var(--color-obsidian) 0%, var(--color-espresso) 100%)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <span className="text-label" style={{ marginBottom: '16px', display: 'block' }}>
            PART I — BRAND PHILOSOPHY & MATERIALITY
          </span>
          <h2 className="heading-1 font-serif" style={{ color: 'var(--color-travertine)' }}>
            Architecture of Calm & Material Restraint
          </h2>
          <p className="text-lead" style={{ maxWidth: '640px', margin: '20px auto 0 auto' }}>
            "The café should feel closer to an Aman resort lobby than a traditional coffee shop. Every material is honest, tactile, and naturally beautiful."
          </p>
        </div>

        {/* Asymmetrical Grid Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Interactive Material Selector */}
          <div style={{ gridColumn: 'span 5' }}>
            <h3 className="heading-3 font-serif" style={{ marginBottom: '24px', color: 'var(--color-travertine)' }}>
              Tactile Material Library
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MATERIALS.map((mat) => {
                const isActive = activeMaterial.id === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => {
                      audioEngine.playClick();
                      setActiveMaterial(mat);
                    }}
                    onMouseEnter={() => audioEngine.playHover()}
                    className={isActive ? 'glass-panel-brass' : 'glass-panel'}
                    style={{
                      padding: '20px 24px',
                      cursor: 'pointer',
                      transition: 'all 0.3s var(--ease-out-expo)',
                      borderLeft: isActive ? '4px solid var(--color-brass)' : '1px solid var(--glass-border-light)',
                    }}
                    data-cursor="hover"
                    data-cursor-text="INSPECT"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-travertine)' }}>
                        {mat.name}
                      </h4>
                      <span className="text-label" style={{ fontSize: '0.65rem' }}>{mat.badge}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(249, 246, 240, 0.65)', lineHeight: 1.5 }}>
                      {mat.origin} • Roughness {mat.roughness}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Material Display & High-Res Render */}
          <div style={{ gridColumn: 'span 7' }} id="materials">
            <div className="glass-panel-brass" style={{ padding: '32px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', height: '420px', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
                <img
                  src={activeMaterial.image}
                  alt={activeMaterial.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s var(--ease-out-expo)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(18, 17, 16, 0.75)',
                    backdropFilter: 'blur(12px)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border-brass)',
                  }}
                >
                  <span className="text-label" style={{ fontSize: '0.7rem' }}>
                    PHYSICALLY BASED SHADER MAP
                  </span>
                </div>
              </div>

              <div>
                <h3 className="heading-2 font-serif" style={{ marginBottom: '12px', color: 'var(--color-travertine)' }}>
                  {activeMaterial.name}
                </h3>
                <p className="text-body" style={{ marginBottom: '20px' }}>
                  {activeMaterial.description}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(249, 246, 240, 0.1)',
                  }}
                >
                  <div>
                    <span className="text-label" style={{ display: 'block', fontSize: '0.65rem' }}>LOCATION</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-travertine)' }}>{activeMaterial.origin}</span>
                  </div>
                  <div>
                    <span className="text-label" style={{ display: 'block', fontSize: '0.65rem' }}>SURFACE SHADER</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-brass)' }}>{activeMaterial.roughness}</span>
                  </div>
                  <div>
                    <span className="text-label" style={{ display: 'block', fontSize: '0.65rem' }}>AUTHENTICITY</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-travertine)' }}>100% Organic Raw</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
