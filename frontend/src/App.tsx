import { useState } from 'react'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Emergency from './pages/Emergency'
import Drives from './pages/Drives'
import Requests from './pages/Requests'
import Analytics from './pages/Analytics'
import Donors from './pages/Donors'
import Login from './pages/Login'
import { useEffect } from 'react'
import './App.css'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

function LandingPage() {
  const navigate = useNavigate()
  return (
    <section className="hero-section">
      <div className="hero-content animate-fade-in">
        <h1>Save Lives with AI-Powered Precision</h1>
        <p>The most advanced Blood Management System for government healthcare.</p>
        <button className="cta-button" onClick={() => navigate('/dashboard')}>Launch System →</button>
      </div>
    </section>
  )
}

function MainApp() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const { isAuthenticated, logout } = useAuth()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="app-container">
      <nav className="navbar animate-fade-in glass-card">
        <Link to="/" className="logo">
          <div className="logo-icon">❤️</div>
          <span>SmartBlood AI</span>
        </Link>

        {isAuthenticated && (
          <div className="activity-ticker glass-card">
            <span className="ticker-label">LIVE FEED:</span>
            <div className="ticker-content">
              <span>🚑 Dispatch 42-A Accepted by Central City Hospital</span>
              <span className="separator">•</span>
              <span>🩸 Stock Alert: O- Critical in North Sector</span>
              <span className="separator">•</span>
              <span>🚁 Drone Delivered Units to East Hub</span>
            </div>
          </div>
        )}

        {isAuthenticated && (
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/donors" className="nav-link">Find Donors</Link>
            <Link to="/requests" className="nav-link">Requests</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/analytics" className="nav-link">Analytics</Link>
            <Link to="/emergency" className="nav-link emergency-text">Emergency</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={logout} className="nav-link logout-btn">Logout</button>
          </div>
        )}

        {!isAuthenticated && (
          <div className="nav-links">
            <Link to="/login" className="nav-link">Sign In</Link>
          </div>
        )}

        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu glass-card animate-fade-in shadow-lg">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/requests" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Requests</Link>
              <Link to="/inventory" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Inventory</Link>
              <Link to="/analytics" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Analytics</Link>
              <Link to="/donors" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Find Donors</Link>
              <Link to="/emergency" className="nav-link emergency-text" onClick={() => setIsMobileMenuOpen(false)}>Emergency</Link>
              <button onClick={logout} className="nav-link">Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
          )}
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
          <Route path="/drives" element={<ProtectedRoute><Drives /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2026 SmartBlood AI Systems. Empowering National Healthcare.</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  )
}
