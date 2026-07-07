import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mfaCode, setMfaCode] = useState('')
  const [showMfa, setShowMfa] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication check
    try {
      const res = await fetch('https://ai-smart-blood-donor-app.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (res.ok) {
        // Instead of immediate login, show MFA
        setShowMfa(true)
        setError('')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Connection refused')
    }
  }

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock MFA verification (OTP: 123456)
    if (mfaCode === '123456') {
       // Proceed with login
       fetch('https://ai-smart-blood-donor-app.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      }).then(res => res.json()).then(data => {
        login(data.token)
        navigate('/dashboard')
      })
    } else {
      setError('Invalid MFA Code. Hint: Use 123456')
    }
  }

  return (
    <div className="page-container flex-center">
      <div className="login-card glass-card animate-fade-in shadow-xl">
        <header className="mb-6">
          <div className="logo-icon mb-4 mx-auto">❤️</div>
          <h2 className="text-center">Government Health Portal</h2>
          <p className="text-center text-sm opacity-70">Enter credentials to access secure systems.</p>
        </header>

        {!showMfa ? (
          <form onSubmit={handleInitialSubmit}>
            <div className="input-group">
              <label>Administrator ID</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="admin"
                required 
              />
            </div>
            <div className="input-group">
              <label>Secure Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="admin123"
                required 
              />
            </div>
            {error && <p className="error-text mb-4">{error}</p>}
            <button type="submit" className="cta-button w-full">Authenticated Sign In</button>
            <div className="mt-4 text-center">
               <button type="button" className="text-sm opacity-50 underline">Login with Active Directory (SSO)</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleMfaSubmit} className="animate-fade-in">
            <div className="input-group">
              <label>Multi-Factor Authentication</label>
              <p className="text-xs mb-4 opacity-70">A secure code has been sent to your registered device.</p>
              <input 
                type="text" 
                value={mfaCode} 
                onChange={(e) => setMfaCode(e.target.value)} 
                placeholder="000000"
                maxLength={6}
                className="text-center font-bold text-2xl tracking-widest letter-spacing-lg"
                required 
                autoFocus
              />
            </div>
            {error && <p className="error-text mb-4">{error}</p>}
            <button type="submit" className="cta-button w-full">Verify & Access</button>
            <button 
              type="button" 
              onClick={() => setShowMfa(false)} 
              className="mt-4 text-center w-full opacity-50 text-sm"
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
