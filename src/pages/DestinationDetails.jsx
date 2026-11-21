import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, Maximize2 } from 'lucide-react'
import { destinations } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import { inr } from '../utils/storage'
import DestinationCard from '../components/DestinationCard'
import { Img } from '../components/Img'
import Gallery, { Lightbox } from '../components/Gallery'
import EmptyState from '../components/EmptyState'
export default function DestinationDetails() {
  const { id } = useParams()
  const { wishlist, toggleWish } = useTrip()
  const [lb, setLb] = useState(null)
  const d = destinations.find((x) => x.id === id)
  if (!d) return <main className="page"><EmptyState title="Destination not found" text="That destination doesn't exist." to="/explore" cta="Back to Explore" /></main>
  const on = wishlist.includes(d.id)
  const related = destinations.filter((x) => x.category === d.category && x.id !== d.id).slice(0, 3)
  return (
    <main>
      <section className="d-hero">
        <Img src={d.image} alt={`${d.name}, ${d.country}`} category={d.category} eager />
        <div className="d-hero-in">
          <Link to="/explore" className="back"><ArrowLeft size={16} /> All destinations</Link>
          <span className="pill solid">{d.category}</span>
          <h1>{d.name}</h1><p>{d.country}</p>
          <button type="button" className="btn ghost sm" onClick={() => setLb(0)}><Maximize2 size={15} /> View {d.gallery.length} photos</button>
        </div>
      </section>
      <section className="page two">
        <div><h2>Overview</h2><p>{d.description}</p>
          <h2>Attractions</h2><ul>{d.attractions.map((a) => <li key={a}>{a}</li>)}</ul>
          <h2>Highlights</h2><ul>{d.highlights.map((a) => <li key={a}>{a}</li>)}</ul></div>
        <aside className="facts">
          <p><strong>Estimated budget</strong><br />{inr(d.budget)}</p><p><strong>Best time</strong><br />{d.bestTime}</p><p><strong>Suggested duration</strong><br />{d.duration}</p>
          <button className="btn ghost dark" onClick={() => toggleWish(d.id)} aria-pressed={on}><Heart size={16} fill={on ? 'currentColor' : 'none'} /> {on ? 'Saved' : 'Add to wishlist'}</button>
          <Link className="btn" to={`/planner?dest=${d.id}`}>Plan a trip</Link>
        </aside>
      </section>
      <section className="section gallery-sec"><span className="eyebrow">Gallery</span><h2>{d.name} in pictures</h2>
        <Gallery items={d.gallery} category={d.category} name={d.name} onOpen={setLb} /></section>
      {related.length > 0 && <section className="section"><h2>Related destinations</h2><div className="grid">{related.map((r, i) => <DestinationCard key={r.id} d={r} index={i} />)}</div></section>}
      <AnimatePresence>{lb !== null && <Lightbox items={d.gallery} index={lb} onIndex={setLb} onClose={() => setLb(null)} category={d.category} name={d.name} />}</AnimatePresence>
    </main>
  )
}
