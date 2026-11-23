import { useMemo, useState } from 'react';
import EventSelector from '../components/EventSelector';
import BudgetSelector from '../components/BudgetSelector';
import SetupCard from '../components/SetupCard';
import setups from '../data/setups.json';
import '../styles/globals.css';

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [budget, setBudget] = useState('');
  const [results, setResults] = useState([]);

  const handleEventSelect = (event) => {
    setSelectedEvents((current) => current.includes(event)
      ? current.filter((item) => item !== event)
      : [...current, event]);
  };

  const handleSearch = () => {
    const matchingSetups = setups.filter((setup) =>
      setup.budget === budget && setup.events.some((event) => selectedEvents.includes(event))
    );
    setResults(matchingSetups);
    setStep(3);
  };

  const resultSummary = useMemo(() => {
    if (!selectedEvents.length || !budget) return '';
    return `${selectedEvents.join(', ')} · ${budget}`;
  }, [selectedEvents, budget]);

  const startOver = () => {
    setStep(1);
    setSelectedEvents([]);
    setBudget('');
    setResults([]);
  };

  return (
    <main className="container">
      <header className="header">
        <img className="logo" src="/logo.png" alt="Shree Shyam Events logo" />
        <p className="brand-name">Shree Shyam Events</p>
      </header>

      {step === 1 && (
        <section aria-labelledby="event-question">
          <p className="step-label">Step 1 of 3</p>
          <h1 className="question" id="event-question">What kind of event are you planning?</h1>
          <EventSelector selectedEvents={selectedEvents} onSelect={handleEventSelect} />
          <div className="actions">
            <button className="btn" type="button" disabled={!selectedEvents.length} onClick={() => setStep(2)}>
              Continue
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="budget-question">
          <p className="step-label">Step 2 of 3</p>
          <h1 className="question" id="budget-question">What is your estimated budget?</h1>
          <BudgetSelector budget={budget} onSelect={setBudget} />
          <div className="actions">
            <button className="btn btn-secondary" type="button" onClick={() => setStep(1)}>Back</button>
            <button className="btn" type="button" disabled={!budget} onClick={handleSearch}>View setups</button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section aria-labelledby="results-heading">
          <p className="step-label">Step 3 of 3</p>
          <h1 className="question" id="results-heading">Setups for your celebration</h1>
          <p className="step-label" style={{ textAlign: 'center', marginBottom: 24 }}>{resultSummary}</p>
          {results.length > 0 ? (
            <div className="results-grid">
              {results.map((setup) => <SetupCard key={setup.id} setup={setup} />)}
            </div>
          ) : (
            <p className="empty-state">We don't have a setup matching that exact combination yet. Start over to explore another event or budget.</p>
          )}
          <div className="actions" style={{ marginTop: 28 }}>
            <button className="btn" type="button" onClick={startOver}>Start Over</button>
          </div>
        </section>
      )}
    </main>
  );
}
