import { createSlice } from "@reduxjs/toolkit";

// If server emits "announcement" to socket, update systemMessages array.
export const systemMessageSlice = createSlice({
  name: "systemMessage",
  initialState: {
    systemMessage: ["loading"],
  },
  reducers: {
    setSystemMessage: (state, { payload }) => {
      //   spread the current systemMessages and append the new payload
      state.systemMessage = [...state.systemMessage, payload];
    },
  },
});

// setSystemMessage(payload) to use
export const { setSystemMessage } = systemMessageSlice.actions;

export default systemMessageSlice.reducer;
