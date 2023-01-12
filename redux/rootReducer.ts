import { combineReducers } from "@reduxjs/toolkit";
import layoutSlice from "./layoutSlice";


const combinedReducers = combineReducers({
    layoutReducer: layoutSlice
})

export default combinedReducers;

export type RootState = ReturnType<typeof combinedReducers>