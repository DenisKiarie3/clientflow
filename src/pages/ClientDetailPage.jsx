import { useParams } from 'react-router-dom'

function ClientDetailPage() {
  const { clientId } = useParams()
  return <div className="text-ink">Client detail for: {clientId}</div>
}

export default ClientDetailPage