import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Form {
  name: string;
  username: string;
  userID: string;
  description: string;
  isVegan: boolean;
  isGlutenFree: boolean;
  isFree: boolean;
}

const initialState:Form = {
  name: '',
  username: '',
  userID: '',
  description: '',
  isVegan: false,
  isGlutenFree: false,
  isFree: false
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<{id:any, value:any}>) => {
      const { id, value } = action.payload
      return {...state, [id]: value}
    },
    reset: () => {
      return initialState
    },
    addUserDetails: (state, action: PayloadAction<{username:string; userID: string}>) => {
      state.username = action.payload.username
      state.userID = action.payload.userID
    },
    edit: (state, action) => {
      return action.payload
    }
  }
})

export const { update, reset, addUserDetails, edit } = formSlice.actions
export default formSlice.reducer