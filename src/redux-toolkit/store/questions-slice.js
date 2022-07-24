import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    question_category: '',
    question_difficulty: '',
    question_type: '',
    amount_of_questions: 10,
    score: 0
};


const questionsSlice = createSlice ({
    name:'questions',
    initialState: initialState,
    reducers: {
        changeCategory(state, action) {
            state.question_category = action.payload;
        },

        changeDifficulty(state, action) {
            state.question_difficulty = action.payload;

        },
        changeAmount(state, action) {
            state.amount_of_questions = action.payload;
        },

        changeScore(state, action) {
            state.score = action.payload;   
        },
    }
})

export const {changeCategory, changeDifficulty, changeAmount, changeScore } = questionsSlice.actions;

export default questionsSlice;