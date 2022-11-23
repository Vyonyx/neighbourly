import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Listings {
  listings: any[];
  isLoading: boolean;
}

const initialState:Listings = {
  listings: [],
  isLoading: false
}

export const getListings = createAsyncThunk(
  'listings/getListings',
  async () => {
    const response = await fetch('../pages/api/db/getListings', {
      method: 'GET',
    })
    const listings = await response.json()
    return listings
  }
)

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    add: (state, action) => {
      state.listings.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getListings.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getListings.fulfilled, (state, action) => {
      state.isLoading = false
      state.listings = action.payload
    })
    builder.addCase(getListings.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default listingsSlice.reducer