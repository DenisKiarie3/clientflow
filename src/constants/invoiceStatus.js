export const INVOICE_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
}

export const STATUS_META = {
  [INVOICE_STATUS.DRAFT]: { label: 'Draft', bg: 'bg-black/5', text: 'text-slate' },
  [INVOICE_STATUS.SENT]: { label: 'Sent', bg: 'bg-violet/10', text: 'text-violet-deep' },
  [INVOICE_STATUS.PAID]: { label: 'Paid', bg: 'bg-green/10', text: 'text-green-deep' },
  [INVOICE_STATUS.OVERDUE]: { label: 'Overdue', bg: 'bg-coral/10', text: 'text-coral-deep' },
  [INVOICE_STATUS.CANCELLED]: { label: 'Cancelled', bg: 'bg-black/5', text: 'text-slate' },
}