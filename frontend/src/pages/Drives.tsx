export default function Drives() {
  const drives = [
    { location: "City Square Mall", date: "July 12, 2026", goal: "200 Units", status: "Confirmed" },
    { location: "Federal University", date: "July 15, 2026", goal: "500 Units", status: "Planning" },
    { location: "Westside Tech Park", date: "July 18, 2026", goal: "150 Units", status: "Confirmed" },
  ];

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>Donation Drives</h1>
        <p>Upcoming blood collection events and scheduling.</p>
      </header>

      <div className="drives-list">
        {drives.map((drive, i) => (
          <div key={i} className="drive-card glass-card">
            <div className="drive-info">
              <h3>{drive.location}</h3>
              <span className="drive-date">{drive.date}</span>
            </div>
            <div className="drive-stats">
              <span className="drive-goal">Target: {drive.goal}</span>
              <span className={`status-badge ${drive.status.toLowerCase()}`}>{drive.status}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="cta-button mt-4">Organize New Drive</button>
    </div>
  );
}
