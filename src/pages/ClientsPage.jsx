import { useEffect } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchClients, clientsSelectors, selectClientsStatus, selectClientsError } from '../features/clients/clientsSlice'
import ClientCard from '../features/clients/ClientCard'

function ClientsPage() {
  const dispatch = useAppDispatch()
  const clients = useAppSelector(clientsSelectors.selectAll)
  const status = useAppSelector(selectClientsStatus)
  const error = useAppSelector(selectClientsError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClients())
    }
  }, [status, dispatch])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-xl text-ink">Clients</h2>
        <button className="flex items-center gap-2 bg-violet text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet/90">
          <RiAddLine aria-hidden="true" />
          Add client
        </button>
      </div>

      {status === 'loading' && <p className="text-sm text-slate">Loading clients…</p>}
      {status === 'failed' && <p className="text-sm text-coral-deep">{error}</p>}
      {status === 'succeeded' && clients.length === 0 && (
        <p className="text-sm text-slate">No clients yet. Add your first one to get started.</p>
      )}

      <div className="flex flex-col gap-2">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}

export default ClientsPage