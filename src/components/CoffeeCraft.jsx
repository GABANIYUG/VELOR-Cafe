import React, { useState } from 'react';
import { audioEngine } from './AudioEngine';

const BEANS = [
  {
    id: 'araku-reserve',
    name: 'Araku Valley High-Altitude Reserve',
    origin: 'Eastern Ghats, Andhra Pradesh, India',
    altitude: '1,400 meters',
    process: 'Natural Organic Micro-Lot',
    notes: ['Wild Jasmine', 'Kashmiri Honey', 'Malt Chocolate', 'Ripe Plum'],
    roastLevel: 'Light Precision Roast',
    specs: { dose: '18.5g', yield: '42.0g', time: '28s', temp: '93.5°C' },
    image: '/images/velor_menu_araku_pourover.png',
  },
  {
    id: 'monsooned-malabar',
    name: 'Monsooned Malabar AA Grand Estate',
    origin: 'Mangalore Coast, Karnataka, India',
    altitude: '1,100 meters',
    process: 'Monsoon Wind Matured (3 Months)',
    notes: ['Earthy Spice', 'Dark Cocoa', 'Walnut', 'Zero Acidity Crema'],
    roastLevel: 'Medium Roast',
    specs: { dose: '19.5g', yield: '40.0g', time: '30s', temp: '94.0°C' },
    image: '/images/velor_menu_malabar_espresso.png',
  },
  {
    id: 'panama-geisha',
    name: 'Panama Hacienda La Esmeralda',
    origin: 'Boquete, Panama',
    altitude: '1,950 meters',
    process: 'Washed Extended Bloom',
    notes: ['Bergamot Peel', 'Elderflower', 'Black Tea', 'Crisp Nectarine'],
    roastLevel: 'Ultra-Light Roast',
    specs: { dose: '18.0g', yield: '44.0g', time: '27s', temp: '93.0°C' },
    image: '/images/velor_pourover_ritual.png',
  },
];

export default function CoffeeCraft() {
  const [selectedBean, setSelectedBean] = useState(BEANS[0]);

  return (
    <section
      id="craft"
      style={{
        padding: '100px 0',
        position: 'relative',
        backgroundColor: 'var(--color-obsidian)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="text-label" style={{ marginBottom: '12px', display: 'block' }}>
            PART II — THE BEAN-TO-CUP RITUAL
          </span>
          <h2 className="heading-1 font-serif" style={{ color: 'var(--color-travertine)' }}>
            Uncompromising Coffee Craftsmanship
          </h2>
          <p className="text-lead" style={{ maxWidth: '680px', margin: '16px auto 0 auto' }}>
            "Celebrating India's finest high-altitude Araku Valley and Monsooned Malabar micro-lots alongside global award-winning Geisha harvests."
          </p>
        </div>

        {/* Bean Origin Selector Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {BEANS.map((bean) => {
            const isActive = selectedBean.id === bean.id;
            return (
              <button
                key={bean.id}
                onClick={() => {
                  audioEngine.playClick();
                  setSelectedBean(bean);
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className={isActive ? 'btn-primary' : 'btn-secondary'}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.75rem',
                }}
                data-cursor="hover"
                data-cursor-text="SELECT"
              >
                {bean.name}
              </button>
            );
          })}
        </div>

        {/* Bean Display Card */}
        <div className="glass-panel-brass" style={{ padding: '24px', borderRadius: '16px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
          >
            {/* Bean Photo */}
            <div
              style={{
                width: '100%',
                height: '280px',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--glass-border-brass)',
              }}
            >
              <img
                src={selectedBean.image}
                alt={selectedBean.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Bean Details & Extraction Metrics */}
            <div>
              <div className="text-label" style={{ marginBottom: '8px', color: 'var(--color-brass)' }}>
                {selectedBean.origin} • {selectedBean.altitude}
              </div>

              <h3 className="heading-2 font-serif" style={{ marginBottom: '12px', color: 'var(--color-travertine)' }}>
                {selectedBean.name}
              </h3>

              <p className="text-body" style={{ marginBottom: '24px', fontSize: '0.95rem' }}>
                Processed via <strong>{selectedBean.process}</strong>. Roasted in small batches to highlight fragrant floral aromas, rich body, and smooth velvet mouthfeel.
              </p>

              {/* Tasting Notes Bullets */}
              <div style={{ marginBottom: '28px' }}>
                <span className="text-label" style={{ display: 'block', marginBottom: '10px' }}>
                  KEY TASTING NOTES
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedBean.notes.map((note) => (
                    <span
                      key={note}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: 'rgba(197, 160, 89, 0.12)',
                        border: '1px solid rgba(197, 160, 89, 0.3)',
                        color: 'var(--color-travertine)',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                      }}
                    >
                      ✦ {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Extraction Parameters Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(18, 17, 16, 0.7)',
                  border: '1px solid var(--glass-border-light)',
                }}
              >
                <div>
                  <span className="text-label" style={{ fontSize: '0.6rem', display: 'block', marginBottom: '2px' }}>DOSE</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-travertine)' }}>{selectedBean.specs.dose}</span>
                </div>
                <div>
                  <span className="text-label" style={{ fontSize: '0.6rem', display: 'block', marginBottom: '2px' }}>YIELD</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-travertine)' }}>{selectedBean.specs.yield}</span>
                </div>
                <div>
                  <span className="text-label" style={{ fontSize: '0.6rem', display: 'block', marginBottom: '2px' }}>TIME</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-brass)' }}>{selectedBean.specs.time}</span>
                </div>
                <div>
                  <span className="text-label" style={{ fontSize: '0.6rem', display: 'block', marginBottom: '2px' }}>TEMP</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-travertine)' }}>{selectedBean.specs.temp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
