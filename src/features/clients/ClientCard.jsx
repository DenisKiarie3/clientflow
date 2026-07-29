import { memo } from 'react'
import { Link } from 'react-router-dom'
import { clientDetailPath } from '../../constants/routes'

function ClientCard({ client }) {
  return (
    <Link
      to={clientDetailPath(client.id)}
      className="flex items-center justify-between bg-white rounded-xl border border-black/5 px-4 py-3 hover:border-violet/40 transition-colors"
    >
      <div>
        <p className="text-sm font-medium text-ink">{client.name}</p>
        <p className="text-xs text-slate">{client.email}</p>
      </div>
      <span className="text-xs text-slate">{client.phone}</span>
    </Link>
  )
}

export default memo(ClientCard)