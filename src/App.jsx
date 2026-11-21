import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EmptyState from './components/EmptyState'
import Home from './pages/Home'
import Explore from './pages/Explore'
import DestinationDetails from './pages/DestinationDetails'
import Wishlist from './pages/Wishlist'
import Planner from './pages/Planner'
import MyTrips from './pages/MyTrips'
import Budget from './pages/Budget'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
const NotFound = () => <main className="page"><EmptyState title="Page not found" text="That page doesn't exist." to="/" cta="Go home" /></main>
const pageAnim = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.16, ease: 'easeIn' } },
}
export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#content">Skip to content</a>
      <Navbar />
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div id="content" key={location.pathname} className="shell" {...pageAnim}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/destination/:id" element={<DestinationDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/planner" element={<Planner key={location.search} />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
