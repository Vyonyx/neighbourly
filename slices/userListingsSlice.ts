import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserListings {
  isLoading: boolean;
  listings: any[]
}

const initialState:UserListings = {
  isLoading: false,
  listings: []
}

export const getUserListingsThunk = createAsyncThunk(
  'userListings/getUserListingsThunk', 
  async (userID:string) => {
    const res = await fetch('/api/db/userListings/' + userID, {
      method: 'GET',
    })

    const listings = await res.json()
    return listings
  }
)

export const deleteUserListingThunk = createAsyncThunk(
  'userListings/deleteUserListingThunk',
  async (listingID:string) => {
    const res = await fetch('/api/db/userListings/' + listingID, {
      method: 'DELETE',
    })
    const id = await res.json()
    return id
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
    }),
    builder.addCase(deleteUserListingThunk.fulfilled, (state, action) => {
      state.listings = state.listings.filter(item => item._id !== action.payload)
    })
  }
})

export default userListingsSlice.reducer