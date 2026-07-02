import React, { useState, useEffect } from 'react'
import api from './api/axios.js'
import Dashboard from './pages/daskboard.jsx'
import AIChat from './pages/aichat.jsx'

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('login')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/auth/me').then((res) => {
        setUser(res.data)
        setPage('dashboard')
      }).catch(() => {
        localStorage.removeItem('token')
      })
    }
  }, [])

  const handleAuth = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isRegister) {
        await api.post('/auth/register', { email, username, password })
      }
      const res = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', res.data.access_token)
      const me = await api.get('/auth/me')
      setUser(me.data)
      setPage('dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setPage('login')
  }

  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#e91e63' }}>FeMCaRe AI</h1>
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2>{isRegister ? 'Register' : 'Login'}</h2>
          {isRegister && (
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ padding: 10, fontSize: 16 }} required />
          )}
          <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            style={{ padding: 10, fontSize: 16 }} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10, fontSize: 16 }} required />
          {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
          <button type="submit" style={{ padding: 12, fontSize: 16, background: '#e91e63', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            {isRegister ? 'Register' : 'Login'}
          </button>
          <button type="button" onClick={() => { setIsRegister(!isRegister); setError('') }}
            style={{ padding: 8, background: 'none', border: 'none', color: '#e91e63', cursor: 'pointer' }}>
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#fafafa' }}>
      <nav style={{ background: '#e91e63', padding: '12px 24px', display: 'flex', gap: 20, alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#fff' }}>FeMCaRe AI</h2>
        <button onClick={() => setPage('dashboard')} style={{ background: page === 'dashboard' ? '#fff' : 'transparent', color: page === 'dashboard' ? '#e91e63' : '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Dashboard</button>
        <button onClick={() => setPage('chat')} style={{ background: page === 'chat' ? '#fff' : 'transparent', color: page === 'chat' ? '#e91e63' : '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>AI Chat</button>
        <span style={{ marginLeft: 'auto', color: '#fff' }}>{user.username}</span>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Logout</button>
      </nav>
      <div style={{ padding: 24 }}>
        {page === 'dashboard' && <Dashboard />}
        {page === 'chat' && <AIChat />}
      </div>
    </div>
  )
}
