import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { aggregateByWeek } from '../utils/weeklyAggregation';

export default function WeeklyChart({ entries }) {
  const weeklyData = aggregateByWeek(entries, 12);
  const hasData = entries.length > 0;

  return (
    <div className="card">
      <h2>Weekly Miles</h2>
      <p className="chart-subtitle">Total miles per calendar week (last 12 weeks)</p>
      {!hasData && (
        <p className="empty-state">Log some runs to see your weekly mileage chart.</p>
      )}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis unit=" mi" tick={{ fontSize: 12 }} width={55} />
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(1)} mi`, 'Miles']}
              labelFormatter={(label) => `Week of ${label}`}
            />
            <Bar dataKey="miles" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
