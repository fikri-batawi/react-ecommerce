import { createSlice } from '@reduxjs/toolkit'

export const alertMessage = createSlice({
  name: 'alert message',
  initialState: {
    value : {},
  },
  reducers: {
    updateAlertMessage: (state, action) => {
        state.value = action.payload
    },
  }
})

export const { updateAlertMessage } = alertMessage.actions

export default alertMessage.reducer