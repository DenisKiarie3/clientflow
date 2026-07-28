import { RiCheckLine, RiErrorWarningLine, RiInformationLine, RiCloseLine } from 'react-icons/ri'

const TOAST_META = {
  success: { icon: RiCheckLine, bg: 'bg-green' },
  error: { icon: RiErrorWarningLine, bg: 'bg-coral' },
  info: { icon: RiInformationLine, bg: 'bg-ink' },
}

function Toast({ toast, onDismiss }) {
  const meta = TOAST_META[toast.type] ?? TOAST_META.info
  const Icon = meta.icon

  return (
    <div className={`flex items-center gap-3 ${meta.bg} text-white rounded-lg px-4 py-3 shadow-lg min-w-[260px] max-w-sm`} role="status">
      <Icon className="text-lg shrink-0" aria-hidden="true" />
      <p className="text-sm flex-1">{toast.message}</p>
      <button onClick={onDismiss} aria-label="Dismiss notification" className="shrink-0 opacity-80 hover:opacity-100">
        <RiCloseLine aria-hidden="true" />
      </button>
    </div>
  )
}

export default Toast