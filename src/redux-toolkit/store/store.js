import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './counter';
import {joinModalSlice, settingsModalSlice} from './modal-slice';
import questionsSlice from './questions-slice';

const store = configureStore({
  reducer: {
    scoreCounter: scoreReducer,
    joinModal: joinModalSlice.reducer,
    settingsModal: settingsModalSlice.reducer,
    questions: questionsSlice.reducer
  },
})

export default store;
