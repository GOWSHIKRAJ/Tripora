// Usage: npm run check:images   (needs internet access; Node 18+)
// Requests every image URL used in src/data/destinations.js and reports anything that is not a 2xx image.
import { destinations } from '../src/data/destinations.js'

const urls = []
for (const d of destinations) {
  if (d.image) urls.push([d.id, 'hero', d.image])
  d.gallery.forEach((g, i) => g.src && urls.push([d.id, `gallery[${i}]`, g.src]))
}
const check = async ([id, slot, url]) => {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 12000)
  try {
    let r = await fetch(url, { method: 'HEAD', signal: ctl.signal, redirect: 'follow' })
    if (!r.ok || !(r.headers.get('content-type') || '').startsWith('image/')) r = await fetch(url, { method: 'GET', signal: ctl.signal, redirect: 'follow' })
    const type = r.headers.get('content-type') || ''
    return { id, slot, url, ok: r.ok && type.startsWith('image/'), note: `${r.status} ${type}` }
  } catch (e) { return { id, slot, url, ok: false, note: e.name === 'AbortError' ? 'timeout' : e.message } } finally { clearTimeout(t) }
}
const results = []
for (let i = 0; i < urls.length; i += 6) results.push(...(await Promise.all(urls.slice(i, i + 6).map(check))))
const bad = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'OK  ' : 'FAIL'} ${r.id.padEnd(12)} ${r.slot.padEnd(11)} ${r.note}`)
console.log(`\n${results.length - bad.length}/${results.length} image URLs OK`)
if (bad.length) { console.log('\nBroken URLs (replace these in src/data/destinations.js):'); bad.forEach((r) => console.log(`- ${r.id} ${r.slot}: ${r.url}`)); process.exit(1) }
