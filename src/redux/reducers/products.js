import { createSlice } from '@reduxjs/toolkit'

export const products = createSlice({
  name: 'products',
  initialState: {
    value : [],
  },
  reducers: {
    updateProducts: (state, action) => {
        state.value = action.payload
    },
  }
})

export const { updateProducts } = products.actions

export default products.reducer