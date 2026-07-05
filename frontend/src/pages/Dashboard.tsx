import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>System Dashboard</h1>
        <p>Real-time overview of national blood supply and demand.</p>
      </header>

      <div className="stats-grid">
        <div 
          className="stat-card glass-card clickable" 
          onClick={() => navigate('/inventory')}
        >
          <div className="card-header">
            <span className="stat-label">Total Units</span>
            <span className="icon-small">↗</span>
          </div>
          <span className="stat-value">12,482</span>
          <span className="stat-change positive">+4.2% from yesterday</span>
        </div>

        <div 
          className="stat-card glass-card clickable border-emergency"
          onClick={() => navigate('/emergency')}
        >
          <div className="card-header">
            <span className="stat-label">Critical Alerts</span>
            <span className="icon-small">↗</span>
          </div>
          <span className="stat-value">3</span>
          <span className="stat-change negative">Immediate action required</span>
        </div>

        <div 
          className="stat-card glass-card clickable"
          onClick={() => navigate('/drives')}
        >
          <div className="card-header">
            <span className="stat-label">Upcoming Drives</span>
            <span className="icon-small">↗</span>
          </div>
          <span className="stat-value">18</span>
          <span className="stat-change">Next 7 days</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-placeholder glass-card">
          <h3>Blood Supply Trends (30 Days)</h3>
          <div className="mock-chart">
            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
              <div key={i} className="bar" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
