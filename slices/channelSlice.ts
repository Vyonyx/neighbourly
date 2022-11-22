import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChannelState {
  selected: string | null;
}

const initialState: ChannelState = {
  selected: null
}

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    updateChannel: (state, action: PayloadAction<string>) => {
      state.selected = action.payload
    }
  }
})

export const { updateChannel } = channelSlice.actions

export default channelSlice.reducer