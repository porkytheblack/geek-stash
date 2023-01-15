import { createSlice } from '@reduxjs/toolkit'
import React, { useEffect, useReducer } from 'react'
import { supabase } from '../../supabase/init.config'

interface IProps {
    rpc: string,
    params: any
}

interface IReducer {
    data: any,
    isError: boolean,
    isLoading: boolean
}

const initialState: IReducer = {
    data: null,
    isError: false,
    isLoading: false
}

const rpcReducerState = createSlice({
    name: 'rpc',
    initialState,
    reducers: {
        rpcQueryPending: (state: IReducer) => {
            state.isLoading = true
        },
        rpcQuerySuccess: (state: IReducer, action) => {
            state.isLoading = false
            state.data = action.payload
        },
        rpcQueryError: (state: IReducer) => {
            state.isLoading = false
            state.isError = true
        }
    }
})

const { rpcQueryPending, rpcQuerySuccess, rpcQueryError } = rpcReducerState.actions

const reducer = rpcReducerState.reducer

function useRPCQuery(props: IProps) {
    const [ {
        data,
        isError,
        isLoading
    }, dispatchAction ] = useReducer(reducer, initialState)
    const {rpc, params} = props

    useEffect(()=>{
        if(!rpc) return
        dispatchAction(rpcQueryPending())
        supabase.rpc(rpc, params)
            .then(({ data, error }) => {
                if(error) {
                    dispatchAction(rpcQueryError())
                } else {
                    dispatchAction(rpcQuerySuccess(data))
                }
            })

    }, [rpc, params])
  return {
        data,
        isError,
        isLoading
  }
}

export default useRPCQuery