import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { destinations } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { inr } from '../utils/storage'
import { todayISO, formatDate, dayCount } from '../utils/dates'
import { Img } from '../components/Img'
import EmptyState from '../components/EmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
function TripCard({ t, onDelete }) {
  const [open, setOpen] = useState(false)
  const d = destinations.find((x) => x.id === t.dest)
  const acts = [...t.activities].sort((a, b) => a.day - b.day || (a.time || '').localeCompare(b.time || ''))
  const n = dayCount(t.start, t.end)
  return (
    <motion.article layout className="trip" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
      {d && <div className="trip-img"><Img src={d.image} alt={`${d.name}, ${d.country}`} category={d.category} /></div>}
      <div className="trip-body">
        <h3>{t.name}</h3>
        <p className="muted">{d ? `${d.name}, ${d.country}` : 'Destination'} · {t.start === t.end ? formatDate(t.start) : `${formatDate(t.start)} to ${formatDate(t.end)}`} · {n === 1 ? 'same day' : `${n} days`} · {t.travellers} traveller{t.travellers > 1 ? 's' : ''}</p>
        <p><strong>{inr(t.budget)}</strong> · {acts.length} planned activit{acts.length === 1 ? 'y' : 'ies'}</p>
        {t.prefs?.length > 0 && <ul className="tags" aria-label="Preferences">{t.prefs.map((p) => <li key={p}><span className="tag">{p}</span></li>)}</ul>}
        <AnimatePresence initial={false}>
          {open && <motion.ul className="timeline" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>{acts.length ? acts.map((x) => <li key={x.id}><b>Day {x.day}{x.time && `, ${x.time}`}</b> {x.title}</li>) : <li className="muted">No activities yet.</li>}</motion.ul>}
        </AnimatePresence>
        <div className="row-btns">
          <button className="btn ghost dark" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Hide details' : 'View details'}</button>
          <Link className="btn ghost dark" to={`/planner?edit=${t.id}`}>Edit</Link>
          <button className="btn ghost dark" onClick={() => onDelete(t)}>Delete</button>
        </div>
      </div>
    </motion.article>
  )
}
export default function MyTrips() {
  const { trips, deleteTrip, wishlist, profile } = useTrip()
  const { state } = useLocation()
  const [pending, setPending] = useState(null)
  const today = todayISO()
  const up = trips.filter((t) => t.end >= today).sort((a, b) => a.start.localeCompare(b.start))
  const done = trips.filter((t) => t.end < today)
  const stats = [['Planned trips', trips.length], ['Upcoming', up.length], ['Completed', done.length], ['Saved destinations', wishlist.length], ['Total budget', inr(trips.reduce((s, t) => s + (+t.budget || 0), 0))]]
  return (
    <main className="page">
      <span className="eyebrow">Dashboard</span>
      <h1>Welcome back, {profile.name || 'Traveller'}</h1>
      {state?.notice && <p className="notice ok-note" role="status">{state.notice}</p>}
      <div className="stats">{stats.map(([l, v]) => <div key={l} className="stat"><strong>{v}</strong><span className="muted">{l}</span></div>)}</div>
      {trips.length === 0 ? <EmptyState title="No trips yet" text="Pick a destination and build your first itinerary." to="/planner" cta="Plan a trip" /> : (
        <>
          <h2>Upcoming trips</h2>{up.length ? <div className="grid"><AnimatePresence>{up.map((t) => <TripCard key={t.id} t={t} onDelete={setPending} />)}</AnimatePresence></div> : <p className="muted">No upcoming trips.</p>}
          <h2>Completed trips</h2>{done.length ? <div className="grid"><AnimatePresence>{done.map((t) => <TripCard key={t.id} t={t} onDelete={setPending} />)}</AnimatePresence></div> : <p className="muted">No completed trips.</p>}
        </>)}
      <ConfirmDialog open={!!pending} title="Delete this trip?" text={pending ? `“${pending.name}” and its itinerary will be removed from this browser. This can’t be undone.` : ''} confirmLabel="Delete trip"
        onCancel={() => setPending(null)} onConfirm={() => { deleteTrip(pending.id); setPending(null) }} />
    </main>
  )
}
