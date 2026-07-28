import InvoiceCard from '../invoices/InvoiceCard'

function RecentInvoices({ invoices, currency = 'USD' }) {
  if (invoices.length === 0) {
    return <p className="text-sm text-slate">No invoices yet.</p>
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