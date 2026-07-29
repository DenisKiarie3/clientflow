import EmptyState from '../../components/common/EmptyState'
import { RiFileList3Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import InvoiceCard from '../invoices/InvoiceCard'

function RecentInvoices({ invoices, currency = 'USD' }) {
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={RiFileList3Line}
        title="No invoices yet"
        description="Invoices you create will show up here."
        action={
          <Link to={ROUTES.INVOICE_CREATE} className="bg-violet text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet/90">
            New invoice
          </Link>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} currency={currency} />
      ))}
    </div>
  )
}

export default RecentInvoices