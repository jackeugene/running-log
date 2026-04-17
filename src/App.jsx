import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import LogEntryForm from './components/LogEntryForm';
import Dashboard from './components/Dashboard';
import WeeklyChart from './components/WeeklyChart';
import { loadEntries, saveEntries } from './utils/storage';
import './styles/app.css';

export default function App() {
  const [entries, setEntries] = useState(() => loadEntries());
  const [activeTab, setActiveTab] = useState('log');

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  function addEntry(formData) {
    setEntries((prev) => [...prev, { ...formData, id: crypto.randomUUID() }]);
  }

  function deleteEntry(id) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {activeTab === 'log' && <LogEntryForm addEntry={addEntry} />}
        {activeTab === 'history' && <Dashboard entries={entries} deleteEntry={deleteEntry} />}
        {activeTab === 'weekly' && <WeeklyChart entries={entries} />}
      </main>
    </>
  );
}
