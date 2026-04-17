import { useState } from 'react';
import { format } from 'date-fns';

const WEATHER_OPTIONS = ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Snowy', 'Hot', 'Cold'];
const FEELING_OPTIONS = ['Great', 'Good', 'Okay', 'Tired', 'Rough'];

function emptyForm() {
  return {
    date: format(new Date(), 'yyyy-MM-dd'),
    route: 'Home Course',
    duration: '',
    miles: '',
    weather: 'Sunny',
    feeling: 'Good',
    notes: '',
  };
}

export default function LogEntryForm({ addEntry }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.date) errs.date = 'Date is required.';
    if (!form.miles || isNaN(form.miles) || Number(form.miles) <= 0)
      errs.miles = 'Enter a positive number of miles.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addEntry({ ...form, miles: parseFloat(form.miles) });
    setForm(emptyForm());
    setErrors({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className="card">
      <h2>Log a Run</h2>
      {success && <div className="alert-success">Run logged successfully!</div>}
      <form onSubmit={handleSubmit} className="run-form" noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="route">Route Name</label>
            <input
              type="text"
              id="route"
              name="route"
              placeholder="e.g. Home Course"
              value={form.route}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="e.g. 45:30"
              value={form.duration}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="miles">Miles Run</label>
            <input
              type="number"
              id="miles"
              name="miles"
              placeholder="e.g. 5.2"
              min="0"
              step="0.01"
              value={form.miles}
              onChange={handleChange}
            />
            {errors.miles && <span className="field-error">{errors.miles}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weather">Weather</label>
            <select id="weather" name="weather" value={form.weather} onChange={handleChange}>
              {WEATHER_OPTIONS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="feeling">How did you feel?</label>
            <select id="feeling" name="feeling" value={form.feeling} onChange={handleChange}>
              {FEELING_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (optional)</label>
          <input
            type="text"
            id="notes"
            name="notes"
            placeholder="Any notes about the run..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-primary">Save Run</button>
      </form>
    </div>
  );
}
