import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  score: 0,
}

export const counterSlice = createSlice({
  name: 'Score',
  initialState,
  reducers: {
    correct: (state) => {
      state.score += 1
    },
    incorrect: (state) => {
      state.score += 0
    },
    incrementByAmount: (state, action) => {
      state.score += action.payload
    },   //POTENTIAL ALTERNATE SCORE FUNCTION - DEFAULT CORRECT 1000POINTS (MINUS TIME TO ANSWER 0-1000) 
  },
})

// Action creators are generated for each case reducer function
export const { correct, incorrect, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer