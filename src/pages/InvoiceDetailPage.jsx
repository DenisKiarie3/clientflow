import { useParams } from 'react-router-dom'

function InvoiceDetailPage() {
  const { invoiceId } = useParams()
  return <div className="text-ink">Invoice detail for: {invoiceId}</div>
}

export default InvoiceDetailPage