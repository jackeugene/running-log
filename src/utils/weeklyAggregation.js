import {
  getISOWeek,
  getISOWeekYear,
  startOfISOWeek,
  format,
  parseISO,
  subWeeks,
} from 'date-fns';

export function aggregateByWeek(entries, numWeeks = 12) {
  const today = new Date();
  const weeks = [];

  for (let i = numWeeks - 1; i >= 0; i--) {
    const weekStart = startOfISOWeek(subWeeks(today, i));
    const year = getISOWeekYear(weekStart);
    const week = getISOWeek(weekStart);
    const key = `${year}-W${String(week).padStart(2, '0')}`;
    weeks.push({ key, label: format(weekStart, 'MMM d'), miles: 0 });
  }

  const weekMap = new Map(weeks.map((w) => [w.key, w]));

  for (const entry of entries) {
    if (!entry.date || !entry.miles) continue;
    const d = parseISO(entry.date);
    const key = `${getISOWeekYear(d)}-W${String(getISOWeek(d)).padStart(2, '0')}`;
    if (weekMap.has(key)) {
      weekMap.get(key).miles += Number(entry.miles);
    }
  }

  return weeks;
}
