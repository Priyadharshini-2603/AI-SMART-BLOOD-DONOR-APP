import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useAuth } from '../context/AuthContext'

// Fix for default marker icon issues
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Donor {
  id: number;
  name: string;
  bloodType: string;
  latitude: number;
  longitude: number;
  city: string;
}

export default function Donors() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)
  const [bloodFilter, setBloodFilter] = useState('ALL')
  const [distanceFilter, setDistanceFilter] = useState(50)
  const { token } = useAuth()

  // Center point for reference (Center of NY)
  const centerPoint: [number, number] = [40.7128, -74.0060];

  useEffect(() => {
    fetch('http://localhost:8080/api/donors', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setDonors(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch donors:', err)
        setLoading(false)
      })
  }, [])

  // Basic distance calculation (Haversine simplified for demo)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      const matchesBlood = bloodFilter === 'ALL' || donor.bloodType === bloodFilter;
      const distance = calculateDistance(centerPoint[0], centerPoint[1], donor.latitude, donor.longitude);
      const matchesDistance = distance <= distanceFilter;
      return matchesBlood && matchesDistance;
    });
  }, [donors, bloodFilter, distanceFilter]);

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>Nearby Donors & Logistics</h1>
        <p>Advanced filtering and real-time movement monitoring.</p>
      </header>

      <div className="map-controls glass-card">
        <div className="filter-group">
          <label>Blood Type:</label>
          <select value={bloodFilter} onChange={e => setBloodFilter(e.target.value)}>
            <option value="ALL">All Types</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Distance ({distanceFilter} km):</label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={distanceFilter} 
            onChange={e => setDistanceFilter(parseInt(e.target.value))} 
          />
        </div>

        <div className="filter-group">
          <span className="text-secondary font-bold">{filteredDonors.length} Donors Found</span>
        </div>
      </div>

      <div className="map-view glass-card">
        {loading ? (
          <div className="loading-state">Initializing satellite mapping...</div>
        ) : (
          <MapContainer 
            center={centerPoint} 
            zoom={12} 
            style={{ height: '500px', width: '100%', borderRadius: '20px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredDonors.map(donor => (
              <Marker key={donor.id} position={[donor.latitude, donor.longitude]}>
                <Popup>
                  <div className="donor-popup">
                    <strong>{donor.name}</strong>
                    <p>Type: {donor.bloodType}</p>
                    <p>Distance: {calculateDistance(centerPoint[0], centerPoint[1], donor.latitude, donor.longitude).toFixed(1)} km</p>
                    <div className="flex gap-2 mt-2">
                       <button className="cta-button mini">Call</button>
                       <button className="cta-button mini secondary">Route</button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      <div className="donor-list mt-4 grid-2col">
        {filteredDonors.map(donor => (
          <div key={donor.id} className="glass-card donor-list-item">
             <div className="donor-initials">{donor.name.charAt(0)}</div>
             <div>
               <h3>{donor.name}</h3>
               <p className="text-accent">{donor.bloodType} • {donor.city}</p>
               <span className="text-sm opacity-70">ETA: 12 mins via Medical Courier</span>
             </div>
             <button className="table-btn ml-auto">Initiate Chat</button>
          </div>
        ))}
      </div>
    </div>
  )
}
