import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./counter";
import { joinModalSlice, settingsModalSlice } from "./modal-slice";
import {
  usernameSlice,
  isHostSlice,
  roomNumberSlice,
  scoreSlice,
} from "./user";
import { messagesSlice } from "./messages";
import connectedReducer from "./connected";
import questionsSlice from "./questions-slice";
import { playersSlice } from "./players";
import { playerMovesCountSlice } from "./playerMovesCount";

const store = configureStore({
  reducer: {
    scoreCounter: scoreReducer,
    joinModal: joinModalSlice.reducer,
    settingsModal: settingsModalSlice.reducer,
    players: playersSlice.reducer,
    username: usernameSlice.reducer,
    isHost: isHostSlice.reducer,
    roomNumber: roomNumberSlice.reducer,
    score: scoreSlice.reducer,
    playerMovesCount: playerMovesCountSlice.reducer,
    messages: messagesSlice.reducer,
    connected: connectedReducer,
    questions: questionsSlice.reducer,
  },
});

export default store;
