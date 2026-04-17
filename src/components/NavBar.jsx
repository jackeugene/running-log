export default function NavBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'log', label: 'Log a Run' },
    { id: 'history', label: 'History' },
    { id: 'weekly', label: 'Weekly Miles' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">Running Log</div>
      <div className="navbar-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
