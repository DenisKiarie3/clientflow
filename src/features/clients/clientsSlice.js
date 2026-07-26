import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import * as clientsService from '../../services/api/clientsService'

const clientsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  return await clientsService.getClients()
})

export const addClient = createAsyncThunk('clients/addClient', async (clientData) => {
  return await clientsService.createClient(clientData)
})

export const editClient = createAsyncThunk('clients/editClient', async ({ clientId, updates }) => {
  return await clientsService.updateClient(clientId, updates)
})

export const removeClient = createAsyncThunk('clients/removeClient', async (clientId) => {
  return await clientsService.deleteClient(clientId)
})

const clientsSlice = createSlice({
  name: 'clients',
  initialState: clientsAdapter.getInitialState({
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        clientsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addClient.fulfilled, (state, action) => {
        clientsAdapter.addOne(state, action.payload)
      })
      .addCase(editClient.fulfilled, (state, action) => {
        clientsAdapter.upsertOne(state, action.payload)
      })
      .addCase(removeClient.fulfilled, (state, action) => {
        clientsAdapter.removeOne(state, action.payload)
      })
  },
})

export const clientsSelectors = clientsAdapter.getSelectors((state) => state.clients)
export const selectClientsStatus = (state) => state.clients.status
export const selectClientsError = (state) => state.clients.error

export default clientsSlice.reducer