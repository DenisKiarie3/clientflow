import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine } from 'react-icons/ri'

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null)
  const triggerElementRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    triggerElementRef.current = document.activeElement

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab') return

      const focusableElements = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR)
      if (!focusableElements || focusableElements.length === 0) return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const firstField = dialogRef.current?.querySelector(FOCUSABLE_SELECTOR)
    firstField?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      triggerElementRef.current?.focus()
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative bg-white rounded-2xl w-full max-w-md p-6 border border-black/5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 id="modal-title" className="font-display font-bold text-lg text-ink">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="p-1 text-slate hover:text-ink">
                <RiCloseLine className="text-xl" aria-hidden="true" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal