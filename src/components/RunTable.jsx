export default function RunTable({ entries, deleteEntry }) {
  if (entries.length === 0) {
    return <p className="empty-state">No runs logged yet. Add your first run!</p>;
  }

  function handleDelete(id) {
    if (window.confirm('Delete this run entry?')) deleteEntry(id);
  }

  return (
    <div className="table-wrapper">
      <table className="run-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Route</th>
            <th>Duration</th>
            <th>Miles</th>
            <th>Weather</th>
            <th>Feeling</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.route || 'Home Course'}</td>
              <td>{entry.duration || '—'}</td>
              <td>{Number(entry.miles).toFixed(2)}</td>
              <td>{entry.weather}</td>
              <td>{entry.feeling}</td>
              <td className="notes-cell">{entry.notes || '—'}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(entry.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
