import { useRouter } from 'next/router';
import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { useReducer } from 'react';
import { supabase } from "../../supabase/init.config"


interface authState {
    loading: boolean,
    error: any,
    current_provider?: "google" | "github" 
}

const initialState: authState = {
    loading: false,
    error: null,
    current_provider: undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
            state.error = null
            if(action.payload === false){
                state.current_provider = undefined
            }
        },
        setError: (state, action) => {
            state.error = action.payload
            if(!isEmpty(action.payload)){
                state.loading = false
            }
        },
        setCurrentProvider: (state, action) => {
            state.current_provider = action.payload
        }
    }
})

const reducer = authSlice.reducer

const { setError, setLoading, setCurrentProvider } = authSlice.actions


export function useAuth() {
    const [{
        loading,
        error,
        current_provider
    }, dispatchAction] = useReducer(reducer, initialState)

    /**
     * @name signInWithOauth
     * @description Signs in with google
     */

    const signInWithOauth = ( provider: "google" | "github" ) => {
        supabase.auth.getUser().then(({data: {user}})=>{
            if(isEmpty(user)){
                supabase.auth.signInWithOAuth({
                    provider: provider,
                }).then(({data, error})=>{
                    if(!isEmpty(error)){

                        dispatchAction(setError(error))
                        /**
                         * @todo - add error handling
                         */
                    }else{
                        dispatchAction(setLoading(false))
                        /**
                         * @todo - set loading to false
                         */
                    }
                })
            }else{
                /**
                 * @todo - add redirect to dashboard
                 */
                console.log("Redirecting::", user, "to dashboard")
            }
        }).catch((e)=>{
            setError(e)
            /**
             * @todo - add error handling
             */
        })
        
    }
    /**
     * @name signInWithGoogle
     */
    const signInWithGoogle = () => {
        setCurrentProvider("google")
        signInWithOauth("google")
    }

    /**
     * @name signInWithGithub
     */
    const signInWithGithub = () => {
        setCurrentProvider("github")
        signInWithOauth("github")
    }

    /**
     * @name signOut
     * @description Signs out
     */
    const signOut = () => {
        supabase.auth.signOut().then(({error})=>{
            console.log(error)
        })
    }

    return {
        signInWithGoogle,
        signInWithGithub,
        signOut,
        loading,
        error,
        current_provider
    }
}