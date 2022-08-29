import { configureStore } from '@reduxjs/toolkit'
import fieldReducer from '../features/fields/fieldSlice'
import { apiSlice } from './api/apiSlice'
import appReducer from '../features/app/appSlice'

// export default configureStore({
//   reducer: {
//     field: fieldReducer,
//   },
// })


export default configureStore({
  reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      app: appReducer,
      // field: fieldReducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})
