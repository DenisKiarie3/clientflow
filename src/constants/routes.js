export const ROUTES = {
  DASHBOARD: '/',
  CLIENTS: '/clients',
  CLIENT_DETAIL: '/clients/:clientId',
  INVOICES: '/invoices',
  INVOICE_CREATE: '/invoices/new',
  INVOICE_DETAIL: '/invoices/:invoiceId',
  SETTINGS: '/settings',
  LOGIN: '/login',
}

export const clientDetailPath = (clientId) => `/clients/${clientId}`
export const invoiceDetailPath = (invoiceId) => `/invoices/${invoiceId}`