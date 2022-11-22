import { createSlice } from "@reduxjs/toolkit";

interface Listings {
  listings: any[];
}

const initialState:Listings = {
  listings: []
}

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    add: (state, action) => {
      state.listings.push(action.payload)
    }
  },
})

export default listingsSlice.reducer