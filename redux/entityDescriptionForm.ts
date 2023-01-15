import { isEmpty } from 'lodash';
import { RootState } from './rootReducer';
import { IDynamicForm } from './../types/forms';
import { createSlice } from '@reduxjs/toolkit';

interface IReducerState {
    type: string,
    query_flow: Array<{
        phase: number,
        query: string,
    }> | null,
    query_results: {
        [key: string]: any
    } | null,
    current_form_schema: IDynamicForm<any> | null,
    current_phase_index: number,
    chosen_franchise: string,
}

const initialState: IReducerState = {
    type: "",
    query_flow: null,
    query_results: null,
    current_form_schema: null,
    current_phase_index: -1,
    chosen_franchise: ''
}


const entityDescriptionForm = createSlice({
    name: 'entityDescriptionForm',
    initialState,
    reducers: {
        setFormType: (state, action) => {
            state.type = action.payload
        },
        setQueryFlow: (state, action) => {
            state.query_flow = action.payload
        },
        setQueryResults: (state, action) => {
            state.query_results = action.payload
        },
        initState: (state, action) => {
            state.type = action.payload.type
            state.query_flow = action.payload.query_flow
            state.query_results = action.payload.query_results
            state.current_form_schema = action.payload.current_form_schema
        },
        resetState: (state, action) => {
            state.type = action.payload.back_one ? state.type : ""
            state.query_flow = null
            state.query_results = null
            state.current_form_schema = null
            state.current_phase_index = action.payload.back_one ? 0 : -1
            state.chosen_franchise =  action.payload.back_one ? state.chosen_franchise :''
        },
        updateField: (state, action) => {
            state.query_results = state.query_results ? {
                ...state.query_results,
                [action.payload.field]: action.payload.value
            } : null
        },
        nextPhase: (state) => {
            state.current_phase_index = state.current_phase_index + 1
        },
        prevPhase: (state) => {
            state.current_phase_index = state.type === "franchise" ? -1 : state.current_phase_index - 1
        },
        setFranchise: (state, action) => {
            state.chosen_franchise = action.payload
        },
        setCurrentPhase: (state, action) => {
            state.current_phase_index = action.payload
        }
    }
})

export default entityDescriptionForm.reducer

export const { setFormType, setQueryFlow, setQueryResults, initState, resetState, updateField, nextPhase, prevPhase, setFranchise, setCurrentPhase } = entityDescriptionForm.actions


export const selectFormType = (state: RootState) => state.entityDescriptionForm.type
export const selectQueryFlow = (state: RootState) => state.entityDescriptionForm.query_flow
export const selectQueryResults = (state: RootState) => state.entityDescriptionForm.query_results
export const selectCurrentPhaseIndex = (state: RootState) => state.entityDescriptionForm.current_phase_index
export const selectCurrentFormSchema = (state: RootState) => state.entityDescriptionForm.current_form_schema
export const selectChosenFranchise = (state: RootState) => state.entityDescriptionForm.chosen_franchise
