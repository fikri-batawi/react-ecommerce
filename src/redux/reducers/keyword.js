import { createSlice } from '@reduxjs/toolkit'

export const keyword = createSlice({
  name: 'keyword',
  initialState: {
    value : null,
  },
  reducers: {
    updateKeyword: (state, action) => {
        state.value = action.payload
    },
  }
})

export const { updateKeyword } = keyword.actions

export default keyword.reducer