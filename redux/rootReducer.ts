import { ApiKeysApi } from './data/apiKeys';
import { franchiseApi } from './data/franchiseApi';
import { combineReducers } from "@reduxjs/toolkit";
import entityDescriptionForm from "./entityDescriptionForm";
import layoutSlice from "./layoutSlice";
import usageApi from './data/usageApi';


const combinedReducers = combineReducers({
    layoutReducer: layoutSlice,
    entityDescriptionForm: entityDescriptionForm,
    [franchiseApi.reducerPath]: franchiseApi.reducer,
    [ApiKeysApi.reducerPath]: ApiKeysApi.reducer,
    [usageApi.reducerPath]: usageApi.reducer
})

export default combinedReducers;

export type RootState = ReturnType<typeof combinedReducers>