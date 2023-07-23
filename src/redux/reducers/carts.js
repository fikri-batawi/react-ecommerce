import { createSlice } from '@reduxjs/toolkit'

export const carts = createSlice({
  name: 'carts',
  initialState: {
    value : [],
  },
  reducers: {
    updateCarts: (state, action) => {
        state.value = action.payload
    },
  }
})

export const { updateCarts } = carts.actions

export default carts.reducer