import { useEffect, useRef, useState } from 'react'
import PlaceArt from './PlaceArt'
// Image with a shimmer while loading, a fade-in when ready, and an illustrated fallback if the URL is missing or broken.
export function Img({ src, alt, category = 'Nature', variant = 0, eager = false }) {
  const [state, setState] = useState(src ? 'loading' : 'failed')
  const ref = useRef(null)
  useEffect(() => {
    setState(src ? 'loading' : 'failed')
    const el = ref.current
    if (src && el && el.complete) setState(el.naturalWidth > 0 ? 'loaded' : 'failed') // cached / finished before React attached handlers
  }, [src])
  if (state === 'failed') return <PlaceArt className="img loaded" category={category} variant={variant} label={alt} />
  return <img ref={ref} className={`img ${state}`} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onLoad={() => setState('loaded')} onError={() => setState('failed')} />
}
export default Img
