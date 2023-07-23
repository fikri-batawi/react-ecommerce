import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    value : {},
  },
  reducers: {
    updateUser: (state, action) => {
        state.value = action.payload
    },
  }
})

export const { updateUser } = user.actions

export default user.reducer