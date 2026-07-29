import { memo } from 'react'
import { STATUS_META } from '../../constants/invoiceStatus'

function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.draft
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.bg} ${meta.text}`}>
      {meta.label}
    </span>
  )
}

export default memo(StatusBadge)