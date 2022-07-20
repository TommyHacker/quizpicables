import { createSlice } from "@reduxjs/toolkit";

// If server emits "announcement" to socket, update systemMessages array.
export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: ["these are default messages", "for displaying on the page"],
  },
  reducers: {
    update: (state, { payload }) => {
      //   spread the current systemMessages and append the new payload
      state.messages = [...state.messages, payload];
    },
  },
});

export const messagesActions = messagesSlice.actions;

export default { messagesSlice };
