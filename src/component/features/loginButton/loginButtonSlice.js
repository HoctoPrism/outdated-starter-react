import { createSlice } from '@reduxjs/toolkit'

export const loginButtonSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    loggedTrue: (state) => {
      state.value = true
    },
    loggedFalse: (state) => {
      state.value = false
    }
  },
})

export const { loggedTrue, loggedFalse } = loginButtonSlice.actions

export default loginButtonSlice.reducer