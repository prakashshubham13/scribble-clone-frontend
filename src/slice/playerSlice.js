import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerList: []
};

export const playerSlice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers:{
        updatePlayerList:(state,action)=>{
            state.playerList = action.payload
        }
    }
});

export const {updatePlayerList} = playerSlice.actions;
export default playerSlice.reducer;