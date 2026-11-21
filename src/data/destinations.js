// Destination dataset.
// `image` is the hero photo. Gallery = hero + one frame per attraction.
// To use real photos for the extra gallery frames, add URLs to EXTRA_PHOTOS below (index 0..2 → the 3 attractions);
// any frame without a URL (or whose URL fails to load) renders a built-in illustrated postcard instead of a broken image.
// Run `npm run check:images` (needs internet) to verify every URL in this file.
const EXTRA_PHOTOS = {
  // bali: ['https://…/ubud.jpg', 'https://…/tanah-lot.jpg', 'https://…/uluwatu.jpg'],
}
export const categories = ['Beach', 'Mountain', 'Cultural', 'City', 'Nature', 'Luxury']
const base = [
 {
  "id": "bali",
  "name": "Bali",
  "country": "Indonesia",
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=70",
  "budget": 45000,
  "bestTime": "Apr–Oct",
  "duration": "6 days",
  "short": "Rice terraces, temples and surf beaches.",
  "description": "Rice terraces, temples and surf beaches. Bali rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Ubud Monkey Forest",
   "Tanah Lot",
   "Uluwatu"
  ],
  "highlights": [
   "Best visited Apr–Oct",
   "Ideal for 6 days",
   "Beach experience"
  ]
 },
 {
  "id": "switzerland",
  "name": "Switzerland",
  "country": "Switzerland",
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=70",
  "budget": 180000,
  "bestTime": "Jun–Sep",
  "duration": "7 days",
  "short": "Alpine lakes, scenic trains and snow peaks.",
  "description": "Alpine lakes, scenic trains and snow peaks. Switzerland rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Jungfraujoch",
   "Lucerne",
   "Zermatt"
  ],
  "highlights": [
   "Best visited Jun–Sep",
   "Ideal for 7 days",
   "Mountain experience"
  ]
 },
 {
  "id": "kyoto",
  "name": "Kyoto",
  "country": "Japan",
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=70",
  "budget": 120000,
  "bestTime": "Mar–May",
  "duration": "5 days",
  "short": "Temples, tea houses and lantern-lit lanes.",
  "description": "Temples, tea houses and lantern-lit lanes. Kyoto rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Fushimi Inari",
   "Kinkaku-ji",
   "Gion"
  ],
  "highlights": [
   "Best visited Mar–May",
   "Ideal for 5 days",
   "Cultural experience"
  ]
 },
 {
  "id": "maldives",
  "name": "Maldives",
  "country": "Maldives",
  "category": "Luxury",
  "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=70",
  "budget": 150000,
  "bestTime": "Nov–Apr",
  "duration": "5 days",
  "short": "Overwater villas above turquoise lagoons.",
  "description": "Overwater villas above turquoise lagoons. Maldives rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Male Atoll",
   "Snorkelling reefs",
   "Sandbanks"
  ],
  "highlights": [
   "Best visited Nov–Apr",
   "Ideal for 5 days",
   "Luxury experience"
  ]
 },
 {
  "id": "paris",
  "name": "Paris",
  "country": "France",
  "category": "City",
  "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=70",
  "budget": 130000,
  "bestTime": "Apr–Jun",
  "duration": "5 days",
  "short": "Cafés, art and riverside evenings.",
  "description": "Cafés, art and riverside evenings. Paris rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Eiffel Tower",
   "Louvre",
   "Montmartre"
  ],
  "highlights": [
   "Best visited Apr–Jun",
   "Ideal for 5 days",
   "City experience"
  ]
 },
 {
  "id": "dubai",
  "name": "Dubai",
  "country": "UAE",
  "category": "Luxury",
  "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=70",
  "budget": 90000,
  "bestTime": "Nov–Mar",
  "duration": "4 days",
  "short": "Skyline views, desert dunes and souks.",
  "description": "Skyline views, desert dunes and souks. Dubai rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Burj Khalifa",
   "Desert safari",
   "Dubai Marina"
  ],
  "highlights": [
   "Best visited Nov–Mar",
   "Ideal for 4 days",
   "Luxury experience"
  ]
 },
 {
  "id": "london",
  "name": "London",
  "country": "UK",
  "category": "City",
  "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=70",
  "budget": 140000,
  "bestTime": "May–Sep",
  "duration": "5 days",
  "short": "Royal landmarks, markets and theatre.",
  "description": "Royal landmarks, markets and theatre. London rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Tower Bridge",
   "British Museum",
   "Camden"
  ],
  "highlights": [
   "Best visited May–Sep",
   "Ideal for 5 days",
   "City experience"
  ]
 },
 {
  "id": "rome",
  "name": "Rome",
  "country": "Italy",
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=70",
  "budget": 110000,
  "bestTime": "Apr–Jun",
  "duration": "5 days",
  "short": "Ancient ruins and piazzas full of life.",
  "description": "Ancient ruins and piazzas full of life. Rome rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Colosseum",
   "Vatican",
   "Trevi Fountain"
  ],
  "highlights": [
   "Best visited Apr–Jun",
   "Ideal for 5 days",
   "Cultural experience"
  ]
 },
 {
  "id": "singapore",
  "name": "Singapore",
  "country": "Singapore",
  "category": "City",
  "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=70",
  "budget": 85000,
  "bestTime": "Feb–Apr",
  "duration": "4 days",
  "short": "Garden city with hawker food and skyline.",
  "description": "Garden city with hawker food and skyline. Singapore rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Gardens by the Bay",
   "Sentosa",
   "Marina Bay"
  ],
  "highlights": [
   "Best visited Feb–Apr",
   "Ideal for 4 days",
   "City experience"
  ]
 },
 {
  "id": "bangkok",
  "name": "Bangkok",
  "country": "Thailand",
  "category": "City",
  "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=70",
  "budget": 50000,
  "bestTime": "Nov–Feb",
  "duration": "4 days",
  "short": "Street food, temples and night markets.",
  "description": "Street food, temples and night markets. Bangkok rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Grand Palace",
   "Wat Arun",
   "Chatuchak"
  ],
  "highlights": [
   "Best visited Nov–Feb",
   "Ideal for 4 days",
   "City experience"
  ]
 },
 {
  "id": "cappadocia",
  "name": "Cappadocia",
  "country": "Turkey",
  "category": "Cultural",
  "image": "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=70",
  "budget": 80000,
  "bestTime": "Apr–Jun",
  "duration": "4 days",
  "short": "Fairy chimneys and sunrise balloons.",
  "description": "Fairy chimneys and sunrise balloons. Cappadocia rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Balloon ride",
   "Göreme",
   "Underground cities"
  ],
  "highlights": [
   "Best visited Apr–Jun",
   "Ideal for 4 days",
   "Cultural experience"
  ]
 },
 {
  "id": "manali",
  "name": "Manali",
  "country": "India",
  "category": "Mountain",
  "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=70",
  "budget": 25000,
  "bestTime": "Mar–Jun",
  "duration": "5 days",
  "short": "Himalayan valleys, snow and cafés.",
  "description": "Himalayan valleys, snow and cafés. Manali rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Solang Valley",
   "Rohtang Pass",
   "Old Manali"
  ],
  "highlights": [
   "Best visited Mar–Jun",
   "Ideal for 5 days",
   "Mountain experience"
  ]
 },
 {
  "id": "goa",
  "name": "Goa",
  "country": "India",
  "category": "Beach",
  "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=70",
  "budget": 22000,
  "bestTime": "Nov–Feb",
  "duration": "4 days",
  "short": "Sunny beaches and Portuguese-era lanes.",
  "description": "Sunny beaches and Portuguese-era lanes. Goa rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Baga Beach",
   "Fort Aguada",
   "Old Goa"
  ],
  "highlights": [
   "Best visited Nov–Feb",
   "Ideal for 4 days",
   "Beach experience"
  ]
 },
 {
  "id": "ooty",
  "name": "Ooty",
  "country": "India",
  "category": "Nature",
  "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=70",
  "budget": 18000,
  "bestTime": "Oct–Jun",
  "duration": "3 days",
  "short": "Tea estates and misty Nilgiri hills.",
  "description": "Tea estates and misty Nilgiri hills. Ooty rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Botanical Garden",
   "Ooty Lake",
   "Doddabetta"
  ],
  "highlights": [
   "Best visited Oct–Jun",
   "Ideal for 3 days",
   "Nature experience"
  ]
 },
 {
  "id": "newyork",
  "name": "New York",
  "country": "USA",
  "category": "City",
  "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=70",
  "budget": 160000,
  "bestTime": "Apr–Jun",
  "duration": "5 days",
  "short": "Broadway lights, parks and skyline.",
  "description": "Broadway lights, parks and skyline. New York rewards travellers who slow down and explore beyond the headline sights.",
  "attractions": [
   "Central Park",
   "Statue of Liberty",
   "Brooklyn Bridge"
  ],
  "highlights": [
   "Best visited Apr–Jun",
   "Ideal for 5 days",
   "City experience"
  ]
 }
]

export const destinations = base.map((d) => ({
  ...d,
  gallery: [
    { src: d.image, caption: `${d.name} — ${d.short}`, variant: 0 },
    ...d.attractions.map((a, i) => ({ src: EXTRA_PHOTOS[d.id]?.[i] || null, caption: a, variant: i + 1 })),
  ],
}))
