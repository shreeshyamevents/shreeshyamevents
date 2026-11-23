import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/globals.css';

// Import our custom components
import EventSelector from '../components/EventSelector';
import BudgetSlider from '../components/BudgetSlider';
import SetupCard from '../components/SetupCard';
import ARViewer from '../components/ARViewer';

// Import our mock data
import setupsData from '../data/setups.json';

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [budget, setBudget] = useState(100000); // Default budget: ₹1,00,000
  const [results, setResults] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null); // For the AR Modal

  // Step 1 Logic
  const handleEventSelect = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  // Step 2 Logic: Filter data and move to Step 3
  const handleSearch = () => {
    // Filter the setups based on selected events and the numerical budget
    const filteredResults = setupsData.filter((setup) => {
      const matchesEvent = selectedEvents.some((event) => 
        setup.events.includes(event)
      );
      const matchesBudget = setup.price <= budget; 
      return matchesEvent && matchesBudget;
    });

    // If no results match, show all for the demo, or show an empty state
    setResults(filteredResults.length > 0 ? filteredResults : setupsData.slice(0, 3));
    setStep(3);
  };

  // Reset the entire app
  const handleReset = () => {
    setStep(1);
    setSelectedEvents([]);
    setBudget(100000);
    setResults([]);
    setSelectedModel(null);
  };

  return (
    <div className="container">
      <Head>
        <title>Shree Shyam Events | Plan Your Event</title>
        <meta name="description" content="Create your dream event with Shree Shyam Events" />
      </Head>

      {/* Header / Logo Area */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <img 
          src="/logo.png" 
          alt="Shree Shyam Events" 
          style={{ maxWidth: '180px', height: 'auto' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <h1 style={{ fontSize: '2rem', marginTop: '20px', letterSpacing: '4px' }}>
          Shree Shyam Events
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#666', letterSpacing: '1px' }}>
          Step {step} of 3
        </p>
      </div>

      {/* STEP 1: Event Selection */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>What kind of event are you planning?</h2>
          <p style={{ color: '#666', marginBottom: '40px' }}>Select all that apply.</p>
          
          <EventSelector 
            selectedEvents={selectedEvents} 
            onSelect={handleEventSelect} 
          />
          
          <button 
            className="btn" 
            disabled={selectedEvents.length === 0}
            onClick={() => setStep(2)}
          >
            Continue to Budget
          </button>
        </div>
      )}

      {/* STEP 2: Budget Slider */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>What is your estimated budget?</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>Slide to set your maximum budget.</p>
          
          <BudgetSlider budget={budget} setBudget={setBudget} />
          
          <button 
            className="btn" 
            onClick={handleSearch}
            style={{ marginTop: '50px' }}
          >
            View Customized Setups
          </button>
          
          <button 
            onClick={() => setStep(1)}
            style={{ background: 'none', border: 'none', color: '#666', marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Go Back
          </button>
        </div>
      )}

      {/* STEP 3: Results */}
      {step === 3 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>Setups for your celebration</h2>
          
          {results.length === 0 ? (
            <p>No setups found within this budget. Please try adjusting your budget.</p>
          ) : (
            <div className="grid">
              {results.map((setup) => (
                <SetupCard 
                  key={setup.id} 
                  setup={setup} 
                  /* === OPTION A APPLIED HERE === */
                  /* Using Google's test Astronaut model instead of goat.glb */
                  onViewAR={() => setSelectedModel("https://modelviewer.dev/shared-assets/models/Astronaut.glb")} 
                />
              ))}
            </div>
          )}
          
          <button 
            className="btn" 
            onClick={handleReset} 
            style={{ background: 'transparent', color: '#1a1a1a', border: '1px solid #1a1a1a', marginTop: '50px' }}
          >
            Start Over
          </button>
        </div>
      )}

      {/* AR / VR 3D VIEWER MODAL */}
      {selectedModel && (
        <ARViewer 
          modelUrl={selectedModel} 
          onClose={() => setSelectedModel(null)} 
        />
      )}

    </div>
  );
}
