import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";


interface ILayoutState {
    layout: "dashboard" | "main",
    pageAccessState: "loading" | "authorized" | "unauthorized"
}

const initialState: ILayoutState = {
    layout: "main",
    pageAccessState: "loading"
}

const layout = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload
        },
        setPageAccessState: (state, action) => {
            state.pageAccessState = action.payload
        }
    }
})

export default layout.reducer

export const { setLayout, setPageAccessState } = layout.actions

export const selectCurrentLayout = (state: RootState) => state.layoutReducer.layout
export const selectCurrentPageAccessState = (state: RootState) => state.layoutReducer.pageAccessState