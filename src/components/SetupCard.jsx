import { useState } from 'react';

export default function SetupCard({ setup }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="setup-card">
      {setup.img && !imageFailed ? (
        <img
          className="setup-image"
          src={setup.img}
          alt={setup.title}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="setup-image-placeholder" role="img" aria-label={`${setup.title} image placeholder`}>
          Setup preview
        </div>
      )}
      <div className="setup-content">
        <h2 className="setup-title">{setup.title}</h2>
        <p className="setup-description">{setup.description}</p>
        <button className="btn" type="button" onClick={() => window.alert('AR/VR preview coming soon.')}>
          View in AR/VR
        </button>
      </div>
    </article>
  );
}
