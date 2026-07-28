import { Link } from 'react-router-dom'
import { invoiceDetailPath } from '../../constants/routes'
import { calculateTotal } from '../../utils/invoiceCalculations'
import { formatCurrency } from '../../utils/formatCurrency'
import StatusBadge from './StatusBadge'

function InvoiceCard({ invoice, currency = 'USD' }) {
  const total = calculateTotal(invoice.lineItems, invoice.taxRate)

  return (
    <Link
      to={invoiceDetailPath(invoice.id)}
      className="flex items-center justify-between bg-white rounded-xl border border-black/5 px-4 py-3 hover:border-violet/40 transition-colors"
    >
      <div>
        <p className="text-sm font-medium text-ink">{invoice.clientName}</p>
        <p className="text-xs text-slate">{invoice.invoiceNumber} · Due {invoice.dueDate}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-ink">{formatCurrency(total, currency)}</span>
        <StatusBadge status={invoice.status} />
      </div>
    </Link>
  )
}

export default InvoiceCard