import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./counter";
import userReducer from "./user";
import systemMessageReducer from "./quizMessage";
import connectedReducer from "./connected"

const store = configureStore({
  reducer: {
    scoreCounter: scoreReducer,
    username: userReducer,
    systemMessage: systemMessageReducer,
    connected: connectedReducer
  },
});

export default store;
