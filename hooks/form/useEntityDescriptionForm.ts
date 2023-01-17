import { parse_query } from './../../utils/dynamic-forms/form-utils';
import { useState, useReducer } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { nextPhase, prevPhase, selectCurrentPhaseIndex, selectCurrentFormSchema, setFranchise, selectChosenFranchise, setCurrentPhase, resetState, dynamic_form_state, selectCurrentFormState } from './../../redux/entityDescriptionForm';
import { isUndefined, isEmpty, isNull } from 'lodash';
import { placeForm, fightForm, franchiseForm, gadgetForm, speciesForm } from './../../utils/dynamic-forms/form-schemas';
import { tFormType, IQueryInterface } from './../../types/forms';
import { initState, selectFormType, selectQueryFlow, selectQueryResults, setFormType, setQueryFlow, setQueryResults, updateField } from "../../redux/entityDescriptionForm";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { characterForm } from '../../utils/dynamic-forms/form-schemas';
import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../supabase/init.config';


export function useEntityDescriptionForm() {

    const dispatchAction = useAppDispatch()
    
    /**
     * @name results
     * @description query results
     */
    const results = useAppSelector(selectQueryResults)

    /**
     * @name currentPhaseIndex 
     * @description current phase index
     */
    const currentPhaseIndex = useAppSelector(selectCurrentPhaseIndex)


    /**
     * @name initFormState 
     * @param type 
     * @description initialize form state
     */
    const initFormState = (type: tFormType, state?: dynamic_form_state) => {
        const chosen_schema = (()=>{
            switch(type){
                case "characters":
                    return characterForm
                case "fights":
                    return fightForm
                case "places":
                    return placeForm
                case "franchise": 
                    return franchiseForm
                case "gadgets":
                    return gadgetForm
                case "species": 
                    return speciesForm
                default:
                    return null
            }
                
        })()


        // set up query flow
        let [init_queries, others]: Array<Array<IQueryInterface<any>>> = [
            (chosen_schema?.queries as any)?.filter(({query}: any)=>!isUndefined(query)),
            (chosen_schema?.queries as any)?.filter(({query}: any)=>isUndefined(query))
        ]
        let query_flow = init_queries.map((query, index)=> ({
            phase: index + 1,
            field: query.field,
        }))
        query_flow = query_flow.concat(others.map((query)=> ({
            phase: query_flow.length + 1,
            field: query.field,
        })))

        // set up query results
        let results = chosen_schema?.queries ? Object.fromEntries(chosen_schema?.queries?.map(({field, value})=> ([
            field, value
        ]))) : null

        // set up initial state
        const final_initial_state = {
            type: chosen_schema?.entity,
            query_flow,
            query_results: results,
            current_form_schema: chosen_schema,
            form_state: state ? state : "create"
        }

        // dispatch action
        dispatchAction(initState(final_initial_state))
    }

    /**
     * @name updateResult
     * @description updates the query results in the redux store
     */

    const updateResult = (field: string, value: any) => {
        dispatchAction(updateField({field, value}))
    }

    /**
     * @name next
     * @description next phase
     */

    const next = () => {
        dispatchAction(nextPhase())
    }

    /**
     * @name previous
     * @description previous phase
     */

    const previous = () => {

        dispatchAction(prevPhase())
    }

    /**
     * @name queryFlow
     */

    const queryFlow = useAppSelector(selectQueryFlow)

    /**
     * chosen_franchise 
     * @description chosen franchise
     */

    const chosen_franchise = useAppSelector(selectChosenFranchise)

    /**
     * @name load_current_form_queries_with_init_data 
     * @description loads the current query
     * 
     * @predicate currentPhaseSchema
     */

    const _schema = useAppSelector(selectCurrentFormSchema)
    const load_current_form_queries_with_init_data = async () => {
            let _qs = _schema?.queries?.map(async (query)=>{
                if(!isUndefined(query?.query)){
                    const { fn } = parse_query(query?.query)
                    const { data, error} = fn ? await supabase.rpc(fn, fn === "get_franchises" ? undefined : {franchise_id: chosen_franchise}) : {data: null, error: null}
                    let opts = data ? data?.filter((v)=> !isNull(v)) : []
                    return {
                        ...query,
                        options: opts
                    }
    
                }else{
                    return query
                }
            })
            try{
                let res = _qs  ? await Promise.all(_qs) : []
                // console.log("res", res)
                return res
            }catch (e){
                // console.log("error", e)
                return []
            }
        
    }

    /**
     * @name chooseFranchise
     * @description choose franchise
     * @param franchise_id
     * 
     */

    const chooseFranchise = (franchise_id: string) => {
        dispatchAction(setFranchise(franchise_id))
    }



    /**
     * @name changePhase
     * @description change phase
     * 
     */
    const changePhase = (phase: number) => {
        dispatchAction(setCurrentPhase(phase))
    }


    /**
     * @name getQueryValue 
     * @description get query value
     */

    const getQueryValue = (field: string) => {
        return results?.[field] || undefined
    }

    /**
     * @name currentFormType
     * @description chosen form type
     */

    const currentFormType = useAppSelector(selectFormType)

    /**
     * @name currentFormSchema 
     * @description current form schema
     */

    const currentFormSchema = useAppSelector(selectCurrentFormSchema)

    const resetSchema = (r: any) => {
        dispatchAction(resetState(isUndefined(r) ? null : r))
    }

    /**
     * @name currentFormState
     * @description - the current form's state
     */
    const currentFormState = useAppSelector(selectCurrentFormState)



    return {
        initFormState,
        updateResult,
        results,
        currentPhaseIndex,
        next,
        previous,
        load_current_form_queries_with_init_data,
        chooseFranchise,
        chosen_franchise,
        changePhase,
        getQueryValue,
        currentFormType,
        currentFormSchema,
        resetSchema,
        currentFormState
    }
}