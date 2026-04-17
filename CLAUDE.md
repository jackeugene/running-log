# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

`npm` is at `/usr/local/bin/npm` — it is not on the default PATH, so prefix commands with `export PATH="/usr/local/bin:$PATH" &&` or use the full path.

```bash
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # production build to dist/
npm run lint      # ESLint
npm run preview   # preview production build locally
```

No test suite is configured.

## Git Workflow

After every change, commit and push to GitHub with a clear, descriptive commit message. Use `export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"` before `git` and `gh` commands.

```bash
git add <files>
git commit -m "short description of what changed and why"
git push
```

Always push immediately after committing — the goal is to keep GitHub in sync as a saved version after every task.

## Architecture

Single-page React app. No backend — all data persists in `localStorage` via `src/utils/storage.js`. No router; tab navigation is driven by `activeTab` state in `App.jsx`.

**State ownership:** `App.jsx` owns the `entries` array (hydrated from localStorage on mount via lazy `useState` initializer), passes `addEntry`/`deleteEntry` handlers down as props, and syncs to localStorage via `useEffect`.

**Data model** (`localStorage` key: `runningLog_entries`):
```js
{ id, date, route, duration, miles, weather, feeling, notes }
```
`date` is stored as ISO string `"YYYY-MM-DD"`. `miles` is a float.

**Key files:**
- `src/utils/weeklyAggregation.js` — pure function that buckets entries into the last N ISO weeks using `date-fns` (`getISOWeek` + `getISOWeekYear` for correct year-boundary handling)
- `src/styles/app.css` — all styling; color scheme is controlled by CSS custom properties `--accent` and `--accent-dark` at the top of `:root`
- `src/components/WeeklyChart.jsx` — Recharts `BarChart`; the bar `fill` color must be updated manually to match `--accent` when the color scheme changes
