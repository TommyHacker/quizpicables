import { createSlice } from "@reduxjs/toolkit";

// if username has been dispatched, set state to given username
const usersSlice = createSlice({
  name: "users",
  initialState: [],

  reducers: {
    addUser: (state, { payload }) => {
      console.log("addUser, payload:", payload);
      state.users = [...state.users, payload];
    },
    removeUser: (state, { payload }) => {
      console.log("remove user", payload);
      let tempArr = state.users.filter((user) => user.name !== payload.name);
      state.users = tempArr;
    },
  },
});

export const usersActions = usersSlice.actions;

export { usersSlice };
