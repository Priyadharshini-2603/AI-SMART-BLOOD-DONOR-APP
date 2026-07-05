import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

interface BloodRequest {
  id: number;
  hospitalName: string;
  bloodType: string;
  unitsRequested: number;
  urgency: string;
  status: string;
  requestDate: string;
}

export default function Requests() {
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [hospitalName, setHospitalName] = useState('')
  const [bloodType, setBloodType] = useState('A+')
  const [units, setUnits] = useState(1)
  const [urgency, setUrgency] = useState('ROUTINE')
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  const fetchRequests = () => {
    fetch('http://localhost:8080/api/requests', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setRequests(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/requests', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ hospitalName, bloodType, unitsRequested: units, urgency })
    }).then(() => {
      fetchRequests()
      setHospitalName('')
    })
  }

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>Blood Requests</h1>
        <p>Manage and track hospital blood requirement requests.</p>
      </header>

      <div className="grid-2col">
        <div className="glass-card">
          <h3>Submit New Request</h3>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="input-group">
              <label>Hospital Name</label>
              <input value={hospitalName} onChange={e => setHospitalName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Blood Type</label>
              <select value={bloodType} onChange={e => setBloodType(e.target.value)} className="custom-select">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Units Needed</label>
              <input type="number" value={units} onChange={e => setUnits(parseInt(e.target.value))} min="1" required />
            </div>
            <div className="input-group">
              <label>Urgency Level</label>
              <select value={urgency} onChange={e => setUrgency(e.target.value)} className="custom-select">
                <option value="ROUTINE">Routine</option>
                <option value="URGENT">Urgent</option>
                <option value="EMERGENCY">Emergency</option>
              </select>
            </div>
            <button type="submit" className="cta-button w-full">Submit Request</button>
          </form>
        </div>

        <div className="glass-card">
          <h3>Recent Requests</h3>
          <div className="requests-list mt-4">
            {loading ? <p>Loading...</p> : requests.map(req => (
              <div key={req.id} className="req-item">
                <div className="req-main">
                  <strong>{req.bloodType}</strong> — {req.unitsRequested} Units
                  <span className={`status-badge ${req.urgency.toLowerCase()}`}>{req.urgency}</span>
                </div>
                <div className="req-sub">
                  {req.hospitalName} • <span className="status-text">{req.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
