import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectToasts, removeToast } from '../../features/ui/uiSlice'
import Toast from './Toast'

const AUTO_DISMISS_MS = 4000

function ToastContainer() {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectToasts)

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => dispatch(removeToast(toast.id))} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
    >
      <Toast toast={toast} onDismiss={onDismiss} />
    </motion.div>
  )
}

export default ToastContainer