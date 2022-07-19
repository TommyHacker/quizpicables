import { createSlice } from "@reduxjs/toolkit";

// if username has been dispatched, set state to given username
export const userSlice = createSlice({
  name: "username",
  initialState: {
    username: "anonymous",
  },
  reducers: {
    setUsername: (state, { payload }) => {
      console.log(payload);
      state.username = payload;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
