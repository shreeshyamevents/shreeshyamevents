import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [budget, setBudget] = useState(100000);
  const [selectedModel, setSelectedModel] = useState(null);

  const eventTypes = ['Haldi', 'Mehandi', 'Sangeet', 'Entry', 'Stage', 'Reception'];

  const handleEventSelect = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(val);
  };

  // Load 3D Viewer script
  useEffect(() => {
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  // Force AR Camera Open with fallback
  const triggerAR = () => {
    const modelViewer = document.querySelector('model-viewer');
    
    // 1. Try the standard model-viewer method first
    if (modelViewer && modelViewer.activateAR) {
      modelViewer.activateAR();
      return;
    }

    // 2. Fail-safe: Manually launch the native Scene Viewer App on Android
    if (/android/i.test(navigator.userAgent)) {
      const modelUrl = "https://modelviewer.dev/shared-assets/models/Astronaut.glb"; 
      const intent = `intent://arvr.google.com/scene-viewer/1.2?file=${encodeURIComponent(modelUrl)}&mode=ar_preferred#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;
      window.location.href = intent;
      return;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
      <Head><title>Shree Shyam Events</title></Head>

      <img src="/logo.png" alt="Logo" style={{ maxWidth: '150px', marginBottom: '20px' }} onError={(e) => e.target.style.display = 'none'} />
      <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem' }}>Shree Shyam Events</h1>
      <p style={{ color: '#666' }}>Step {step} of 3</p>

      {step === 1 && (
        <div>
          <h2>What kind of event?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', margin: '30px 0' }}>
            {eventTypes.map((event) => (
              <div 
                key={event} 
                onClick={() => handleEventSelect(event)}
                style={{ padding: '20px', border: selectedEvents.includes(event) ? '2px solid #1a1a1a' : '1px solid #ccc', cursor: 'pointer', background: selectedEvents.includes(event) ? '#f5f5f5' : 'white' }}
              >
                {event}
              </div>
            ))}
          </div>
          <button onClick={() => setStep(2)} disabled={selectedEvents.length === 0} style={{ background: '#1a1a1a', color: 'white', padding: '15px 40px', border: 'none', cursor: 'pointer' }}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>What is your budget?</h2>
          <div style={{ margin: '40px 0' }}>
            <input type="range" min="50000" max="1000000" step="25000" value={budget} onChange={(e) => setBudget(Number(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
            <h3 style={{ fontSize: '2rem', marginTop: '20px' }}>{formatCurrency(budget)}</h3>
          </div>
          <button onClick={() => setStep(3)} style={{ background: '#1a1a1a', color: 'white', padding: '15px 40px', border: 'none', cursor: 'pointer' }}>View Setups</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Customized Setups</h2>
          <div style={{ border: '1px solid #ccc', padding: '20px', margin: '30px 0' }}>
            <h3>Classic Haldi Celebration</h3>
            <p style={{ color: '#666' }}>A graceful setup for your special day.</p>
            <button onClick={() => setSelectedModel("https://modelviewer.dev/shared-assets/models/Astronaut.glb")} style={{ background: '#1a1a1a', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>View in 3D</button>
          </div>
          <button onClick={() => {setStep(1); setSelectedEvents([]);}} style={{ background: 'transparent', border: '1px solid #1a1a1a', padding: '15px 40px', cursor: 'pointer' }}>Start Over</button>
        </div>
      )}

      {/* 3D MODAL */}
      {selectedModel && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '20px', width: '95%', maxWidth: '600px', borderRadius: '10px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>3D View</h3>
              <button onClick={() => setSelectedModel(null)} style={{ padding: '8px 20px', cursor: 'pointer', border: '1px solid #1a1a1a', background: 'transparent' }}>Close</button>
            </div>

            <div style={{ height: '60vh', minHeight: '400px', background: '#f5f5f5', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              {/* CRITICAL FIX: ar-modes has scene-viewer first */}
              {/* @ts-ignore */}
              <model-viewer 
                src={selectedModel} 
                ar 
                ar-modes="scene-viewer webxr quick-look" 
                camera-controls 
                shadow-intensity="1"
                style={{ width: '100%', height: '100%' }}
              >
                <button 
                  slot="ar-button" 
                  onClick={triggerAR}
                  style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    background: '#1a1a1a', 
                    color: 'white', 
                    padding: '15px 30px', 
                    border: 'none', 
                    borderRadius: '30px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    zIndex: 10
                  }}
                >
                  👁️ View in Your Room (AR)
                </button>
              </model-viewer>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginTop: '15px' }}>
              * AR mode is only available on compatible mobile devices.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}