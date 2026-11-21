import { useEffect, useState } from 'react'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Trash2 } from 'lucide-react'
import { load, save, uid, inr } from '../utils/storage'
Chart.register(ArcElement, Tooltip, Legend)
const COLORS = ['#102C35', '#164E59', '#247A7B', '#8FBFB3', '#D7A66B', '#A67B45', '#5F8F96', '#C9D9D3']
const initial = () => ({ travellers: 1, items: ['Accommodation', 'Transportation', 'Food', 'Activities', 'Shopping', 'Miscellaneous'].map((name) => ({ id: uid(), name, amount: '' })) })
export default function Budget() {
  const [s, setS] = useState(() => load('tripora:budget', null) || initial())
  const [name, setName] = useState('')
  const [err, setErr] = useState('')
  useEffect(() => save('tripora:budget', s), [s])
  const total = s.items.reduce((t, i) => t + (+i.amount || 0), 0)
  const trav = Math.max(1, Math.floor(+s.travellers) || 1)
  const setAmt = (id, v) => setS({ ...s, items: s.items.map((i) => (i.id === id ? { ...i, amount: v === '' ? '' : Math.max(0, +v) } : i)) })
  const add = (e) => {
    e.preventDefault()
    const n = name.trim()
    if (!n) return setErr('Enter a category name.')
    if (s.items.some((i) => i.name.toLowerCase() === n.toLowerCase())) return setErr('That category already exists.')
    setS({ ...s, items: [...s.items, { id: uid(), name: n, amount: '' }] }); setName(''); setErr('')
  }
  const data = { labels: s.items.map((i) => i.name), datasets: [{ data: s.items.map((i) => +i.amount || 0), backgroundColor: s.items.map((_, i) => COLORS[i % COLORS.length]), borderWidth: 2, borderColor: '#F7F5EF' }] }
  return (
    <main className="page">
      <h1>Budget calculator</h1>
      <div className="stats"><div className="stat"><strong>{inr(total)}</strong><span className="muted">Total budget</span></div><div className="stat"><strong>{inr(total / trav)}</strong><span className="muted">Per traveller</span></div>
        <label className="stat">Travellers<input type="number" min="1" value={s.travellers} onChange={(e) => setS({ ...s, travellers: e.target.value })} /></label></div>
      <div className="two">
        <div>
          {s.items.map((i) => (
            <div key={i.id} className="expense"><label htmlFor={i.id}>{i.name}</label><input id={i.id} type="number" min="0" placeholder="₹0" value={i.amount} onChange={(e) => setAmt(i.id, e.target.value)} />
              <span className="muted">{total ? Math.round(((+i.amount || 0) / total) * 100) : 0}%</span>
              <button className="icon-link" aria-label={`Remove ${i.name}`} onClick={() => setS({ ...s, items: s.items.filter((x) => x.id !== i.id) })}><Trash2 size={16} /></button></div>))}
          <form className="expense" onSubmit={add}><input aria-label="Custom category" placeholder="Custom category" value={name} onChange={(e) => setName(e.target.value)} /><button className="btn ghost dark" type="submit">Add</button></form>
          {err && <span className="err" role="alert">{err}</span>}
          <button className="btn ghost dark" onClick={() => setS(initial())}>Reset calculator</button>
        </div>
        <div className="facts">{total > 0 ? <Doughnut data={data} options={{ plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: (c) => `${c.label}: ${inr(c.parsed)}` } } } }} /> : <p className="muted">Enter an amount to see your breakdown.</p>}</div>
      </div>
    </main>
  )
}
