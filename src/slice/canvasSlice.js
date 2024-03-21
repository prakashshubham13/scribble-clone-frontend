import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enableCanvas: false
};

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState: initialState,
    reducers:{
        enableCanvas:(state,action)=>{
            state.enableCanvas = action.payload;
        }
    } 
});

export const {enableCanvas} = canvasSlice.actions;
export default canvasSlice.reducer;