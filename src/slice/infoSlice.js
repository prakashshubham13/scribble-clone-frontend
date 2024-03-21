import { createSlice } from "@reduxjs/toolkit";

const initialState = {
name:'dsd',
room: null
};

export const infoSlice = createSlice({
name:'info',
initialState:initialState,
reducers:{
    changeName: (state,action)=> {
        console.log(action);
        state.name = action.payload.name;
        state.room = action.payload.room;
    }, 
    changeGameStatus: (state,action)=> {
        console.log(action);
        state.staus = action.payload.status;
    } 
}
});

export const { changeName } = infoSlice.actions;
export default infoSlice.reducer;
