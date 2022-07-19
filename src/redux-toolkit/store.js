import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './counter';

const store = configureStore({
  reducer: {
    scoreCounter: scoreReducer
  },
})

export default store;