import { franchiseApi } from './data/franchiseApi';
import { combineReducers } from "@reduxjs/toolkit";
import entityDescriptionForm from "./entityDescriptionForm";
import layoutSlice from "./layoutSlice";


const combinedReducers = combineReducers({
    layoutReducer: layoutSlice,
    entityDescriptionForm: entityDescriptionForm,
    [franchiseApi.reducerPath]: franchiseApi.reducer
})

export default combinedReducers;

export type RootState = ReturnType<typeof combinedReducers>