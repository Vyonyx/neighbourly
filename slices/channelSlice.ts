import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChannelState {
  channel: string | null;
}

const initialState: ChannelState = {
  channel: null
}

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    updateChannel: (state, action: PayloadAction<string>) => {
      state.channel = action.payload
    }
  }
})

export const { updateChannel } = channelSlice.actions

export default channelSlice.reducer