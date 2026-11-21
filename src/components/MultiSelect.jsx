import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, X } from 'lucide-react'
// Accessible multi-select dropdown: a button opens an animated panel of checkboxes. Value is an array of strings.
export default function MultiSelect({ label, options, value, onChange, placeholder = 'Select…', hint }) {
  const [open, setOpen] = useState(false)
  const root = useRef(null), trigger = useRef(null), panel = useRef(null)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const all = [...options, ...value.filter((v) => !options.includes(v))] // keeps custom/legacy values visible
  const toggle = (o) => onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o])
  useEffect(() => {
    if (!open) return
    const down = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', down)
    return () => document.removeEventListener('pointerdown', down)
  }, [open])
  const onKey = (e) => {
    if (e.key === 'Escape' && open) { e.stopPropagation(); setOpen(false); trigger.current?.focus(); return }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && open) {
      const boxes = [...panel.current.querySelectorAll('input[type=checkbox]')]
      const i = boxes.indexOf(document.activeElement)
      e.preventDefault()
      boxes[e.key === 'ArrowDown' ? Math.min(boxes.length - 1, i + 1) : Math.max(0, i - 1)]?.focus()
    }
  }
  const openAndFocus = (e) => { if (e.key === 'ArrowDown' && !open) { e.preventDefault(); setOpen(true) } }
  return (
    <div className="ms" ref={root} onKeyDown={onKey}>
      <span className="ms-label" id={`${uid}l`}>{label}</span>
      <div className="ms-wrap">
      <button ref={trigger} type="button" className={`ms-trigger ${open ? 'open' : ''}`} aria-haspopup="true" aria-expanded={open} aria-controls={`${uid}p`} aria-labelledby={`${uid}l ${uid}t`} onClick={() => setOpen(!open)} onKeyDown={openAndFocus}>
        <span id={`${uid}t`} className={value.length ? '' : 'muted'}>{value.length ? `${value.length} selected` : placeholder}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'grid' }}><ChevronDown size={18} aria-hidden="true" /></motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div ref={panel} id={`${uid}p`} className="ms-panel" role="group" aria-labelledby={`${uid}l`}
            initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.16, ease: 'easeOut' }}>
            <ul className="ms-list">
              {all.map((o) => {
                const on = value.includes(o)
                return (
                  <li key={o}>
                    <label className={`ms-opt ${on ? 'on' : ''}`}>
                      <input type="checkbox" checked={on} onChange={() => toggle(o)} />
                      <span className="ms-box" aria-hidden="true">{on && <Check size={13} strokeWidth={3} />}</span>
                      <span>{o}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
            <div className="ms-foot">
              <button type="button" className="icon-link txt" onClick={() => onChange([])} disabled={!value.length}>Clear all</button>
              <button type="button" className="btn sm" onClick={() => { setOpen(false); trigger.current?.focus() }}>Done</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      {hint && <span className="muted small">{hint}</span>}
      <ul className="tags" aria-label={`Selected ${label.toLowerCase()}`}>
        <AnimatePresence initial={false}>
          {value.map((v) => (
            <motion.li key={v} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.16 }}>
              <span className="tag">{v}<button type="button" onClick={() => toggle(v)} aria-label={`Remove ${v}`}><X size={12} /></button></span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
