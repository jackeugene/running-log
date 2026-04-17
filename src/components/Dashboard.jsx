import RunTable from './RunTable';

export default function Dashboard({ entries, deleteEntry }) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const totalRuns = entries.length;
  const totalMiles = entries.reduce((sum, e) => sum + Number(e.miles), 0);
  const avgMiles = totalRuns > 0 ? totalMiles / totalRuns : 0;

  return (
    <div className="card">
      <h2>History</h2>
      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-value">{totalRuns}</span>
          <span className="stat-label">Total Runs</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{totalMiles.toFixed(1)}</span>
          <span className="stat-label">Total Miles</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{avgMiles.toFixed(1)}</span>
          <span className="stat-label">Avg Miles / Run</span>
        </div>
      </div>
      <RunTable entries={sorted} deleteEntry={deleteEntry} />
    </div>
  );
}
