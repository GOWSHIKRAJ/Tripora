// Date helpers for the planner. All dates are 'YYYY-MM-DD' strings (what <input type="date"> produces).
export const MAX_DAYS = 60
const ISO = /^\d{4}-\d{2}-\d{2}$/
const toUTC = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d) }

// Local calendar date (not UTC) so "today" is correct for users in any timezone, e.g. India at 2 a.m.
export const todayISO = () => {
  const d = new Date(), p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

// Inclusive number of days: same-day trip = 1, 12th→14th = 3. Falls back to 1 for incomplete/invalid input.
export const dayCount = (start, end) => {
  if (!ISO.test(start || '') || !ISO.test(end || '')) return 1
  const n = Math.round((toUTC(end) - toUTC(start)) / 864e5) + 1
  return n >= 1 ? Math.min(n, MAX_DAYS) : 1
}

// Returns '' when the range is valid. Same-day (start === end) is valid; end before start is rejected.
export const validateRange = (start, end) => {
  if (!end) return 'Choose an end date.'
  if (!ISO.test(end)) return 'Enter a valid end date.'
  if (start && ISO.test(start)) {
    if (toUTC(end) < toUTC(start)) return 'End date can’t be before the start date. Same-day trips are fine.'
    if ((toUTC(end) - toUTC(start)) / 864e5 + 1 > MAX_DAYS) return `Trips can be at most ${MAX_DAYS} days long.`
  }
  return ''
}

export const formatDate = (s) => {
  if (!ISO.test(s || '')) return s || ''
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(toUTC(s))
}
