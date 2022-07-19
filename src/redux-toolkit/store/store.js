import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./counter";
import { joinModalSlice, settingsModalSlice } from "./modal-slice";
import userReducer from "./user";
import systemMessageReducer from "./quizMessage";
import connectedReducer from "./connected";

const store = configureStore({
  reducer: {
    scoreCounter: scoreReducer,
    joinModal: joinModalSlice.reducer,
    settingsModal: settingsModalSlice.reducer,
    username: userReducer,
    systemMessage: systemMessageReducer,
    connected: connectedReducer,
  },
});

export default store;
