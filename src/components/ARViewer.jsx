import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ARViewer({ modelUrl, onClose }) {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleModelLoad = () => {
    setLoading(false);
    setLoadError(false);
  };

  const handleModelError = () => {
    setLoading(false);
    setLoadError(true);
  };

  return (
    <div
      className="ar-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="ar-modal" role="dialog" aria-modal="true" aria-label="3D setup preview">
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
          strategy="afterInteractive"
        />
        <div className="ar-modal-header">
          <h2 className="ar-modal-title">Explore in 3D</h2>
          <button className="ar-close-button" type="button" onClick={onClose} aria-label="Close 3D preview">
            Close
          </button>
        </div>
        <div className="ar-viewer-frame">
          {loading && !loadError && <p className="ar-loading" role="status">Loading 3D model…</p>}
          {loadError ? (
            <p className="ar-error" role="alert">This 3D model could not be loaded. Please try again later.</p>
          ) : (
            <model-viewer
              className="ar-model-viewer"
              src={modelUrl}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              shadow-intensity="1"
              alt="Three-dimensional event setup preview"
              onLoad={handleModelLoad}
              onError={handleModelError}
            />
          )}
        </div>
        <p className="ar-hint">On a compatible phone, select the AR button to view this model in your space.</p>
      </section>
    </div>
  );
}
