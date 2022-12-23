import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Form {
  isEdit: boolean,
  fields: {
    _id?: string;
    name: string;
    username: string;
    userID: string;
    description: string;
    isVegan: boolean;
    isGlutenFree: boolean;
    isFree: boolean;
    img: string;
  }
}

const initialState:Form = {
  isEdit: false,
  fields: {
    name: '',
    username: '',
    userID: '',
    description: '',
    isVegan: false,
    isGlutenFree: false,
    isFree: false,
    img: ''
  }
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<{id:any, value:any}>) => {
      const { id, value } = action.payload
      state.fields = {...state.fields, [id]: value}
    },
    reset: () => {
      return initialState
    },
    addUserDetails: (state, action: PayloadAction<{username:string; userID: string | number}>) => {
      state.fields.username = action.payload.username
      state.fields.userID = action.payload.userID.toString()
    },
    edit: (state, action) => {
      state.fields = action.payload
      state.isEdit = true
    }
  }
})

export const { update, reset, addUserDetails, edit } = formSlice.actions
export default formSlice.reducer