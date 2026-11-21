import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { Img } from './Img'
import { useModal } from '../hooks/useModal'

// Mosaic grid: first frame large, the rest smaller. Clicking any frame calls onOpen(index).
export default function Gallery({ items, category, name, onOpen }) {
  return (
    <div className={`gallery g${Math.min(items.length, 5)}`}>
      {items.map((g, i) => (
        <motion.button key={i} type="button" className="g-item" onClick={() => onOpen(i)} aria-label={`Open photo ${i + 1} of ${items.length}: ${g.caption}`}
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.07 }}>
          <Img src={g.src} alt={`${name}: ${g.caption}`} category={category} variant={g.variant ?? i} />
          <span className="g-cap">{g.caption}</span>
          <span className="g-zoom" aria-hidden="true"><Maximize2 size={16} /></span>
        </motion.button>
      ))}
    </div>
  )
}

const slide = {
  enter: (dir) => ({ x: dir * 70, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir * -70, opacity: 0, scale: 0.98 }),
}

// Animated lightbox. Render inside <AnimatePresence> so it can animate out: {open !== null && <Lightbox … />}
export function Lightbox({ items, index, onIndex, onClose, category, name }) {
  const ref = useRef(null)
  const [dir, setDir] = useState(1)
  useModal(ref, onClose)
  const go = useCallback((n) => { setDir(n > 0 ? 1 : -1); onIndex((i) => (i + n + items.length) % items.length) }, [items.length, onIndex])
  useEffect(() => {
    const k = (e) => { if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1) }
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [go])
  useEffect(() => { // warm the neighbours so next/prev feels instant
    ;[1, -1].forEach((n) => { const s = items[(index + n + items.length) % items.length]?.src; if (s) new Image().src = s })
  }, [index, items])
  const g = items[index]
  return createPortal(
    <motion.div ref={ref} className="lb" role="dialog" aria-modal="true" aria-label={`${name} photo gallery`} tabIndex={-1}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} onClick={onClose}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <span className="lb-count" aria-live="polite">{index + 1} / {items.length}</span>
        <button type="button" className="lb-btn" data-autofocus onClick={onClose} aria-label="Close gallery"><X size={22} /></button>
      </div>
      <motion.div className="lb-stage" initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 8 }} transition={{ type: 'spring', stiffness: 320, damping: 30 }} onClick={(e) => e.stopPropagation()}>
        <div className="lb-media">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div key={index} className="lb-slide" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
              onDragEnd={(_, { offset, velocity }) => { if (offset.x < -80 || velocity.x < -500) go(1); else if (offset.x > 80 || velocity.x > 500) go(-1) }}>
              <Img src={g.src} alt={`${name}: ${g.caption}`} category={category} variant={g.variant ?? index} eager />
            </motion.div>
          </AnimatePresence>
          {items.length > 1 && <>
            <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft size={26} /></button>
            <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next photo"><ChevronRight size={26} /></button>
          </>}
        </div>
        <p className="lb-caption">{g.caption}</p>
        <div className="lb-thumbs" role="group" aria-label="Choose photo">
          {items.map((t, i) => (
            <button key={i} type="button" className={`lb-thumb ${i === index ? 'on' : ''}`} aria-label={`Photo ${i + 1}: ${t.caption}`} aria-current={i === index} onClick={() => { setDir(i > index ? 1 : -1); onIndex(i) }}>
              <Img src={t.src} alt="" category={category} variant={t.variant ?? i} />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
