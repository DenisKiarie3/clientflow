import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast: {
      reducer(state, action) {
        state.toasts.push(action.payload)
      },
      prepare(message, type = 'info') {
        return { payload: { id: crypto.randomUUID(), message, type } }
      },
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = uiSlice.actions
export const selectToasts = (state) => state.ui.toasts
export default uiSlice.reducer