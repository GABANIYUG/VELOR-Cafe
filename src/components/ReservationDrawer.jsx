import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Ticket } from 'lucide-react';
import { audioEngine } from './AudioEngine';

const SEATS = [
  { id: 'bar', name: 'Monolithic Travertine Bar', desc: 'Front-row view of barista extraction rituals' },
  { id: 'alcove', name: 'Quiet Oak Alcove', desc: 'Acoustically insulated booth for focus or conversation' },
  { id: 'terrace', name: 'Sunlit Terrace', desc: 'Open-air seating surrounded by olive greenery' },
];

export default function ReservationDrawer({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [seat, setSeat] = useState(SEATS[0]);
  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('10:30 AM (Morning Calm)');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmedCode, setConfirmedCode] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    audioEngine.playClick();
    const code = 'VELOR-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedCode(code);
    setStep(3);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(18, 17, 16, 0.75)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        className="glass-panel-brass"
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100%',
          padding: '40px',
          overflowY: 'auto',
          position: 'relative',
          borderRadius: 0,
          background: 'var(--color-obsidian)',
        }}
      >
        {/* Header Close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <span className="text-label">SANCTUARY BOOKING</span>
            <h3 className="heading-2 font-serif" style={{ color: 'var(--color-travertine)' }}>
              Reserve Your Ritual
            </h3>
          </div>
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-travertine)',
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        </div>

        {step < 3 ? (
          <form onSubmit={handleSubmit}>
            {/* Step 1: Seat Selection */}
            <div style={{ marginBottom: '32px' }}>
              <label className="text-label" style={{ display: 'block', marginBottom: '12px' }}>
                1. SELECT SANCTUARY SEAT
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SEATS.map((s) => {
                  const isSelected = seat.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => {
                        audioEngine.playClick();
                        setSeat(s);
                      }}
                      className={isSelected ? 'glass-panel-brass' : 'glass-panel'}
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        borderLeft: isSelected ? '4px solid var(--color-brass)' : '1px solid var(--glass-border-light)',
                      }}
                    >
                      <h4 style={{ fontSize: '1rem', color: 'var(--color-travertine)', fontWeight: 500 }}>{s.name}</h4>
                      <p style={{ fontSize: '0.813rem', color: 'rgba(249,246,240,0.6)', marginTop: '4px' }}>{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date & Time & Guests */}
            <div style={{ marginBottom: '32px' }}>
              <label className="text-label" style={{ display: 'block', marginBottom: '12px' }}>
                2. DATE, TIME & GUESTS
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'rgba(249,246,240,0.6)', display: 'block', marginBottom: '6px' }}>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(249,246,240,0.05)',
                      border: '1px solid var(--glass-border-light)',
                      color: 'var(--color-travertine)',
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'rgba(249,246,240,0.6)', display: 'block', marginBottom: '6px' }}>Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(249,246,240,0.05)',
                      border: '1px solid var(--glass-border-light)',
                      color: 'var(--color-travertine)',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} style={{ background: '#121110' }}>{n} Guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'rgba(249,246,240,0.6)', display: 'block', marginBottom: '6px' }}>Time Slot</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(249,246,240,0.05)',
                    border: '1px solid var(--glass-border-light)',
                    color: 'var(--color-travertine)',
                  }}
                >
                  <option value="09:00 AM (Morning Calm)" style={{ background: '#121110' }}>09:00 AM (Morning Calm)</option>
                  <option value="11:30 AM (Midday Brew)" style={{ background: '#121110' }}>11:30 AM (Midday Brew)</option>
                  <option value="03:00 PM (Afternoon Pause)" style={{ background: '#121110' }}>03:00 PM (Afternoon Pause)</option>
                  <option value="06:30 PM (Evening Lounge)" style={{ background: '#121110' }}>06:30 PM (Evening Lounge)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div style={{ marginBottom: '32px' }}>
              <label className="text-label" style={{ display: 'block', marginBottom: '12px' }}>
                3. GUEST CONTACT
              </label>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(249,246,240,0.05)',
                  border: '1px solid var(--glass-border-light)',
                  color: 'var(--color-travertine)',
                  marginBottom: '12px',
                }}
                required
              />

              <input
                type="tel"
                placeholder="Phone / WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(249,246,240,0.05)',
                  border: '1px solid var(--glass-border-light)',
                  color: 'var(--color-travertine)',
                }}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              CONFIRM SANCTUARY RESERVATION
            </button>
          </form>
        ) : (
          /* Confirmation Digital Receipt */
          <div className="glass-panel-brass" style={{ padding: '32px', textAlign: 'center' }}>
            <CheckCircle size={48} style={{ color: 'var(--color-brass)', margin: '0 auto 16px auto' }} />
            <span className="text-label" style={{ display: 'block', marginBottom: '8px' }}>RESERVATION CONFIRMED</span>
            <h3 className="heading-2 font-serif" style={{ color: 'var(--color-travertine)', marginBottom: '24px' }}>
              Welcome to VELOR
            </h3>

            <div style={{ padding: '20px', background: 'rgba(18,17,16,0.8)', borderRadius: '8px', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(249,246,240,0.5)' }}>PASS CODE:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-brass)' }}>{confirmedCode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(249,246,240,0.5)' }}>SEAT:</span>
                <span style={{ color: 'var(--color-travertine)' }}>{seat.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(249,246,240,0.5)' }}>DATE & TIME:</span>
                <span style={{ color: 'var(--color-travertine)' }}>{date} @ {time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(249,246,240,0.5)' }}>GUEST:</span>
                <span style={{ color: 'var(--color-travertine)' }}>{name} ({guests} Guests)</span>
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playClick();
                onClose();
                setStep(1);
              }}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              CLOSE RECEIPT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
