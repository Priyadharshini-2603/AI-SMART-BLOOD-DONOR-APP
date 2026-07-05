export default function Analytics() {
  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>Predictive Analytics</h1>
        <p>AI-driven forecasts for blood demand and supply volatility.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card glass-card">
          <span className="stat-label">Predicted Demand (Next 30d)</span>
          <span className="stat-value">2,450 U</span>
          <span className="stat-change positive">↑ 12% Seasonal Increase</span>
        </div>
        <div className="stat-card glass-card">
          <span className="stat-label">Supply Longevity</span>
          <span className="stat-value">14 Days</span>
          <span className="stat-change negative">↓ 2 Days from Avg</span>
        </div>
        <div className="stat-card glass-card">
          <span className="stat-label">AI Confidence Score</span>
          <span className="stat-value">94.2%</span>
          <span className="stat-change">Optimized Model</span>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="glass-card chart-large">
          <h3>National Demand Forecast (AI Model v4.2)</h3>
          <div className="forecast-chart mt-4">
            <svg viewBox="0 0 800 200" className="chart-svg">
              {/* Mock Area Chart Path */}
              <path 
                d="M0 150 Q 100 120, 200 140 T 400 80 T 600 100 T 800 40 L 800 200 L 0 200 Z" 
                fill="rgba(230, 57, 70, 0.1)" 
                stroke="var(--primary)" 
                strokeWidth="3"
              />
              <circle cx="200" cy="140" r="5" fill="var(--primary)" />
              <circle cx="400" cy="80" r="5" fill="var(--primary)" />
              <circle cx="800" cy="40" r="5" fill="var(--primary)" />
            </svg>
            <div className="chart-labels">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4 (Forecast)</span>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h3>Risk Factor Analysis</h3>
          <ul className="risk-list mt-4">
            <li>
              <span className="risk-label">O- Shortage Risk</span>
              <div className="risk-bar"><div className="risk-fill high" style={{width: '85%'}}></div></div>
            </li>
            <li>
              <span className="risk-label">Logistics Delay</span>
              <div className="risk-bar"><div className="risk-fill med" style={{width: '45%'}}></div></div>
            </li>
            <li>
              <span className="risk-label">Donor Fatigue</span>
              <div className="risk-bar"><div className="risk-fill low" style={{width: '20%'}}></div></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
