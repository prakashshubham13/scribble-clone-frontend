import { configureStore } from "@reduxjs/toolkit";
import devToolsEnhancer from 'remote-redux-devtools';
import toolkitSlice from "../slice/toolkitSlice";
import infoSlice from "../slice/infoSlice";
import playerSlice from "../slice/playerSlice";
import gameSlice from "../slice/gameSlice";
import canvasSlice from "../slice/canvasSlice";

export const store = configureStore({
    reducer:{
        toolkit: toolkitSlice,
        info: infoSlice,
        player: playerSlice,
        game:gameSlice,
        canvas:canvasSlice
    },
    // enhancers: [devToolsEnhancer({ realtime: true})],
});