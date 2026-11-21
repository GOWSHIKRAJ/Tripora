import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Pencil, Trash2, CalendarDays, MapPin } from 'lucide-react'
import { destinations } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { uid, inr } from '../utils/storage'
import { dayCount, validateRange, todayISO } from '../utils/dates'
import { PREFERENCE_OPTIONS, normalizePrefs } from '../utils/prefs'
import MultiSelect from '../components/MultiSelect'
import { Img } from '../components/Img'
const blankAct = { id: '', day: 1, time: '', title: '', desc: '' }
const blankTrip = { name: '', dest: '', start: '', end: '', travellers: 1, prefs: [], budget: '', activities: [] }
export default function Planner() {
  const { trips, saveTrip, profile } = useTrip()
  const [sp] = useSearchParams()
  const nav = useNavigate()
  const editId = sp.get('edit')
  const existing = trips.find((t) => t.id === editId)
  const destParam = destinations.some((d) => d.id === sp.get('dest')) ? sp.get('dest') : ''
  const [f, setF] = useState(() => (existing ? { ...existing, prefs: normalizePrefs(existing.prefs) } : { ...blankTrip, dest: destParam, prefs: normalizePrefs(profile.prefs) }))
  const [a, setA] = useState(blankAct)
  const [err, setErr] = useState({})
  const days = dayCount(f.start, f.end)
  const rangeErr = f.start && f.end ? validateRange(f.start, f.end) : '' // live feedback while typing
  const dest = destinations.find((d) => d.id === f.dest)
  const orphaned = f.activities.filter((x) => +x.day > days).length
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: '' }) }
  const submitAct = () => {
    if (!a.title.trim()) return setErr({ ...err, act: 'Enter an activity title.' })
    const item = { ...a, title: a.title.trim(), day: Math.min(+a.day || 1, days) }
    setF({ ...f, activities: a.id ? f.activities.map((x) => (x.id === a.id ? item : x)) : [...f.activities, { ...item, id: uid() }] })
    setA(blankAct); setErr({ ...err, act: '' })
  }
  const submit = (e) => {
    e.preventDefault()
    const n = {}
    if (!f.name.trim()) n.name = 'Enter a trip name.'
    if (!f.dest) n.dest = 'Choose a destination.'
    if (!f.start) n.start = 'Choose a start date.'
    const re = validateRange(f.start, f.end)
    if (re) n.end = re
    if (!(Number.isInteger(+f.travellers) && +f.travellers > 0)) n.travellers = 'Travellers must be a positive whole number.'
    if (!(+f.budget > 0)) n.budget = 'Enter a budget greater than zero.'
    setErr(n)
    if (Object.keys(n).length) return
    saveTrip({ ...f, name: f.name.trim(), travellers: +f.travellers, budget: +f.budget, prefs: normalizePrefs(f.prefs), activities: f.activities.filter((x) => +x.day <= days) })
    nav('/my-trips', { state: { notice: `${existing ? 'Updated' : 'Saved'} “${f.name.trim()}”.` } })
  }
  const field = (k, label, props = {}) => (
    <label>{label}<input value={f[k]} onChange={set(k)} aria-invalid={!!(err[k] || (k === 'end' && rangeErr))} {...props} />{k === 'end' ? (err.end || rangeErr) && <span className="err" role="alert">{err.end || rangeErr}</span> : err[k] && <span className="err" role="alert">{err[k]}</span>}</label>
  )
  return (
    <main className="page">
      <span className="eyebrow">{existing ? 'Editing' : 'New journey'}</span>
      <h1>{existing ? 'Edit your trip' : 'Plan a trip'}</h1>
      {editId && !existing && <p className="notice" role="status">We couldn’t find that saved trip, so you’re starting a new one.</p>}
      <div className="plan-layout">
        <form className="form" onSubmit={submit} noValidate>
          {field('name', 'Trip name')}
          <label>Destination<select value={f.dest} onChange={set('dest')} aria-invalid={!!err.dest}><option value="">Choose…</option>{destinations.map((d) => <option key={d.id} value={d.id}>{d.name}, {d.country}</option>)}</select>{err.dest && <span className="err" role="alert">{err.dest}</span>}</label>
          {field('start', 'Start date', { type: 'date' })}
          {field('end', 'End date', { type: 'date', min: f.start || undefined })}
          <p className="wide trip-len"><CalendarDays size={16} aria-hidden="true" /> {f.start && f.end && !rangeErr ? (days === 1 ? 'Same-day trip · 1 day' : `${days} days`) : 'Pick dates to see the trip length. Same-day trips are allowed.'}</p>
          {field('travellers', 'Travellers', { type: 'number', min: 1 })}
          {field('budget', 'Estimated budget (₹)', { type: 'number', min: 1 })}
          <div className="wide"><MultiSelect label="Travel preferences" options={PREFERENCE_OPTIONS} value={f.prefs} onChange={(prefs) => setF({ ...f, prefs })} placeholder="Choose what you enjoy" /></div>
          <h2 className="wide">Itinerary</h2>
          {orphaned > 0 && <p className="notice wide" role="status">{orphaned} activit{orphaned === 1 ? 'y is' : 'ies are'} on days outside this date range and will be removed when you save.</p>}
          <div className="act-form wide">
            <select aria-label="Day" value={Math.min(+a.day || 1, days)} onChange={(e) => setA({ ...a, day: e.target.value })}>{Array.from({ length: days }, (_, i) => <option key={i} value={i + 1}>Day {i + 1}</option>)}</select>
            <input aria-label="Time" type="time" value={a.time} onChange={(e) => setA({ ...a, time: e.target.value })} />
            <input aria-label="Activity title" placeholder="Activity" value={a.title} onChange={(e) => setA({ ...a, title: e.target.value })} />
            <input aria-label="Description" placeholder="Description" value={a.desc} onChange={(e) => setA({ ...a, desc: e.target.value })} />
            <div className="act-btns"><button type="button" className="btn ghost dark" onClick={submitAct}>{a.id ? 'Update activity' : 'Add activity'}</button>{a.id && <button type="button" className="btn ghost dark" onClick={() => { setA(blankAct); setErr({ ...err, act: '' }) }}>Cancel</button>}</div>
            {err.act && <span className="err" role="alert">{err.act}</span>}
          </div>
          <div className="wide">
            {Array.from({ length: days }, (_, i) => {
              const list = f.activities.filter((x) => +x.day === i + 1).sort((x, y) => (x.time || '').localeCompare(y.time || ''))
              return (
                <div key={i} className="day"><h3>Day {i + 1}</h3>
                  {list.length === 0 && <p className="muted">No activities yet.</p>}
                  <ul className="timeline">{list.map((x) => (
                    <li key={x.id}><b>{x.time || 'Anytime'}</b> {x.title}{x.desc && <span className="muted"> — {x.desc}</span>}
                      <button type="button" className="icon-link" aria-label={`Edit ${x.title}`} onClick={() => setA(x)}><Pencil size={15} /></button>
                      <button type="button" className="icon-link" aria-label={`Delete ${x.title}`} onClick={() => setF({ ...f, activities: f.activities.filter((y) => y.id !== x.id) })}><Trash2 size={15} /></button></li>))}</ul></div>)
            })}
          </div>
          <button className="btn wide" type="submit">{existing ? 'Save changes' : 'Save trip'}</button>
        </form>
        <aside className="plan-side" aria-label="Destination preview">
          {dest ? (<div className="side-card"><div className="media"><Img src={dest.image} alt={`${dest.name}, ${dest.country}`} category={dest.category} /></div>
            <div className="side-body"><h3>{dest.name}</h3><p className="muted loc"><MapPin size={14} aria-hidden="true" /> {dest.country}</p>
              <dl><dt>Typical budget</dt><dd>{inr(dest.budget)}</dd><dt>Best time</dt><dd>{dest.bestTime}</dd><dt>Suggested</dt><dd>{dest.duration}</dd></dl></div></div>)
            : <div className="side-card side-empty"><p className="muted">Choose a destination to see its best season, typical budget and suggested length here.</p></div>}
          <p className="muted small">Today is {todayISO()}.</p>
        </aside>
      </div>
    </main>
  )
}
