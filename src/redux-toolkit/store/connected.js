import { createSlice } from "@reduxjs/toolkit";

export const connectedSlice = createSlice({
  name: "connected",
  initialState: {
    connected: false,
  },
  reducers: {
    setConnected: (state) => {
      //   switches the socket connection on or off
      // when changed to true, the socket component will fire a connection request to the server socket.io setup
      console.log("connection", state.connected.toString());
      state.connected = !state.connected;
    },
  },
});

// setConnected() to use
export const { setConnected } = connectedSlice.actions;

export default connectedSlice.reducer;
