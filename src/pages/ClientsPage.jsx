import { useEffect, useMemo, useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchClients, clientsSelectors, selectClientsStatus, selectClientsError } from '../features/clients/clientsSlice'
import ClientCard from '../features/clients/ClientCard'
import ClientForm from '../features/clients/ClientForm'
import Modal from '../components/common/Modal'
import SearchInput from '../components/common/SearchInput'
import useDebounce from '../hooks/useDebounce'

function ClientsPage() {
  const dispatch = useAppDispatch()
  const clients = useAppSelector(clientsSelectors.selectAll)
  const status = useAppSelector(selectClientsStatus)
  const error = useAppSelector(selectClientsError)
  const [isFormOpen, setFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClients())
    }
  }, [status, dispatch])

  const filteredClients = useMemo(() => {
    const query = debouncedSearchTerm.trim().toLowerCase()
    if (!query) return clients
    return clients.filter((client) =>
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      (client.company ?? '').toLowerCase().includes(query)
    )
  }, [clients, debouncedSearchTerm])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-display font-bold text-xl text-ink">Clients</h2>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-violet text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet/90"
        >
          <RiAddLine aria-hidden="true" />
          Add client
        </button>
      </div>

      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search clients by name, email, or company" />

      {status === 'loading' && <p className="text-sm text-slate">Loading clients…</p>}
      {status === 'failed' && <p className="text-sm text-coral-deep">{error}</p>}
      {status === 'succeeded' && clients.length === 0 && (
        <p className="text-sm text-slate">No clients yet. Add your first one to get started.</p>
      )}
      {status === 'succeeded' && clients.length > 0 && filteredClients.length === 0 && (
        <p className="text-sm text-slate">No clients match "{debouncedSearchTerm}".</p>
      )}

      <div className="flex flex-col gap-2">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setFormOpen(false)} title="Add client">
        <ClientForm onSuccess={() => setFormOpen(false)} />
      </Modal>
    </div>
  )
}

export default ClientsPage