import React, { useState, useEffect } from 'react'
import api from '../api/axios.js'

export default function Dashboard() {
  const [entries, setEntries] = useState([])
  const [prediction, setPrediction] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [flow, setFlow] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [notes, setNotes] = useState('')

  const load = async () => {
    const [entriesRes, predictRes] = await Promise.all([
      api.get('/cycle/entries'),
      api.get('/cycle/predict').catch(() => null),
    ])
    setEntries(entriesRes.data)
    if (predictRes?.data) setPrediction(predictRes.data)
  }

  useEffect(() => { load() }, [])

  const addEntry = async (e) => {
    e.preventDefault()
    await api.post('/cycle/entries', {
      date: new Date(date).toISOString(),
      flow_level: flow || null,
      symptoms: symptoms || null,
      notes: notes || null,
    })
    setDate(new Date().toISOString().split('T')[0])
    setFlow('')
    setSymptoms('')
    setNotes('')
    load()
  }

  const deleteEntry = async (id) => {
    await api.delete(`/cycle/entries/${id}`)
    load()
  }

  return (
    <div>
      <h2>Cycle Dashboard</h2>

      {prediction && prediction.prediction && (
        <div style={{ background: '#e8f5e9', padding: 16, borderRadius: 8, marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 8px' }}>Prediction</h3>
          <p>Next period predicted: <strong>{new Date(prediction.prediction.next_predicted).toLocaleDateString()}</strong></p>
          <p>Average cycle: {prediction.prediction.average_cycle_length} days</p>
          <p>Fertile window: {new Date(prediction.prediction.fertile_window_start).toLocaleDateString()} - {new Date(prediction.prediction.fertile_window_end).toLocaleDateString()}</p>
        </div>
      )}

      <form onSubmit={addEntry} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400, marginBottom: 24 }}>
        <h3>Log Entry</h3>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          style={{ padding: 8, fontSize: 14 }} required />
        <select value={flow} onChange={(e) => setFlow(e.target.value)}
          style={{ padding: 8, fontSize: 14 }}>
          <option value="">Flow level</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="heavy">Heavy</option>
        </select>
        <input placeholder="Symptoms (comma separated)" value={symptoms} onChange={(e) => setSymptoms(e.target.value)}
          style={{ padding: 8, fontSize: 14 }} />
        <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)}
          style={{ padding: 8, fontSize: 14, minHeight: 60 }} />
        <button type="submit" style={{ padding: 10, background: '#e91e63', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Add Entry
        </button>
      </form>

      <h3>History</h3>
      {entries.length === 0 && <p>No entries yet. Start logging your cycle above!</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map((e) => (
          <div key={e.id} style={{ background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{new Date(e.date).toLocaleDateString()}</strong>
              {e.flow_level && <span style={{ marginLeft: 8, background: '#fce4ec', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>{e.flow_level}</span>}
              {e.symptoms && <p style={{ margin: '4px 0 0', fontSize: 13, color: '#666' }}>{e.symptoms}</p>}
              {e.notes && <p style={{ margin: '2px 0 0', fontSize: 12, color: '#999' }}>{e.notes}</p>}
            </div>
            <button onClick={() => deleteEntry(e.id)} style={{ background: 'none', border: 'none', color: '#e91e63', cursor: 'pointer', fontSize: 18 }}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  )
}
