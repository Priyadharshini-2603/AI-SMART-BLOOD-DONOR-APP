import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface BloodUnit {
  id: number;
  bloodType: string;
  units: number;
  status: string;
  location: string;
  expiryDays: number; // Mock field for the demo
}

export default function Inventory() {
  const [stock, setStock] = useState<BloodUnit[]>([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    fetch('http://localhost:8080/api/inventory', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        // Adding mock expiration days for the demo
        const enhancedData = data.map((item: any, i: number) => ({
          ...item,
          expiryDays: [4, 12, 2, 25][i % 4] 
        }))
        setStock(enhancedData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch inventory:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>Blood Inventory & Chain of Custody</h1>
        <p>Managed stock levels with real-time expiration tracking.</p>
        <div className="flex gap-4 mt-4">
           <button className="cta-button secondary mini">Scan QR Code</button>
           <button className="cta-button secondary mini">Generate Audit Report</button>
        </div>
      </header>

      {loading ? (
        <div className="loading-state">Syncing inventory with national database...</div>
      ) : (
        <div className="inventory-table-container glass-card">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Units Available</th>
                <th>Location</th>
                <th>Status</th>
                <th>Expiration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id}>
                  <td className="font-bold">{item.bloodType}</td>
                  <td>{item.units} Units</td>
                  <td>{item.location}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="expiration-cell">
                       <span className={item.expiryDays <= 5 ? 'critical-text' : ''}>
                         {item.expiryDays} Days
                       </span>
                       <div className="expiry-prog-bar">
                          <div 
                             className={`expiry-fill ${item.expiryDays <= 5 ? 'urgent' : ''}`} 
                             style={{ width: `${(item.expiryDays/30)*100}%` }}
                          ></div>
                       </div>
                    </div>
                  </td>
                  <td>
                    <button className="table-btn">Reserve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
