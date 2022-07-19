import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./counter";
import { joinModalSlice, settingsModalSlice } from "./modal-slice";
import {
  usernameSlice,
  isHostSlice,
  roomNumberSlice,
  scoreSlice,
} from "./user";
import systemMessageReducer from "./quizMessage";
import connectedReducer from "./connected";

const store = configureStore({
  reducer: {
    scoreCounter: scoreReducer,
    joinModal: joinModalSlice.reducer,
    settingsModal: settingsModalSlice.reducer,
    username: usernameSlice.reducer,
    isHost: isHostSlice.reducer,
    roomNumber: roomNumberSlice.reducer,
    score: scoreSlice.reducer,
    systemMessage: systemMessageReducer,
    connected: connectedReducer,
  },
});

export default store;
