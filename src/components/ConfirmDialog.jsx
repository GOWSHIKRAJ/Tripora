import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useModal } from '../hooks/useModal'
function Dialog({ title, text, confirmLabel, onConfirm, onCancel }) {
  const ref = useRef(null)
  useModal(ref, onCancel)
  return createPortal(
    <motion.div className="lb dlg-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={onCancel}>
      <motion.div ref={ref} className="dlg" role="alertdialog" aria-modal="true" aria-labelledby="dlg-t" aria-describedby="dlg-d" tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} onClick={(e) => e.stopPropagation()}>
        <h2 id="dlg-t">{title}</h2><p id="dlg-d" className="muted">{text}</p>
        <div className="row-btns end">
          <button type="button" className="btn ghost dark" data-autofocus onClick={onCancel}>Cancel</button>
          <button type="button" className="btn danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </motion.div>
    </motion.div>, document.body)
}
export default function ConfirmDialog({ open, ...rest }) { return <AnimatePresence>{open && <Dialog {...rest} />}</AnimatePresence> }
