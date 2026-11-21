import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MapPin } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import { inr } from '../utils/storage'
import { Img } from './Img'
export { Img } // kept for backwards compatibility with earlier imports
export default function DestinationCard({ d, index = 0 }) {
  const { wishlist, toggleWish } = useTrip()
  const on = wishlist.includes(d.id)
  return (
    <motion.article className="card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index % 3, 2) * 0.07, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6 }}>
      <Link to={`/destination/${d.id}`} className="card-img" aria-label={`${d.name}, ${d.country}`}>
        <Img src={d.image} alt={`${d.name}, ${d.country}`} category={d.category} />
        <span className="pill">{d.category}</span>
      </Link>
      <motion.button className={`fav ${on ? 'on' : ''}`} whileTap={{ scale: 0.86 }} onClick={() => toggleWish(d.id)} aria-pressed={on} aria-label={on ? `Remove ${d.name} from wishlist` : `Save ${d.name} to wishlist`}>
        <motion.span key={on ? 'on' : 'off'} initial={{ scale: on ? 0.5 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }} style={{ display: 'grid' }}><Heart size={18} fill={on ? 'currentColor' : 'none'} /></motion.span>
      </motion.button>
      <div className="card-body">
        <h3>{d.name}</h3>
        <p className="muted loc"><MapPin size={14} aria-hidden="true" /> {d.country}</p>
        <p>{d.short}</p>
        <div className="row"><span className="price"><small>From</small> <strong>{inr(d.budget)}</strong></span><Link className="link" to={`/destination/${d.id}`}>Explore →</Link></div>
      </div>
    </motion.article>
  )
}
