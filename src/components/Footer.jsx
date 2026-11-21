import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
export default function Footer() {
  return (
    <footer className="footer">
      <div className="foot-brand"><div className="brand"><span className="brand-mark"><Compass size={20} /></span> Tripora</div><p>Your Next Adventure Starts Here.</p></div>
      <nav aria-label="Footer"><Link to="/explore">Explore</Link><Link to="/planner">Plan a Trip</Link><Link to="/my-trips">My Trips</Link><Link to="/wishlist">Wishlist</Link><Link to="/budget">Budget</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></nav>
      <small>© {new Date().getFullYear()} Tripora. Demo project; data stays in your browser.</small>
    </footer>
  )
}
