import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './counter';

export default configureStore({
  reducer: {
    scoreCounter: scoreReducer,
  },
})