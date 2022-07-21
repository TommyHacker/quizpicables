import { createSlice } from "@reduxjs/toolkit";

// if username has been dispatched, set state to given username
export const playerMovesCountSlice = createSlice({
  name: "PlayerMovesCount",
  initialState: { playerMovesCount: 0 },

  reducers: {
    increment: (state, { payload }) => {
      state.playerMovesCount = payload;
    },
    reset: (state) => {
      state.playerMovesCount = 0;
    },
  },
});

export const playerMovesCountActions = playerMovesCountSlice.actions;

export default { playerMovesCountSlice };
