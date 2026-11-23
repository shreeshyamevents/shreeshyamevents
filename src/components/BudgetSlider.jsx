import React from 'react';

export default function BudgetSlider({ budget, setBudget }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSliderChange = (e) => {
    // Force the value to be a number and update state
    const newValue = parseInt(e.target.value, 10);
    setBudget(newValue);
  };

  return (
    <div style={{ marginTop: '40px', padding: '0 20px', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>₹50,000</span>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>₹10,00,000+</span>
      </div>
      
      <input
        type="range"
        min="50000"
        max="1000000"
        step="25000"
        value={budget}
        onChange={handleSliderChange}
        style={{
          width: '100%',
          cursor: 'pointer',
          accentColor: '#1a1a1a', // Makes the thumb and track black in most browsers
          height: '6px',
          background: '#e0e0e0',
          borderRadius: '3px',
          outline: 'none',
          appearance: 'none',
          WebkitAppearance: 'none',
          zIndex: 10,
          position: 'relative'
        }}
      />
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>Selected Budget</p>
        <span style={{ fontSize: '2rem', fontWeight: '600', fontFamily: 'Cinzel, serif' }}>
          {formatCurrency(budget)}
        </span>
      </div>
    </div>
  );
}
