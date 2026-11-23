const MIN_BUDGET = 50000;
const MAX_BUDGET = 1000000;
const BUDGET_STEP = 25000;

const formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(value);

export default function BudgetSlider({ budget, onChange }) {
  return (
    <div className="budget-slider">
      <output className="budget-value" htmlFor="event-budget" aria-live="polite">
        {formatCurrency(budget)}
      </output>
      <label className="sr-only" htmlFor="event-budget">Estimated event budget</label>
      <input
        className="budget-range"
        id="event-budget"
        type="range"
        min={MIN_BUDGET}
        max={MAX_BUDGET}
        step={BUDGET_STEP}
        value={budget}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={formatCurrency(budget)}
      />
      <div className="budget-range-labels" aria-hidden="true">
        <span>{formatCurrency(MIN_BUDGET)}</span>
        <span>{formatCurrency(MAX_BUDGET)}</span>
      </div>
    </div>
  );
}
