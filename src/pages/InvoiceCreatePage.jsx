import InvoiceForm from '../features/invoices/InvoiceForm'

function InvoiceCreatePage() {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display font-bold text-xl text-ink mb-4">New invoice</h2>
      <InvoiceForm />
    </div>
  )
}

export default InvoiceCreatePage