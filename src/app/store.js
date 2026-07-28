import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from '../features/clients/clientsSlice'
import invoicesReducer from '../features/invoices/invoicesSlice'
import uiReducer from '../features/ui/uiSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    invoices: invoicesReducer,
    ui: uiReducer,
  },
})