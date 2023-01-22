import { ApiKeysApi } from './data/apiKeys';
import { franchiseApi } from './data/franchiseApi';
import { TypedUseSelectorHook } from './../node_modules/react-redux/es/types.d';
import { configureStore, Dispatch } from "@reduxjs/toolkit"
import combinedReducers, { RootState } from "./rootReducer"
import { useDispatch, useSelector } from "react-redux"


const store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(franchiseApi.middleware)
    .concat(ApiKeysApi.middleware)
})

export default store

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
