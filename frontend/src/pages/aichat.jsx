import React, { useState } from 'react'
import api from '../api/axios.js'

export default function AIChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await api.post('/ai/chat', { message: userMsg.content })
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>AI Chat</h2>
      <p style={{ color: '#666', marginTop: -8 }}>Ask about menstrual health, cycle tracking, symptoms, and wellness.</p>
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #eee', minHeight: 400, padding: 16, marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
        {messages.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center', margin: 'auto' }}>Start a conversation! Try asking about periods, symptoms, or diet tips.</p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#e91e63' : '#f5f5f5', color: m.role === 'user' ? '#fff' : '#333', padding: '8px 14px', borderRadius: 16, maxWidth: '80%', fontSize: 14 }}>
            {m.content}
          </div>
        ))}
        {loading && <div style={{ alignSelf: 'flex-start', background: '#f5f5f5', padding: '8px 14px', borderRadius: 16, fontSize: 14, color: '#999' }}>Typing...</div>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask a question..."
          style={{ flex: 1, padding: 10, fontSize: 14, border: '1px solid #ddd', borderRadius: 4 }}
          disabled={loading} />
        <button onClick={send} disabled={loading}
          style={{ padding: '10px 20px', background: '#e91e63', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Send
        </button>
      </div>
    </div>
  )
}
