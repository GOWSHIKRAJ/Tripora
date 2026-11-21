import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Compass, CalendarCheck, Wallet, Heart } from 'lucide-react'
import { destinations, categories } from '../data/destinations'
import DestinationCard from '../components/DestinationCard'
import { Img } from '../components/Img'
import Reveal from '../components/Reveal'
const pick = (id) => destinations.find((d) => d.id === id)
const why = [[Compass, 'Discover destinations', `Browse ${destinations.length} places by category, country and budget.`], [CalendarCheck, 'Plan personalised journeys', 'Build day-by-day itineraries you can edit any time.'], [Wallet, 'Manage travel budgets', 'Track costs in rupees and see where the money goes.'], [Heart, 'Save favourite places', 'Keep a wishlist that stays after you close the tab.']]
const stories = [['kyoto', 'Slow mornings in Kyoto', 'Start before the crowds and let the lanes wake up around you.'], ['ooty', 'Ooty on a small budget', 'Tea estates and cool air without a long-haul fare.'], ['cappadocia', 'Sunrise over Cappadocia', 'What to expect from a dawn balloon flight, and when to book.']]
const quotes = [['Aarthi R.', 'The itinerary view made our Goa trip simple to share with friends.'], ['Karan M.', 'I finally kept my budget in one place instead of three notes apps.'], ['Divya S.', 'Filtering by budget helped me shortlist a hill-station weekend fast.']]
const countries = new Set(destinations.map((d) => d.country)).size
export default function Home() {
  const nav = useNavigate()
  const [q, setQ] = useState(''), [cat, setCat] = useState(''), [bud, setBud] = useState('')
  const go = (e) => { e.preventDefault(); const p = new URLSearchParams(); if (q) p.set('q', q); if (cat) p.set('cat', cat); if (bud) p.set('budget', bud); nav(`/explore?${p}`) }
  const hero = destinations[0]
  return (
    <main>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true"><Img src={hero.image} alt="" category={hero.category} eager /></div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-in">
          <span className="eyebrow light">Travel discovery &amp; trip planning</span>
          <h1>Explore the world.<br /><em>Find your somewhere.</em></h1>
          <p>Discover extraordinary destinations, create meaningful journeys and make every trip unforgettable.</p>
          <div className="row-btns"><Link className="btn gold" to="/explore">Explore Destinations</Link><Link className="btn ghost" to="/planner">Plan Your Trip</Link></div>
          <form className="search" onSubmit={go} role="search">
            <label>Destination<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or country" /></label>
            <label>Category<select value={cat} onChange={(e) => setCat(e.target.value)}><option value="">Any</option>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
            <label>Budget<select value={bud} onChange={(e) => setBud(e.target.value)}><option value="">Any</option><option value="50000">Under ₹50,000</option><option value="100000">Under ₹1,00,000</option><option value="200000">Under ₹2,00,000</option></select></label>
            <button className="btn gold" type="submit"><Search size={18} /> Search</button>
          </form>
          <ul className="hero-stats" aria-label="Tripora at a glance">
            <li><strong>{destinations.length}</strong><span>Destinations</span></li><li><strong>{countries}</strong><span>Countries</span></li><li><strong>{categories.length}</strong><span>Experiences</span></li>
          </ul>
        </div>
      </section>
      <section className="section"><Reveal className="sec-head"><div><span className="eyebrow">Hand-picked</span><h2>Trending destinations</h2></div><Link className="link" to="/explore">View all →</Link></Reveal>
        <div className="grid">{destinations.slice(0, 6).map((d, i) => <DestinationCard key={d.id} d={d} index={i} />)}</div></section>
      <section className="section tint"><Reveal><span className="eyebrow">Find your style</span><h2>Explore by experience</h2></Reveal>
        <div className="chips">{categories.map((c) => <Link key={c} className="chip" to={`/explore?cat=${c}`}>{c}</Link>)}</div></section>
      <section className="section feature">
        <Reveal className="feature-img"><Img src={pick('switzerland').image} alt="Snow-capped Swiss Alps above a lake" category="Mountain" /></Reveal>
        <Reveal className="feature-text" delay={0.1}><span className="eyebrow">Featured journey</span><h2>Seven days across the Alps</h2><p>Scenic trains, lake towns and high-altitude viewpoints in one unhurried route. Save it, adjust it and make it yours.</p><Link className="btn gold" to="/destination/switzerland">See Switzerland</Link></Reveal>
      </section>
      <section className="section"><Reveal><span className="eyebrow">Built for planners</span><h2>Why Tripora</h2></Reveal>
        <div className="why">{why.map(([I, t, x], i) => <Reveal key={t} delay={i * 0.08} className="why-item"><span className="why-ico"><I size={24} aria-hidden="true" /></span><h3>{t}</h3><p>{x}</p></Reveal>)}</div></section>
      <section className="section tint"><Reveal><span className="eyebrow">Stories</span><h2>Travel inspiration</h2></Reveal>
        <div className="stories">{stories.map(([id, t, x], i) => <Reveal key={id} delay={i * 0.08}><Link to={`/destination/${id}`} className={`story ${i === 0 ? 'big' : ''}`}><Img src={pick(id).image} alt={pick(id).name} category={pick(id).category} /><div><h3>{t}</h3><p>{x}</p></div></Link></Reveal>)}</div></section>
      <section className="section"><Reveal><span className="eyebrow">Testimonials</span><h2>What travellers say</h2><p className="muted">Illustrative demo testimonials, not real customer reviews.</p></Reveal>
        <div className="grid">{quotes.map(([n, q], i) => <Reveal key={n} delay={i * 0.08}><blockquote className="quote"><p>{q}</p><footer>{n}</footer></blockquote></Reveal>)}</div></section>
    </main>
  )
}
