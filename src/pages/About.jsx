import { destinations } from '../data/destinations'
import { Img } from '../components/Img'
const img = (id) => destinations.find((d) => d.id === id)
export default function About() {
  const bali = img('bali'), kyoto = img('kyoto')
  return (
    <main className="page narrow">
      <span className="eyebrow">Our story</span>
      <h1>About Tripora</h1>
      <div className="about-imgs"><div className="media"><Img src={bali.image} alt="Bali rice terraces" category={bali.category} /></div><div className="media"><Img src={kyoto.image} alt="Kyoto street at dusk" category={kyoto.category} /></div></div>
      <p>Tripora helps people find places worth travelling to, plan the days that fill a trip, and keep the budget honest.</p>
      <h2>Mission</h2><p>Make trip planning feel like the start of the trip: clear, calm and personal.</p>
      <h2>Vision</h2><p>A planner where every journey, from a weekend in Ooty to two weeks in Japan, is easy to shape and easy to afford.</p>
      <h2>Our approach</h2><p>We favour fewer, better choices: curated destinations, itineraries you edit by hand, and budgets in rupees. Everything you save stays in your browser.</p>
    </main>
  )
}
