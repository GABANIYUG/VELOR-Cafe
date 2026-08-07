import React, { useState } from 'react';
import { Droplet, Flame, Thermometer, Gauge } from 'lucide-react';
import { audioEngine } from './AudioEngine';

const BEANS = [
  {
    id: 'ethiopia-geisha',
    name: 'Yirgacheffe Reserve Geisha',
    origin: 'Gedeo Zone, Ethiopia',
    altitude: '2,200 meters',
    process: 'Natural Anaerobic Fermentation',
    notes: ['Jasmine Blossom', 'Bergamot Peel', 'Wild White Peach', 'Raw Honey'],
    roastLevel: 'Ultra-Light Roast',
    specs: { dose: '18.5g', yield: '42.0g', time: '28s', temp: '93.5°C' },
    image: '/images/velor_pourover_ritual.png',
  },
  {
    id: 'panama-esmeralda',
    name: 'Panama Hacienda La Esmeralda',
    origin: 'Boquete, Panama',
    altitude: '1,950 meters',
    process: 'Washed Extended Bloom',
    notes: ['Meyer Lemon', 'Black Tea', 'Elderflower', 'Crisp Nectarine'],
    roastLevel: 'Light Precision Roast',
    specs: { dose: '19.0g', yield: '44.0g', time: '30s', temp: '94.0°C' },
    image: '/images/velor_espresso_macro.png',
  },
  {
    id: 'colombia-bourbon',
    name: 'Colombia Pink Bourbon Single-Lot',
    origin: 'Huila, Colombia',
    altitude: '1,850 meters',
    process: 'Honey Carbonic Maceration',
    notes: ['Ripe Papaya', 'Pink Grapefruit', 'Brown Sugar', 'Vanilla Pod'],
    roastLevel: 'Medium Light Roast',
    specs: { dose: '18.0g', yield: '38.0g', time: '26s', temp: '92.8°C' },
    image: '/images/velor_coldbrew_crystal.png',
  },
];

export default function CoffeeCraft() {
  const [selectedBean, setSelectedBean] = useState(BEANS[0]);

  return (
    <section
      id="craft"
      style={{
        padding: '140px 0',
        position: 'relative',
        backgroundColor: 'var(--color-obsidian)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="text-label" style={{ marginBottom: '16px', display: 'block' }}>
            PART II — THE BEAN-TO-CUP RITUAL
          </span>
          <h2 className="heading-1 font-serif" style={{ color: 'var(--color-travertine)' }}>
            Uncompromising Coffee Craftsmanship
          </h2>
          <p className="text-lead" style={{ maxWidth: '640px', margin: '20px auto 0 auto' }}>
            "We source only top 0.1% micro-lot harvests. Each bean profile is extracted using precise mathematical brew ratios and mineralized spring water."
          </p>
        </div>

        {/* Bean Origin Selector Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '60px',
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
                  padding: '14px 28px',
                  borderRadius: '30px',
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
        <div className="glass-panel-brass" style={{ padding: '48px', borderRadius: '16px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left: Bean Details & Extraction Metrics */}
            <div style={{ gridColumn: 'span 7' }}>
              <div className="text-label" style={{ marginBottom: '12px', color: 'var(--color-brass)' }}>
                {selectedBean.origin} • {selectedBean.altitude}
              </div>

              <h3 className="heading-1 font-serif" style={{ marginBottom: '16px', color: 'var(--color-travertine)' }}>
                {selectedBean.name}
              </h3>

              <p className="text-body" style={{ marginBottom: '32px', fontSize: '1.1rem' }}>
                Processed via <strong>{selectedBean.process}</strong>. Roasted in micro-batches to preserve fragrant floral terpenes and elegant fruit acidity.
              </p>

              {/* Tasting Notes Bullets */}
              <div style={{ marginBottom: '40px' }}>
                <span className="text-label" style={{ display: 'block', marginBottom: '14px' }}>
                  KEY TASTING NOTES
                </span>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {selectedBean.notes.map((note) => (
                    <span
                      key={note}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '20px',
                        background: 'rgba(197, 160, 89, 0.12)',
                        border: '1px solid rgba(197, 160, 89, 0.3)',
                        color: 'var(--color-travertine)',
                        fontSize: '0.875rem',
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
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'rgba(18, 17, 16, 0.6)',
                  border: '1px solid var(--glass-border-light)',
                }}
              >
                <div>
                  <span className="text-label" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '4px' }}>DOSE</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-travertine)' }}>{selectedBean.specs.dose}</span>
                </div>
                <div>
                  <span className="text-label" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '4px' }}>YIELD</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-travertine)' }}>{selectedBean.specs.yield}</span>
                </div>
                <div>
                  <span className="text-label" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '4px' }}>TIME</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-brass)' }}>{selectedBean.specs.time}</span>
                </div>
                <div>
                  <span className="text-label" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '4px' }}>WATER TEMP</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-travertine)' }}>{selectedBean.specs.temp}</span>
                </div>
              </div>
            </div>

            {/* Right: High-Res Coffee Photography */}
            <div style={{ gridColumn: 'span 5' }}>
              <div
                style={{
                  width: '100%',
                  height: '460px',
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
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
