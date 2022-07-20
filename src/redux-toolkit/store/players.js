import { createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
  name: "players",
  initialState: { players: [{ name: "founder", roomNumber: "guess" }] },

  reducers: {
    setPlayers: (state, { payload }) => {
      console.log("username, payload:", payload);

      state.players = payload;
    },
  },
});

export const playersActions = playersSlice.actions;

export default { playersSlice };
