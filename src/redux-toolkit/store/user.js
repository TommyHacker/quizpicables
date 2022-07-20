import { createSlice } from "@reduxjs/toolkit";

// if username has been dispatched, set state to given username
const usernameSlice = createSlice({
  name: "username",
  initialState: { username: "Host" },

  reducers: {
    setUsername: (state, { payload }) => {
      console.log("username, payload:", payload);
      state.username = payload;
    },
  },
});

const isHostSlice = createSlice({
  name: "isHost",
  initialState: { isHost: false },
  reducers: {
    setIsHost: (state) => {
      console.log("ishost, payload: ", state.isHost);
      switch (state.isHost) {
        case false:
          state.isHost = true;
          break;
        case true:
          state.isHost = false;
          break;
        default:
          return state.isHost;
      }
    },
  },
});

const roomNumberSlice = createSlice({
  name: "roomNumber",
  initialState: { roomNumber: 0 },

  reducers: {
    setRoomNumber: (state, { payload }) => {
      console.log("roomnumber payload: ", payload);
      state.roomNumber = payload;
    },
  },
});

const scoreSlice = createSlice({
  name: "score",
  initialState: { score: 0 },
  reducers: {
    setScore: (state, { payload }) => {
      console.log("playerScore payload:", payload);
      state.score = payload;
    },
  },
});

export const usernameActions = usernameSlice.actions;
export const isHostActions = isHostSlice.actions;
export const roomNumberActions = roomNumberSlice.actions;
export const scoreActions = scoreSlice.actions;

export { usernameSlice, isHostSlice, roomNumberSlice, scoreSlice };
