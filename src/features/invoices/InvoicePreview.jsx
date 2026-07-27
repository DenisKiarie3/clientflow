import { formatCurrency } from '../../utils/formatCurrency'
import { calculateLineItemAmount, calculateSubtotal, calculateTax } from '../../utils/invoiceCalculations'
import StatusBadge from './StatusBadge'

function InvoicePreview({ invoice }) {
  const subtotal = calculateSubtotal(invoice.lineItems)
  const tax = calculateTax(subtotal, invoice.taxRate)
  const total = subtotal + tax

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display font-bold text-xl text-ink">{invoice.invoiceNumber}</p>
          <p className="text-sm text-slate mt-1">Issued {invoice.issueDate} · Due {invoice.dueDate}</p>
        </div>
        <StatusBadge status={invoice.status} />
      </div>

      <div className="border-t border-black/5 pt-4">
        <p className="text-xs font-medium text-slate mb-1">Bill to</p>
        <p className="text-sm font-medium text-ink">{invoice.client?.name ?? 'Unknown client'}</p>
        <p className="text-xs text-slate">{invoice.client?.email}</p>
      </div>

      <div className="border-t border-black/5 pt-4">
        <div className="hidden md:grid grid-cols-[1fr_60px_100px_100px] gap-2 text-xs font-medium text-slate px-1 mb-2">
          <span>Description</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Unit price</span>
          <span className="text-right">Amount</span>
        </div>
        <div className="flex flex-col gap-2">
          {invoice.lineItems.map((item) => (
            <div key={item.id} className="grid grid-cols-2 md:grid-cols-[1fr_60px_100px_100px] gap-2 text-sm text-ink py-1">
              <span className="col-span-2 md:col-span-1">{item.description}</span>
              <span className="text-right font-mono text-xs md:text-sm">{item.quantity}</span>
              <span className="text-right font-mono text-xs md:text-sm">{formatCurrency(item.unitPrice)}</span>
              <span className="text-right font-mono text-xs md:text-sm">{formatCurrency(calculateLineItemAmount(item))}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 border-t border-black/5 pt-4">
        <div className="flex gap-4 text-sm text-slate">
          <span>Subtotal</span>
          <span className="font-mono text-ink w-24 text-right">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex gap-4 text-sm text-slate">
          <span>Tax ({(invoice.taxRate * 100).toFixed(0)}%)</span>
          <span className="font-mono text-ink w-24 text-right">{formatCurrency(tax)}</span>
        </div>
        <div className="flex gap-4 text-base font-medium text-ink">
          <span>Total</span>
          <span className="font-mono w-24 text-right">{formatCurrency(total)}</span>
        </div>
      </div>

      {invoice.notes && (
        <div className="border-t border-black/5 pt-4">
          <p className="text-xs font-medium text-slate mb-1">Notes</p>
          <p className="text-sm text-ink">{invoice.notes}</p>
        </div>
      )}
    </div>
  )
}

export default InvoicePreview