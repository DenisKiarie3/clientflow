import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from '../features/clients/clientsSlice'
import invoicesReducer from '../features/invoices/invoicesSlice'

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    invoices: invoicesReducer,
  },
})