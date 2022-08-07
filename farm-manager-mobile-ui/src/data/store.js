import { configureStore } from '@reduxjs/toolkit'
import fieldReducer from './slices/fieldSlice'

export default configureStore({
  reducer: {
    field: fieldReducer,
  },
})

