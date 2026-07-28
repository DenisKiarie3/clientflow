import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as settingsService from '../../services/api/settingsService'

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async () => {
  return await settingsService.getSettings()
})

export const saveSettings = createAsyncThunk('settings/saveSettings', async (updates) => {
  return await settingsService.updateSettings(updates)
})

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.data = action.payload
      })
  },
})

export const selectSettingsData = (state) => state.settings.data
export const selectSettingsStatus = (state) => state.settings.status
export const selectSettingsError = (state) => state.settings.error

export default settingsSlice.reducer