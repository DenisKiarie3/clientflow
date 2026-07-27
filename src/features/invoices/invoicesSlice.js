import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import * as invoicesService from '../../services/api/invoicesService'
import { clientsSelectors } from '../clients/clientsSlice'

const invoicesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.dueDate.localeCompare(b.dueDate),
})

export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
  return await invoicesService.getInvoices()
})

export const addInvoice = createAsyncThunk('invoices/addInvoice', async (invoiceData) => {
  return await invoicesService.createInvoice(invoiceData)
})

export const editInvoice = createAsyncThunk('invoices/editInvoice', async ({ invoiceId, updates }) => {
  return await invoicesService.updateInvoice(invoiceId, updates)
})

export const markInvoicePaid = createAsyncThunk('invoices/markInvoicePaid', async (invoiceId) => {
  return await invoicesService.updateInvoice(invoiceId, { status: 'paid', paidAt: new Date().toISOString() })
})

export const removeInvoice = createAsyncThunk('invoices/removeInvoice', async (invoiceId) => {
  await invoicesService.deleteInvoice(invoiceId)
  return invoiceId
})

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: invoicesAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded'
        invoicesAdapter.setAll(state, action.payload)
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addInvoice.fulfilled, invoicesAdapter.addOne)
      .addCase(editInvoice.fulfilled, invoicesAdapter.upsertOne)
      .addCase(markInvoicePaid.fulfilled, invoicesAdapter.upsertOne)
      .addCase(removeInvoice.fulfilled, invoicesAdapter.removeOne)
  },
})

export const invoicesSelectors = invoicesAdapter.getSelectors((state) => state.invoices)
export const selectInvoicesStatus = (state) => state.invoices.status
export const selectInvoicesError = (state) => state.invoices.error

export const selectInvoicesWithClientNames = createSelector(
  [invoicesSelectors.selectAll, clientsSelectors.selectEntities],
  (invoices, clientsById) =>
    invoices.map((invoice) => ({
      ...invoice,
      clientName: clientsById[invoice.clientId]?.name ?? 'Unknown client',
    }))
)

export const makeSelectInvoiceWithClient = (invoiceId) =>
  createSelector(
    [(state) => invoicesSelectors.selectById(state, invoiceId), clientsSelectors.selectEntities],
    (invoice, clientsById) =>
      invoice ? { ...invoice, client: clientsById[invoice.clientId] } : undefined
  )

export const makeSelectInvoicesByClient = (clientId) =>
  createSelector(
    [invoicesSelectors.selectAll],
    (invoices) => invoices.filter((invoice) => invoice.clientId === clientId)
  )

export default invoicesSlice.reducer