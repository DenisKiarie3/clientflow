import { useEffect, useMemo, useState } from 'react'
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
import SearchInput from '../components/common/SearchInput'
import useDebounce from '../hooks/useDebounce'
import { ROUTES } from '../constants/routes'
import { STATUS_META } from '../constants/invoiceStatus'

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  ...Object.entries(STATUS_META).map(([value, meta]) => ({ value, label: meta.label })),
]

function InvoicesPage() {
  const dispatch = useAppDispatch()
  const invoices = useAppSelector(selectInvoicesWithClientNames)
  const invoicesStatus = useAppSelector(selectInvoicesStatus)
  const invoicesError = useAppSelector(selectInvoicesError)
  const clientsStatus = useAppSelector(selectClientsStatus)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (invoicesStatus === 'idle') dispatch(fetchInvoices())
    if (clientsStatus === 'idle') dispatch(fetchClients())
  }, [invoicesStatus, clientsStatus, dispatch])

  const isLoading = invoicesStatus === 'loading' || clientsStatus === 'loading'

  const filteredInvoices = useMemo(() => {
    const query = debouncedSearchTerm.trim().toLowerCase()
    return invoices.filter((invoice) => {
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
      const matchesQuery =
        !query ||
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.clientName.toLowerCase().includes(query)
      return matchesStatus && matchesQuery
    })
  }, [invoices, debouncedSearchTerm, statusFilter])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-display font-bold text-xl text-ink">Invoices</h2>
        <Link
          to={ROUTES.INVOICE_CREATE}
          className="flex items-center gap-2 bg-violet text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet/90"
        >
          <RiAddLine aria-hidden="true" />
          New invoice
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by invoice # or client" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
          className="border border-black/10 rounded-lg px-3 py-2 text-base text-ink bg-white sm:w-48"
        >
          {STATUS_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {isLoading && <p className="text-sm text-slate">Loading invoices…</p>}
      {invoicesStatus === 'failed' && <p className="text-sm text-coral-deep">{invoicesError}</p>}
      {invoicesStatus === 'succeeded' && invoices.length === 0 && (
        <p className="text-sm text-slate">No invoices yet. Create your first one.</p>
      )}
      {invoicesStatus === 'succeeded' && invoices.length > 0 && filteredInvoices.length === 0 && (
        <p className="text-sm text-slate">No invoices match your search or filter.</p>
      )}

      <div className="flex flex-col gap-2">
        {filteredInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  )
}

export default InvoicesPage