import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserListings {
  isLoading: boolean;
  listings: any[]
}

const initialState:UserListings = {
  isLoading: false,
  listings: []
}

import { useSession } from "next-auth/react";

export const getUserListingsThunk = createAsyncThunk(
  'userListings/getUserListingsThunk', 
  async (userID:string) => {
    const res = await fetch('/api/db/getUserListings/' + userID, {
      method: 'GET',
    })

    const listings = await res.json()
    return listings
  }
)

const userListingsSlice = createSlice({
  name: 'userListings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserListingsThunk.pending, (state) => {
      state.isLoading = true
    }),
    builder.addCase(getUserListingsThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.listings = action.payload
    })
    builder.addCase(getUserListingsThunk.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default userListingsSlice.reducer