import { useEffect } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchClients, selectClientsStatus } from '../features/clients/clientsSlice'
import {
  fetchInvoices,
  selectInvoicesStatus,
  selectInvoicesError,
  selectInvoicesWithClientNames,
} from '../features/invoices/invoicesSlice'
import InvoiceCard from '../features/invoices/InvoiceCard'
import { ROUTES } from '../constants/routes'

function InvoicesPage() {
  const dispatch = useAppDispatch()
  const invoices = useAppSelector(selectInvoicesWithClientNames)
  const invoicesStatus = useAppSelector(selectInvoicesStatus)
  const invoicesError = useAppSelector(selectInvoicesError)
  const clientsStatus = useAppSelector(selectClientsStatus)

  useEffect(() => {
    if (invoicesStatus === 'idle') dispatch(fetchInvoices())
    if (clientsStatus === 'idle') dispatch(fetchClients())
  }, [invoicesStatus, clientsStatus, dispatch])

  const isLoading = invoicesStatus === 'loading' || clientsStatus === 'loading'

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-xl text-ink">Invoices</h2>
        <Link
          to={ROUTES.INVOICE_CREATE}
          className="flex items-center gap-2 bg-violet text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet/90"
        >
          <RiAddLine aria-hidden="true" />
          New invoice
        </Link>
      </div>

      {isLoading && <p className="text-sm text-slate">Loading invoices…</p>}
      {invoicesStatus === 'failed' && <p className="text-sm text-coral-deep">{invoicesError}</p>}
      {invoicesStatus === 'succeeded' && invoices.length === 0 && (
        <p className="text-sm text-slate">No invoices yet. Create your first one.</p>
      )}

      <div className="flex flex-col gap-2">
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  )
}

export default InvoicesPage