import { createSlice } from "@reduxjs/toolkit";
import { COLORS, MENU_ITEMS } from "../utils/constants";

const initialState = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3
    },
    [MENU_ITEMS.ERASER]: {
        color: COLORS.WHITE,
        size: 3
    },
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.REDO]: {},
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem: null
};

export const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: initialState,
    reducers: {
        changeColor: (state, action) => {
            
        }
    }
});

export const {changeColor} = toolkitSlice.actions;

export default toolkitSlice.reducer;
