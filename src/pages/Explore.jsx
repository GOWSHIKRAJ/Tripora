import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { destinations, categories } from '../data/destinations'
import DestinationCard from '../components/DestinationCard'
import EmptyState from '../components/EmptyState'
const countries = [...new Set(destinations.map((d) => d.country))].sort()
export default function Explore() {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') || '', cat = sp.get('cat') || '', country = sp.get('country') || '', budget = sp.get('budget') || '', sort = sp.get('sort') || 'name'
  const set = (k, v) => { const n = new URLSearchParams(sp); if (v) n.set(k, v); else n.delete(k); setSp(n, { replace: true }) }
  const list = useMemo(() => destinations
    .filter((d) => (!q || `${d.name} ${d.country}`.toLowerCase().includes(q.toLowerCase())) && (!cat || d.category === cat) && (!country || d.country === country) && (!budget || d.budget <= +budget))
    .sort((a, b) => (sort === 'budget' ? a.budget - b.budget : a.name.localeCompare(b.name))), [q, cat, country, budget, sort])
  return (
    <main className="page">
      <span className="eyebrow">Discover</span>
      <h1>Explore destinations</h1>
      <div className="filters">
        <input aria-label="Search" placeholder="Search name or country" value={q} onChange={(e) => set('q', e.target.value)} />
        <select aria-label="Category" value={cat} onChange={(e) => set('cat', e.target.value)}><option value="">All categories</option>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        <select aria-label="Country" value={country} onChange={(e) => set('country', e.target.value)}><option value="">All countries</option>{countries.map((c) => <option key={c}>{c}</option>)}</select>
        <select aria-label="Budget" value={budget} onChange={(e) => set('budget', e.target.value)}><option value="">Any budget</option><option value="50000">Under ₹50,000</option><option value="100000">Under ₹1,00,000</option><option value="200000">Under ₹2,00,000</option></select>
        <select aria-label="Sort" value={sort} onChange={(e) => set('sort', e.target.value)}><option value="name">Sort by name</option><option value="budget">Sort by budget</option></select>
        <button className="btn ghost dark" onClick={() => setSp({})}>Clear all</button>
      </div>
      <p className="muted" aria-live="polite">{list.length} of {destinations.length} destinations</p>
      {list.length ? <div className="grid">{list.map((d, i) => <DestinationCard key={d.id} d={d} index={i} />)}</div> : <EmptyState title="No matches" text="Try removing a filter." />}
    </main>
  )
}
