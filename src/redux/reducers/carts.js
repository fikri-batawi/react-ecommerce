import { createSlice } from '@reduxjs/toolkit'

export const carts = createSlice({
  name: 'carts',
  initialState: {
    value : [],
    totalCart : 0,
    totalPrice : 0,
  },
  reducers: {
    updateCarts: (state, action) => {
        // Update cart
        state.value = action.payload

        let carts = action.payload;
        // Sum price
        let totalPrice = 0;
        carts.forEach((cart) => {
          totalPrice += (cart.quantity * cart.price)
        })
        state.totalPrice = totalPrice
        // Count cart
        let totalCart = 0;
        carts.forEach((cart) => {
          totalCart += cart.quantity
        })
        state.totalCart = totalCart
    },
  }
})

export const { updateCarts } = carts.actions

export default carts.reducer