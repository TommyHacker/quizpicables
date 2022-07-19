import { createSlice } from "@reduxjs/toolkit";

// If server emits "announcement" to socket, update systemMessages array.
export const connectedSlice = createSlice({
  name: "connected",
  initialState: {
    connected: false,
  },
  reducers: {
    setConnected: (state) => {
      //   switches the socket connection on or off
      state.connected = !state.connected;
    },
  },
});

// setConnected() to use
export const { setConnected } = connectedSlice.actions;

export default connectedSlice.reducer;
