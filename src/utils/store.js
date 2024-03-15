import { configureStore } from "@reduxjs/toolkit";
import devToolsEnhancer from 'remote-redux-devtools';
import toolkitSlice from "../slice/toolkitSlice";
import infoSlice from "../slice/infoSlice";

export const store = configureStore({
    reducer:{
        toolkit: toolkitSlice,
        info: infoSlice,
    },
    // enhancers: [devToolsEnhancer({ realtime: true})],
});