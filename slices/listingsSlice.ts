import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Listings {
  items: any[];
  isLoading: boolean;
}

const initialState:Listings = {
  items: [],
  isLoading: false
}

export const getListings = createAsyncThunk(
  'listings/getListings',
  async () => {
    const response = await fetch('/api/db/getListings', {
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
      state.items.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getListings.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getListings.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(getListings.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default listingsSlice.reducer