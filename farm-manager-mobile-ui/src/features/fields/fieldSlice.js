import { createSlice } from '@reduxjs/toolkit'

export const fieldSlice = createSlice({
  name: 'field',
  initialState: {
    fields: []
  },
  reducers: {
    setFields: (state, action) => {
      state.fields = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFields } = fieldSlice.actions

export default fieldSlice.reducer

export const selectFields = (state) => state.field.fields

export const selectFieldById = (state, id) => state.field.fields.find(e => e.id === id);




