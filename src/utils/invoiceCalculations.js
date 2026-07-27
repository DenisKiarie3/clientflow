export function calculateLineItemAmount(lineItem) {
  return lineItem.quantity * lineItem.unitPrice
}

export function calculateSubtotal(lineItems) {
  return lineItems.reduce((sum, item) => sum + calculateLineItemAmount(item), 0)
}

export function calculateTax(subtotal, taxRate) {
  return subtotal * taxRate
}

export function calculateTotal(lineItems, taxRate) {
  const subtotal = calculateSubtotal(lineItems)
  return subtotal + calculateTax(subtotal, taxRate)
}

export function isOverdue(invoice) {
  const today = new Date().toISOString().slice(0, 10)
  return invoice.status === 'sent' && invoice.dueDate < today
}