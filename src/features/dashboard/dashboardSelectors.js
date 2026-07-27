import { createSelector } from '@reduxjs/toolkit'
import { invoicesSelectors, selectInvoicesWithClientNames } from '../invoices/invoicesSlice'
import { calculateTotal, isOverdue } from '../../utils/invoiceCalculations'

export const selectDashboardStats = createSelector(
  [invoicesSelectors.selectAll],
  (invoices) => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    let outstandingTotal = 0
    let paidThisMonthTotal = 0
    let overdueCount = 0

    invoices.forEach((invoice) => {
      const total = calculateTotal(invoice.lineItems, invoice.taxRate)

      if (invoice.status === 'sent' || invoice.status === 'overdue') {
        outstandingTotal += total
      }

      if (invoice.status === 'paid') {
        const paidMonth = (invoice.paidAt ?? invoice.issueDate).slice(0, 7)
        if (paidMonth === currentMonth) paidThisMonthTotal += total
      }

      if (invoice.status === 'overdue' || isOverdue(invoice)) {
        overdueCount += 1
      }
    })

    return { outstandingTotal, paidThisMonthTotal, overdueCount }
  }
)

export const selectRecentInvoices = createSelector(
  [selectInvoicesWithClientNames],
  (invoices) => [...invoices].sort((a, b) => b.issueDate.localeCompare(a.issueDate)).slice(0, 5)
)