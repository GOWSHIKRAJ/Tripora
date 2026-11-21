import { useState } from 'react'
import { destinations, categories } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import MultiSelect from '../components/MultiSelect'
import { PREFERENCE_OPTIONS } from '../utils/prefs'
export default function Profile() {
  const { profile, setProfile } = useTrip()
  const [f, setF] = useState(profile)
  const [msg, setMsg] = useState('')
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setMsg('') }
  const submit = (e) => { e.preventDefault(); setProfile({ ...f, name: f.name.trim() || 'Traveller' }); setMsg('Profile saved in this browser.') }
  return (
    <main className="page">
      <span className="eyebrow">Account</span>
      <h1>Profile</h1>
      <p className="muted">This is a demo profile stored only in your browser. There is no account or sign-in.</p>
      <form className="form" onSubmit={submit}>
        <div className="avatar wide" aria-hidden="true">{(f.name || 'T').trim().charAt(0).toUpperCase()}</div>
        <label>Name<input value={f.name} onChange={set('name')} /></label>
        <label>Email<input type="email" value={f.email} onChange={set('email')} /></label>
        <label>Preferred category<select value={f.category} onChange={set('category')}><option value="">None</option>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Favourite destination<select value={f.favourite} onChange={set('favourite')}><option value="">None</option>{destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
        <div className="wide"><MultiSelect label="Travel preferences" options={PREFERENCE_OPTIONS} value={f.prefs} onChange={(prefs) => { setF({ ...f, prefs }); setMsg('') }} placeholder="Choose what you enjoy" hint="New trips start with these preferences selected." /></div>
        <button className="btn wide" type="submit">Save profile</button>
        {msg && <p className="ok wide" role="status">{msg}</p>}
      </form>
    </main>
  )
}
