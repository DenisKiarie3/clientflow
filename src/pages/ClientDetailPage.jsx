import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchClients, clientsSelectors, selectClientsStatus, removeClient } from '../features/clients/clientsSlice'
import { fetchInvoices, selectInvoicesStatus, makeSelectInvoicesByClient } from '../features/invoices/invoicesSlice'
import InvoiceCard from '../features/invoices/InvoiceCard'
import ClientForm from '../features/clients/ClientForm'
import Modal from '../components/common/Modal'
import ConfirmDialog from '../components/common/ConfirmDialog'
import { ROUTES } from '../constants/routes'
import { addToast } from '../features/ui/uiSlice'

function ClientDetailPage() {
  const { clientId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const clientsStatus = useAppSelector(selectClientsStatus)
  const invoicesStatus = useAppSelector(selectInvoicesStatus)
  const client = useAppSelector((state) => clientsSelectors.selectById(state, clientId))

  const selectInvoicesByClient = useMemo(() => makeSelectInvoicesByClient(clientId), [clientId])
  const clientInvoices = useAppSelector(selectInvoicesByClient)

  const [isEditOpen, setEditOpen] = useState(false)
  const [isConfirmingDelete, setConfirmingDelete] = useState(false)

  useEffect(() => {
    if (clientsStatus === 'idle') dispatch(fetchClients())
    if (invoicesStatus === 'idle') dispatch(fetchInvoices())
  }, [clientsStatus, invoicesStatus, dispatch])

  const isLoading = clientsStatus === 'loading' || invoicesStatus === 'loading'

  if (isLoading) return <p className="text-sm text-slate">Loading client…</p>

  if (!client) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-ink">Client not found.</p>
        <Link to={ROUTES.CLIENTS} className="text-sm text-violet-deep font-medium">Back to clients</Link>
      </div>
    )
  }

  const invoicesForClient = clientInvoices.map((invoice) => ({ ...invoice, clientName: client.name }))
  const canDelete = clientInvoices.length === 0

  async function handleDelete() {
    try {
      await dispatch(removeClient(client.id)).unwrap()
      dispatch(addToast('Client deleted'))
      navigate(ROUTES.CLIENTS)
    } catch (err) {
      dispatch(addToast(err.message ?? 'Could not delete client. Try again.', 'error'))
    }
  }

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link to={ROUTES.CLIENTS} className="text-sm text-slate hover:text-ink">← Back to clients</Link>
        <div className="flex gap-2">
          <button onClick={() => setEditOpen(true)} className="border border-black/10 text-ink text-sm font-medium px-4 py-2 rounded-lg hover:bg-black/5">
            Edit
          </button>
          <button
            onClick={() => setConfirmingDelete(true)}
            disabled={!canDelete}
            title={canDelete ? undefined : "Can't delete a client with existing invoices"}
            className="border border-black/10 text-coral-deep text-sm font-medium px-4 py-2 rounded-lg hover:bg-coral/5 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 p-6 flex flex-col gap-4">
        <div>
          <p className="font-display font-bold text-xl text-ink">{client.name}</p>
          <p className="text-sm text-slate">{client.company}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/5 pt-4 text-sm">
          <div>
            <p className="text-xs font-medium text-slate mb-1">Email</p>
            <p className="text-ink">{client.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate mb-1">Phone</p>
            <p className="text-ink">{client.phone || '—'}</p>
          </div>
        </div>
        {client.notes && (
          <div className="border-t border-black/5 pt-4">
            <p className="text-xs font-medium text-slate mb-1">Notes</p>
            <p className="text-sm text-ink">{client.notes}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-display font-bold text-base text-ink">Invoices</h3>
        {invoicesForClient.length === 0 ? (
          <p className="text-sm text-slate">No invoices for this client yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {invoicesForClient.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isEditOpen} onClose={() => setEditOpen(false)} title="Edit client">
        <ClientForm initialData={client} onSuccess={() => setEditOpen(false)} />
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmingDelete}
        onClose={() => setConfirmingDelete(false)}
        onConfirm={handleDelete}
        title="Delete client"
        description={`Delete ${client.name}? This can't be undone.`}
        confirmLabel="Delete"
        isDangerous
      />
    </div>
  )
}

export default ClientDetailPage