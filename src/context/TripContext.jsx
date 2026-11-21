import { createContext, useContext, useEffect, useState } from 'react'
import { load, save, uid } from '../utils/storage'
import { normalizePrefs } from '../utils/prefs'
const Ctx = createContext(null)
export const useTrip = () => useContext(Ctx)
const defaultProfile = { name: 'Traveller', email: '', category: '', favourite: '', prefs: [] }
// Defensive loaders: LocalStorage can hold older formats (prefs as a string) or be hand-edited/corrupted.
const loadWishlist = () => { const v = load('tripora:wishlist', []); return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [] }
const loadTrips = () => {
  const v = load('tripora:trips', [])
  return Array.isArray(v) ? v.filter((t) => t && typeof t === 'object' && t.id).map((t) => ({ ...t, prefs: normalizePrefs(t.prefs), activities: Array.isArray(t.activities) ? t.activities : [] })) : []
}
const loadProfile = () => { const p = load('tripora:profile', {}); return { ...defaultProfile, ...(p && typeof p === 'object' ? p : {}), prefs: normalizePrefs(p?.prefs) } }
export function TripProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist)
  const [trips, setTrips] = useState(loadTrips)
  const [profile, setProfile] = useState(loadProfile)
  useEffect(() => save('tripora:wishlist', wishlist), [wishlist])
  useEffect(() => save('tripora:trips', trips), [trips])
  useEffect(() => save('tripora:profile', profile), [profile])
  const toggleWish = (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))
  const saveTrip = (t) => {
    const id = t.id || uid()
    setTrips((p) => (p.some((x) => x.id === id) ? p.map((x) => (x.id === id ? { ...t, id } : x)) : [...p, { ...t, id }]))
    return id
  }
  const deleteTrip = (id) => setTrips((p) => p.filter((x) => x.id !== id))
  return <Ctx.Provider value={{ wishlist, toggleWish, trips, saveTrip, deleteTrip, profile, setProfile }}>{children}</Ctx.Provider>
}
