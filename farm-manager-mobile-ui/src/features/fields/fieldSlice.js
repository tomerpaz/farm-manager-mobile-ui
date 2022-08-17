import { createSlice } from '@reduxjs/toolkit'

export const fieldSlice = createSlice({
  name: 'field',
  initialState: {
    value: 0,
    selectedField: null,
  },
  reducers: {
    selectField: (state, action) => {
      state.selectedField = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { selectField } = fieldSlice.actions

export default fieldSlice.reducer