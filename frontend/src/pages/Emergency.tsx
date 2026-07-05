import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface Alert {
  id: number;
  type: string;
  hospitalName: string;
  description: string;
  urgency: string;
  timestamp: string;
}

export default function Emergency() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  const { token } = useAuth()

  useEffect(() => {
    fetch('http://localhost:8080/api/alerts', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setAlerts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch alerts:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1 className="text-emergency">Emergency Response Center</h1>
        <p>Active critical alerts requiring immediate dispatch.</p>
      </header>

      {loading ? (
        <div className="loading-state">Monitoring emergency channel...</div>
      ) : (
        <div className="emergency-alerts">
          {alerts.map((alert) => (
            <div key={alert.id} className={`alert-card glass-card ${alert.urgency.toLowerCase()}`}>
              <div className="alert-header">
                <span className="alert-type">{alert.type}</span>
                <span className="alert-time">
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h3>{alert.hospitalName}: {alert.description}</h3>
              <div className="alert-actions">
                <button className="cta-button">Dispatch Immediately</button>
              </div>
            </div>
          ))}
          {alerts.length === 0 && <p>No active emergencies at this time.</p>}
        </div>
      )}
    </div>
  )
}
