import { createSlice } from '@reduxjs/toolkit'

export const productsFilter = createSlice({
  name: 'products filter',
  initialState: {
    value : [],
  },
  reducers: {
    updateProductsFilter: (state, action) => {
        state.value = action.payload
    },
  }
})

export const { updateProductsFilter } = productsFilter.actions

export default productsFilter.reducer