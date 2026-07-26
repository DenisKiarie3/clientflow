import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from '../features/clients/clientsSlice'

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
})