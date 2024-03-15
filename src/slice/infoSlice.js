import { createSlice } from "@reduxjs/toolkit";

const initialState = {
name:'dsd'
};

export const infoSlice = createSlice({
name:'info',
initialState:initialState,
reducers:{
    changeName: (state,action)=> {
        console.log(action);
        state.name = action.payload.name;
    } 
}
});

export const { changeName } = infoSlice.actions;
export default infoSlice.reducer;
