import { destinations } from '../data/destinations'
import { useTrip } from '../context/TripContext'
import DestinationCard from '../components/DestinationCard'
import EmptyState from '../components/EmptyState'
export default function Wishlist() {
  const { wishlist } = useTrip()
  const list = destinations.filter((d) => wishlist.includes(d.id))
  return <main className="page"><span className="eyebrow">Saved</span><h1>Your wishlist</h1>{list.length ? <div className="grid">{list.map((d, i) => <DestinationCard key={d.id} d={d} index={i} />)}</div> : <EmptyState title="Nothing saved yet" text="Tap the heart on any destination to keep it here." to="/explore" cta="Explore destinations" />}</main>
}
