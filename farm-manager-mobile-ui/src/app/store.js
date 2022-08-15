import { configureStore } from '@reduxjs/toolkit'
import fieldReducer from '../features/fields/fieldSlice'
import { apiSlice } from './api/apiSlice'
import authReducer from '../features/auth/authSlice'

// export default configureStore({
//   reducer: {
//     field: fieldReducer,
//   },
// })


export default configureStore({
  reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
  //    field: fieldReducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})
