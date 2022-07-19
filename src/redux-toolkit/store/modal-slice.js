

//Import createSlice
import { createSlice} from "@reduxjs/toolkit";


//Create initialState 
const initialModalState = {modalIsVisible: true};

//Create Join Modal Slice 
const joinModalSlice = createSlice({
    name: 'joinModal',
    initialState: initialModalState,
    reducers: {
        toggleModal(state) {
            state.modalIsVisible = !state.modalIsVisible;
        }
    }
})

//Create Settings Modal Slice 
const settingsModalSlice = createSlice({
    name: 'settingsModal',
    initialState: {settingsModalIsVisible: true},
    reducers: {
        toggleSettingsModal(state) {
            state.settingsModalIsVisible = !state.settingsModalIsVisible;
        }
    }
})

//Export slice & actions 
export const joinModalActions = joinModalSlice.actions;
export const settingsModalActions = settingsModalSlice.actions
export {joinModalSlice, settingsModalSlice};

