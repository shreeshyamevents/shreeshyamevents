const EVENTS = ['Haldi', 'Mehandi', 'Sangeet', 'Entry', 'Stage', 'Reception'];

export default function EventSelector({ selectedEvents, onSelect }) {
  return (
    <div className="grid" role="group" aria-label="Choose one or more events">
      {EVENTS.map((event) => {
        const selected = selectedEvents.includes(event);
        return (
          <button
            className={`option-card${selected ? ' selected' : ''}`}
            type="button"
            key={event}
            aria-pressed={selected}
            onClick={() => onSelect(event)}
          >
            {event}
          </button>
        );
      })}
    </div>
  );
}
