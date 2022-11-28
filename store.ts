import { configureStore } from '@reduxjs/toolkit'
import channelReducer from './slices/channelSlice'
import listingsReducer from './slices/listingsSlice'
import userListingsReducer from './slices/userListingsSlice'

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    listings: listingsReducer,
    userListings: userListingsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch