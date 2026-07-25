import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // slices get added here one at a time, as we build each feature
  },
})