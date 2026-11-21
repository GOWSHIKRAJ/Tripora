import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Menu, User, X, Compass } from 'lucide-react'
import { useTrip } from '../context/TripContext'
const links = [['/', 'Home'], ['/explore', 'Explore'], ['/planner', 'Plan a Trip'], ['/my-trips', 'My Trips'], ['/budget', 'Budget'], ['/about', 'About']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { wishlist } = useTrip()
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    if (!open) return
    const k = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [open])
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><Compass size={20} /></span> Tripora</Link>
      <nav id="main-nav" className={open ? 'open' : ''} aria-label="Main">
        {links.map(([to, l]) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
            {({ isActive }) => <>{l}{isActive && <motion.span layoutId="nav-ind" className="nav-ind" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />}</>}
          </NavLink>
        ))}
      </nav>
      <div className="nav-actions">
        <Link to="/wishlist" aria-label={`Wishlist, ${wishlist.length} saved`} className="icon-btn"><Heart size={20} />{wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}</Link>
        <Link to="/profile" aria-label="Profile" className="icon-btn"><User size={20} /></Link>
        <button className="icon-btn menu" aria-label="Toggle menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </header>
  )
}
