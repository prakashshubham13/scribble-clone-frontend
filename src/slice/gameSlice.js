import { createSlice } from "@reduxjs/toolkit";

    /**
     * status code
     * 0:start game
     * 1:waiting for host to start game
     * 2:please select current word
     * 3:player xyz is selecting word
     * 4:complate the drawing
     * 5:player xyz is drawing
     * 6:show score
     */

const initialState = {
    gameStatusCode: 0,
    host: {id:'',name:''},
    hint:'',
    word:'',
    round:1
};


export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers:{
        updateGameStatusCode:(state,action)=>{
            state.gameStatusCode = action.payload;
        },
        updateHost:(state,action)=>{
            state.host = action.payload;
        },
        updateHint:(state,action)=>{
            state.hint = action.payload;
        },
        updateWord:(state,action)=>{
            state.word = action.payload;
        },
        updateRoundNumber:(state,action)=>{
            state.round = action.payload;
        }
    }
});

export const {updateGameStatusCode,updateHost,updateHint,updateWord,updateRoundNumber} = gameSlice.actions;
export default gameSlice.reducer;




