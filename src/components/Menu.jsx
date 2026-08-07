import React, { useState } from 'react';
import { audioEngine } from './AudioEngine';

const MENU_CATEGORIES = ['ALL', 'ROYAL INDIAN RESERVES', 'ESPRESSO RITUALS', 'POUR-OVER RESERVE', 'COLD ARCHITECTURE', 'ARTISANAL PASTRIES'];

const MENU_ITEMS = [
  {
    id: 'm1',
    category: 'ROYAL INDIAN RESERVES',
    name: 'Kashmiri Saffron & Cardamom Velvet Latte',
    price: '₹550',
    description: 'Double shot Araku Geisha espresso folded into silk micro-textured milk infused with organic Kashmiri saffron threads and green cardamom.',
    notes: 'Saffron, Cardamom, Velvet',
    popular: true,
    image: '/images/velor_menu_saffron_latte.png',
  },
  {
    id: 'm2',
    category: 'ROYAL INDIAN RESERVES',
    name: 'Araku Valley Organic Reserve V60',
    price: '₹480',
    description: 'High-altitude (1,400m) single-origin micro-lot from Eastern Ghats, hand-poured over crystal V60. Delicate floral & wild honey profile.',
    notes: 'Jasmine, Wild Honey, Citrus',
    popular: true,
    image: '/images/velor_menu_araku_pourover.png',
  },
  {
    id: 'm3',
    category: 'COLD ARCHITECTURE',
    name: 'Mysore Sandalwood Smoked Cold Brew',
    price: '₹650',
    description: '24-hour cold steeped Chikmagalur Peaberry infused with subtle organic Mysore sandalwood cold-smoke, served over a crystal ice sphere.',
    notes: 'Smoky Oak, Dark Cocoa, Sandalwood',
    popular: true,
    image: '/images/velor_menu_sandalwood_coldbrew.png',
  },
  {
    id: 'm4',
    category: 'ESPRESSO RITUALS',
    name: 'Monsooned Malabar AA Extraction',
    price: '₹420',
    description: 'Matured under Malabar coast monsoon winds for 3 months. Ultra-dense crema with zero harsh acidity, deep spicy chocolate finish.',
    notes: 'Spiced Cocoa, Earthy, Rich Crema',
    popular: false,
    image: '/images/velor_menu_malabar_espresso.png',
  },
  {
    id: 'm5',
    category: 'POUR-OVER RESERVE',
    name: 'Panama Geisha & Coorg Flight',
    price: '₹850',
    description: 'Comparative tasting flight featuring Hacienda La Esmeralda (Panama) alongside Coorg Honey-Processed Robusta Grand Reserve.',
    notes: 'Bergamot, Nectarine, Dark Spice',
    popular: true,
    image: '/images/velor_pourover_ritual.png',
  },
  {
    id: 'm6',
    category: 'COLD ARCHITECTURE',
    name: 'Golden Malabar Cold Brew Tonic',
    price: '₹580',
    description: 'Cold-brewed Chikmagalur Peaberry paired with artisanal botanical tonic water, dehydrated orange wheel, and fresh rosemary sprig.',
    notes: 'Effervescent, Botanical, Citrus',
    popular: false,
    image: '/images/velor_coldbrew_crystal.png',
  },
  {
    id: 'm7',
    category: 'ARTISANAL PASTRIES',
    name: 'Royal Rose & Pistachio Tartlet (24k Gold)',
    price: '₹620',
    description: 'Kannauj rose water white chocolate ganache, Sicilian pistachio praline paste, topped with edible 24-karat gold leaf flakes.',
    notes: 'Rose Floral, Pistachio, 24k Gold',
    popular: true,
    image: '/images/velor_menu_rose_pistachio_tart.png',
  },
  {
    id: 'm8',
    category: 'ARTISANAL PASTRIES',
    name: 'AOP French Butter & Black Truffle Croissant',
    price: '₹680',
    description: 'Laminated French AOP butter croissant infused with shaved Perigord black truffle and aged Swiss Gruyère melt.',
    notes: 'Savory, Flaky, Truffle',
    popular: false,
    image: '/images/velor_pastry_artisan.png',
  },
];

export default function Menu({ onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredItems = activeCategory === 'ALL'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: 'linear-gradient(180deg, var(--color-espresso) 0%, var(--color-obsidian) 100%)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="text-label" style={{ marginBottom: '12px', display: 'block' }}>
            INDIAN LUXURY CAFÉ MENU & TASTING FLIGHTS
          </span>
          <h2 className="heading-1 font-serif" style={{ color: 'var(--color-travertine)' }}>
            Curated Menu of Indian & Global Rituals
          </h2>
          <p className="text-lead" style={{ maxWidth: '680px', margin: '12px auto 0 auto' }}>
            Every signature item is presented with its real extraction photograph, showcasing top 0.1% Araku Valley, Monsooned Malabar, and Chikmagalur micro-lots.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioEngine.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className={isActive ? 'btn-primary' : 'btn-secondary'}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.7rem',
                }}
                data-cursor="hover"
                data-cursor-text="FILTER"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid with Mobile Stacking */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                audioEngine.playClick();
                if (onSelectItem) onSelectItem(item);
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className="glass-panel"
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s var(--ease-out-expo)',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--glass-border-light)',
              }}
              data-cursor="hover"
              data-cursor-text="VIEW"
            >
              {/* Real Item Photo */}
              <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s var(--ease-out-expo)',
                  }}
                />
                {item.popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(18, 17, 16, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-brass-light)',
                      border: '1px solid var(--glass-border-brass)',
                    }}
                  >
                    ★ SIGNATURE
                  </span>
                )}
              </div>

              {/* Item Text & Metadata */}
              <div
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
                    <h3 className="heading-3 font-serif" style={{ color: 'var(--color-travertine)', fontSize: '1.15rem', lineHeight: 1.25 }}>
                      {item.name}
                    </h3>
                    <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-brass)', whiteSpace: 'nowrap' }}>
                      {item.price}
                    </span>
                  </div>

                  <p className="text-body" style={{ fontSize: '0.85rem', marginBottom: '16px', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(249,246,240,0.08)' }}>
                  <span className="text-label" style={{ fontSize: '0.625rem', color: 'rgba(249,246,240,0.5)' }}>
                    NOTES: {item.notes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
