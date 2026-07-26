import invoicesData from './mockData/invoices.json'

const DELAY_MS = 400

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let invoices = [...invoicesData]

export async function getInvoices() {
  await delay(DELAY_MS)
  return [...invoices]
}

export async function getInvoiceById(invoiceId) {
  await delay(DELAY_MS)
  const invoice = invoices.find((inv) => inv.id === invoiceId)
  if (!invoice) throw new Error(`Invoice ${invoiceId} not found`)
  return invoice
}

export async function createInvoice(invoiceData) {
  await delay(DELAY_MS)
  const newInvoice = { id: `inv_${Date.now()}`, ...invoiceData }
  invoices = [...invoices, newInvoice]
  return newInvoice
}

export async function updateInvoice(invoiceId, updates) {
  await delay(DELAY_MS)
  invoices = invoices.map((inv) => (inv.id === invoiceId ? { ...inv, ...updates } : inv))
  return invoices.find((inv) => inv.id === invoiceId)
}

export async function deleteInvoice(invoiceId) {
  await delay(DELAY_MS)
  invoices = invoices.filter((inv) => inv.id !== invoiceId)
  return invoiceId
}