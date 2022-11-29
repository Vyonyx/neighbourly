import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Form {
  name: string;
  img: string;
  username: string;
  userID: string;
  description: string;
  isVegan: boolean;
  isGlutenFree: boolean;
  isFree: boolean;
}

const initialState:Form = {
  name: '',
  img: '',
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
    }
  }
})

export const { update } = formSlice.actions
export default formSlice.reducer