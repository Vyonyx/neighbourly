import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  listings: []
}

import { useSession } from "next-auth/react";

export const getUserListingsThunk = createAsyncThunk('/userListings/getListings', async () => {
  const { data: session } = useSession()
  
  const res = await fetch('/api/db/getUserListings', {
    method: 'GET',
    body: JSON.stringify({userID: session?.user?.id})
  })

  const listings = await res.json()
  return listings
})

const userListingsSlice = createSlice({
  name: 'userListings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserListingsThunk.fulfilled, (state, action) => {
      state = action.payload
    })
  }
})

export default userListingsSlice.reducer