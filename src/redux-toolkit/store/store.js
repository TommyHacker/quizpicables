import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './counter';
import {joinModalSlice, settingsModalSlice} from './modal-slice';

const store = configureStore({
  reducer: {
    scoreCounter: scoreReducer,
    joinModal: joinModalSlice.reducer,
    settingsModal: settingsModalSlice.reducer,
  },
})

export default store;
