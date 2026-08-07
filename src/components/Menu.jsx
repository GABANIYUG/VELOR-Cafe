import React, { useState } from 'react';
import { Coffee, Sparkles, Info } from 'lucide-react';
import { audioEngine } from './AudioEngine';

const MENU_CATEGORIES = ['ALL', 'ESPRESSO RITUALS', 'POUR-OVER RESERVE', 'COLD ARCHITECTURE', 'ARTISANAL PASTRIES'];

const MENU_ITEMS = [
  {
    id: 'm1',
    category: 'ESPRESSO RITUALS',
    name: 'Velor Signature Velvet Latte',
    price: '₹550',
    description: 'Double shot Geisha espresso folded into silk micro-textured milk infused with Madagascar vanilla pod.',
    notes: 'Silky, Vanilla, Floral',
    popular: true,
  },
  {
    id: 'm2',
    category: 'ESPRESSO RITUALS',
    name: 'Single-Origin Portafilter Extraction',
    price: '₹450',
    description: 'Pure 1:2.2 ratio extraction of Ethiopia Yirgacheffe served with side of mineral sparkling water.',
    notes: 'Jasmine, Bergamot, Bright',
    popular: false,
  },
  {
    id: 'm3',
    category: 'POUR-OVER RESERVE',
    name: 'Panama Geisha V60 Flight',
    price: '₹850',
    description: 'Hand-poured Geisha served at three distinct temperatures (hot, warm, chilled) to experience evolving flavor notes.',
    notes: 'Peach, Elderflower, Tea-like',
    popular: true,
  },
  {
    id: 'm4',
    category: 'POUR-OVER RESERVE',
    name: 'Kyoto Ice Drip Slow Reserve',
    price: '₹750',
    description: '12-hour slow drop cold extraction over crystal clear ice sphere in handmade whiskey glass.',
    notes: 'Dark Chocolate, Cognac, Oak',
    popular: false,
  },
  {
    id: 'm5',
    category: 'COLD ARCHITECTURE',
    name: 'Golden Cold Brew tonic',
    price: '₹600',
    description: '24-hour steeped Colombia Pink Bourbon paired with artisanal quinine tonic and dehydrated orange slice.',
    notes: 'Effervescent, Citrus, Refreshing',
    popular: true,
  },
  {
    id: 'm6',
    category: 'ARTISANAL PASTRIES',
    name: 'Black Truffle & Gruyère Croissant',
    price: '₹680',
    description: 'AOP French butter croissant filled with shaved black truffle and aged Swiss Gruyère cheese.',
    notes: 'Savory, Flaky, Rich',
    popular: false,
  },
  {
    id: 'm7',
    category: 'ARTISANAL PASTRIES',
    name: 'Pistachio Praline Tartlet',
    price: '₹620',
    description: 'Valrhona white chocolate ganache, Sicilian pistachio praline paste, and gold leaf dust.',
    notes: 'Sweet, Nutty, Decadent',
    popular: true,
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
        padding: '140px 0',
        position: 'relative',
        background: 'linear-gradient(180deg, var(--color-espresso) 0%, var(--color-obsidian) 100%)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="text-label" style={{ marginBottom: '16px', display: 'block' }}>
            EDITORIAL MENU & TASTING FLIGHTS
          </span>
          <h2 className="heading-1 font-serif" style={{ color: 'var(--color-travertine)' }}>
            Curated Menu of Daily Rituals
          </h2>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '60px',
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
                  padding: '10px 20px',
                  fontSize: '0.75rem',
                }}
                data-cursor="hover"
                data-cursor-text="FILTER"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))',
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
                padding: '28px 32px',
                cursor: 'pointer',
                transition: 'all 0.3s var(--ease-out-expo)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              data-cursor="hover"
              data-cursor-text="VIEW"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 className="heading-3 font-serif" style={{ color: 'var(--color-travertine)' }}>
                    {item.name}
                  </h3>
                  <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-brass)' }}>
                    {item.price}
                  </span>
                </div>

                <p className="text-body" style={{ fontSize: '0.938rem', marginBottom: '16px' }}>
                  {item.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(249,246,240,0.08)' }}>
                <span className="text-label" style={{ fontSize: '0.65rem', color: 'rgba(249,246,240,0.5)' }}>
                  NOTES: {item.notes}
                </span>
                {item.popular && (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(197, 160, 89, 0.2)',
                      color: 'var(--color-brass-light)',
                    }}
                  >
                    ★ SIGNATURE
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
