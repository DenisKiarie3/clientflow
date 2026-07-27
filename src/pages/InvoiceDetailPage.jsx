import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchInvoices, selectInvoicesStatus, markInvoicePaid, removeInvoice, makeSelectInvoiceWithClient } from '../features/invoices/invoicesSlice'
import { fetchClients, selectClientsStatus } from '../features/clients/clientsSlice'
import InvoicePreview from '../features/invoices/InvoicePreview'
import ConfirmDialog from '../components/common/ConfirmDialog'
import { ROUTES } from '../constants/routes'

function InvoiceDetailPage() {
  const { invoiceId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const invoicesStatus = useAppSelector(selectInvoicesStatus)
  const clientsStatus = useAppSelector(selectClientsStatus)

  const selectInvoiceWithClient = useMemo(() => makeSelectInvoiceWithClient(invoiceId), [invoiceId])
  const invoice = useAppSelector(selectInvoiceWithClient)

  const [isConfirmingDelete, setConfirmingDelete] = useState(false)
  const [isMarkingPaid, setIsMarkingPaid] = useState(false)

  useEffect(() => {
    if (invoicesStatus === 'idle') dispatch(fetchInvoices())
    if (clientsStatus === 'idle') dispatch(fetchClients())
  }, [invoicesStatus, clientsStatus, dispatch])

  const isLoading = invoicesStatus === 'loading' || clientsStatus === 'loading'

  if (isLoading) {
    return <p className="text-sm text-slate">Loading invoice…</p>
  }

  if (!invoice) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-ink">Invoice not found.</p>
        <Link to={ROUTES.INVOICES} className="text-sm text-violet-deep font-medium">Back to invoices</Link>
      </div>
    )
  }

  async function handleMarkPaid() {
    setIsMarkingPaid(true)
    await dispatch(markInvoicePaid(invoice.id))
    setIsMarkingPaid(false)
  }

  async function handleDelete() {
    await dispatch(removeInvoice(invoice.id))
    navigate(ROUTES.INVOICES)
  }

  const canMarkPaid = invoice.status === 'sent' || invoice.status === 'overdue'

  return (
    <div className="max-w-3xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link to={ROUTES.INVOICES} className="text-sm text-slate hover:text-ink">← Back to invoices</Link>
        <div className="flex gap-2">
          {canMarkPaid && (
            <button
              onClick={handleMarkPaid}
              disabled={isMarkingPaid}
              className="bg-green text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green/90 disabled:opacity-50"
            >
              {isMarkingPaid ? 'Updating…' : 'Mark as paid'}
            </button>
          )}
          <button
            onClick={() => setConfirmingDelete(true)}
            className="border border-black/10 text-coral-deep text-sm font-medium px-4 py-2 rounded-lg hover:bg-coral/5"
          >
            Delete
          </button>
        </div>
      </div>

      <InvoicePreview invoice={invoice} />

      <ConfirmDialog
        isOpen={isConfirmingDelete}
        onClose={() => setConfirmingDelete(false)}
        onConfirm={handleDelete}
        title="Delete invoice"
        description={`Delete ${invoice.invoiceNumber}? This can't be undone.`}
        confirmLabel="Delete"
        isDangerous
      />
    </div>
  )
}

export default InvoiceDetailPage