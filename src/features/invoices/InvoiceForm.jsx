import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { invoiceSchema } from './invoiceSchema'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addInvoice } from './invoicesSlice'
import { fetchClients, clientsSelectors, selectClientsStatus } from '../clients/clientsSlice'
import { calculateSubtotal, calculateTax } from '../../utils/invoiceCalculations'
import { formatCurrency } from '../../utils/formatCurrency'
import { invoiceDetailPath } from '../../constants/routes'
import InvoiceLineItems from './InvoiceLineItems'
import FormField from '../../components/common/FormField'

const makeLineItem = () => ({ id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 })

function InvoiceForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const clients = useAppSelector(clientsSelectors.selectAll)
  const clientsStatus = useAppSelector(selectClientsStatus)

  const [formData, setFormData] = useState({ clientId: '', dueDate: '', taxRatePercent: '8', notes: '' })
  const [lineItems, setLineItems] = useState([makeLineItem()])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (clientsStatus === 'idle') dispatch(fetchClients())
  }, [clientsStatus, dispatch])

  function handleFieldChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleLineItemChange(id, field, value) {
    setLineItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  function handleAddLineItem() {
    setLineItems((prev) => [...prev, makeLineItem()])
  }

  function handleRemoveLineItem(id) {
    setLineItems((prev) => (prev.length === 1 ? prev : prev.filter((item) => item.id !== id)))
  }

  const numericLineItems = lineItems.map((item) => ({
    ...item,
    quantity: Number(item.quantity) || 0,
    unitPrice: Number(item.unitPrice) || 0,
  }))
  const taxRateDecimal = (Number(formData.taxRatePercent) || 0) / 100
  const subtotal = calculateSubtotal(numericLineItems)
  const tax = calculateTax(subtotal, taxRateDecimal)
  const total = subtotal + tax

  async function submitInvoice(status) {
    const payload = {
      clientId: formData.clientId,
      dueDate: formData.dueDate,
      taxRate: taxRateDecimal,
      notes: formData.notes,
      lineItems,
    }

    const result = invoiceSchema.safeParse(payload)
    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path.join('.')] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    try {
      const created = await dispatch(
        addInvoice({
          ...result.data,
          status,
          invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
          issueDate: new Date().toISOString().slice(0, 10),
        })
      ).unwrap()
      navigate(invoiceDetailPath(created.id))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submitInvoice('sent') }} noValidate className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="clientId" className="text-xs font-medium text-slate">Client</label>
          <select
            id="clientId"
            name="clientId"
            value={formData.clientId}
            onChange={handleFieldChange}
            className={`border rounded-lg px-3 py-2 text-sm text-ink bg-white ${
              errors.clientId ? 'border-coral' : 'border-black/10'
            }`}
          >
            <option value="">Select a client…</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          {errors.clientId && <span className="text-xs text-coral-deep">{errors.clientId}</span>}
        </div>

        <FormField label="Due date" name="dueDate" type="date" value={formData.dueDate} onChange={handleFieldChange} error={errors.dueDate} />
        <FormField label="Tax rate (%)" name="taxRatePercent" type="number" min="0" max="100" step="0.1" value={formData.taxRatePercent} onChange={handleFieldChange} error={errors.taxRate} />
      </div>

      <InvoiceLineItems
        lineItems={lineItems}
        onChange={handleLineItemChange}
        onAdd={handleAddLineItem}
        onRemove={handleRemoveLineItem}
        errors={errors}
      />
      {errors.lineItems && <span className="text-xs text-coral-deep">{errors.lineItems}</span>}

      <div className="flex flex-col items-end gap-1 border-t border-black/5 pt-4">
        <div className="flex gap-4 text-sm text-slate">
          <span>Subtotal</span>
          <span className="font-mono text-ink w-24 text-right">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex gap-4 text-sm text-slate">
          <span>Tax</span>
          <span className="font-mono text-ink w-24 text-right">{formatCurrency(tax)}</span>
        </div>
        <div className="flex gap-4 text-base font-medium text-ink">
          <span>Total</span>
          <span className="font-mono w-24 text-right">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => submitInvoice('draft')}
          className="border border-black/10 text-ink text-sm font-medium px-4 py-2 rounded-lg hover:bg-black/5 disabled:opacity-50"
        >
          Save as draft
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-violet text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet/90 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending…' : 'Send invoice'}
        </button>
      </div>
    </form>
  )
}

export default InvoiceForm