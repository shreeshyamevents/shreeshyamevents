const BUDGETS = ['Under ₹1 Lakh', '₹1L - ₹3L', '₹3L - ₹5L', 'Above ₹5L'];

export default function BudgetSelector({ budget, onSelect }) {
  return (
    <div className="grid" role="radiogroup" aria-label="Choose your estimated budget">
      {BUDGETS.map((option) => (
        <button
          className={`option-card${budget === option ? ' selected' : ''}`}
          type="button"
          key={option}
          role="radio"
          aria-checked={budget === option}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
