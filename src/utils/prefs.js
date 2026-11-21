// Travel preference options used by the Planner and Profile multi-selects.
export const PREFERENCE_OPTIONS = [
  'Food & cuisine', 'Hiking & trekking', 'Beaches & water sports', 'Culture & heritage', 'Nightlife',
  'Shopping', 'Adventure sports', 'Wildlife & nature', 'Spa & relaxation', 'Photography',
  'Family friendly', 'Budget friendly', 'Luxury stays', 'Slow travel',
]
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
// Accepts the new array format or the legacy free-text string ("food, hiking") saved by earlier versions.
// Legacy tokens are mapped to a matching option when possible, otherwise kept as custom entries (nothing is lost).
export const normalizePrefs = (v) => {
  let list = []
  if (Array.isArray(v)) list = v.map((s) => String(s).trim())
  else if (typeof v === 'string') list = v.split(/[,;\n]/).map((s) => s.trim())
  const out = []
  for (const raw of list.filter(Boolean)) {
    const t = raw.toLowerCase()
    const match = PREFERENCE_OPTIONS.find((o) => o.toLowerCase() === t) || (t.length >= 3 ? PREFERENCE_OPTIONS.find((o) => o.toLowerCase().startsWith(t)) : undefined)
    const val = match || cap(raw)
    if (!out.includes(val)) out.push(val)
  }
  return out
}
