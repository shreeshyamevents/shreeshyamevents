import { useEffect, useState } from 'react';

export default function ARViewer({ modelUrl, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Ensure the model-viewer script is loaded
  useEffect(() => {
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }

    // Simulate a timeout to catch loading errors
    const timer = setTimeout(() => {
      if (!isLoaded) setHasError(true);
    }, 8000); // Wait 8 seconds before showing error

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
        width: '90%', maxWidth: '600px', position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif' }}>Explore in 3D</h3>
          <button onClick={onClose} style={{
            background: 'transparent', border: '1px solid #1a1a1a',
            padding: '5px 15px', cursor: 'pointer', borderRadius: '4px'
          }}>
            Close
          </button>
        </div>

        {/* The 3D Viewer Container */}
        <div style={{ width: '100%', height: '400px', backgroundColor: '#f5f5f5', position: 'relative' }}>
          
          {hasError && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p>3D Model currently unavailable.</p>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>Ensure the file <b>goat.glb</b> exists in the public/models folder.</p>
            </div>
          )}

          {/* @ts-ignore - Ignore TypeScript errors for custom web components */}
          <model-viewer
            src={modelUrl}
            alt="A 3D model of an event setup"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            shadow-intensity="1"
            style={{ width: '100%', height: '100%', opacity: hasError ? 0 : 1 }}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          ></model-viewer>
        </div>
      </div>
    </div>
  );
}
