import { RiDeleteBinLine, RiAddLine } from 'react-icons/ri'
import { formatCurrency } from '../../utils/formatCurrency'

function InvoiceLineItems({ lineItems, onChange, onAdd, onRemove, errors }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="hidden md:grid grid-cols-[1fr_80px_110px_100px_36px] gap-2 text-xs font-medium text-slate px-1">
        <span>Description</span>
        <span>Qty</span>
        <span>Unit price</span>
        <span className="text-right">Amount</span>
        <span></span>
      </div>

      {lineItems.map((item, index) => {
        const amount = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0)
        return (
          <div key={item.id} className="grid grid-cols-2 md:grid-cols-[1fr_80px_110px_100px_36px] gap-2 items-start">
            <div className="col-span-2 md:col-span-1">
              <input
                value={item.description}
                onChange={(e) => onChange(item.id, 'description', e.target.value)}
                placeholder="What did you do?"
                aria-label="Description"
                aria-invalid={Boolean(errors[`lineItems.${index}.description`])}
                className={`w-full border rounded-lg px-3 py-2 text-base text-ink ${
                  errors[`lineItems.${index}.description`] ? 'border-coral' : 'border-black/10'
                }`}
              />
            </div>
            <input
              type="number"
              min="0"
              step="1"
              value={item.quantity}
              onChange={(e) => onChange(item.id, 'quantity', e.target.value)}
              aria-label="Quantity"
              className="w-full border border-black/10 rounded-lg px-3 py-2 text-base text-ink"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.unitPrice}
              onChange={(e) => onChange(item.id, 'unitPrice', e.target.value)}
              aria-label="Unit price"
              className="w-full border border-black/10 rounded-lg px-3 py-2 text-base text-ink"
            />
            <span className="font-mono text-sm text-ink text-right pt-2">{formatCurrency(amount)}</span>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              disabled={lineItems.length === 1}
              aria-label="Remove line item"
              className="text-slate hover:text-coral-deep disabled:opacity-30 pt-1"
            >
              <RiDeleteBinLine aria-hidden="true" />
            </button>
          </div>
        )
      })}

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 text-sm font-medium text-violet-deep self-start"
      >
        <RiAddLine aria-hidden="true" />
        Add line item
      </button>
    </div>
  )
}

export default InvoiceLineItems