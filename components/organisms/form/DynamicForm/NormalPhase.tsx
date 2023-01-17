/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Notification } from '@mantine/core'
import { createSlice } from '@reduxjs/toolkit'
import { IconCheck } from '@tabler/icons'
import { isEmpty, omit, uniq } from 'lodash'
import React, { useEffect, useReducer, useState } from 'react'
import { useEntityDescriptionForm } from '../../../../hooks/form/useEntityDescriptionForm'
import { supabase } from '../../../../supabase/init.config'
import { IQueryInterface } from '../../../../types/forms'
import { parse_query } from '../../../../utils/dynamic-forms/form-utils'
import PhaseQuery from './PhaseQuery'

interface IProps {
  onDone?: () => void
}

interface IReducerState {
  queries: Array<IQueryInterface<any>>
}

const initialState: IReducerState = {
  queries: []
}

const reducerSlice = createSlice({
  name: "normalPhase",
  initialState,
  reducers: {
    setQueries: (state, action) => {
      state.queries = uniq(action.payload?.filter(({field}: any)=> field !== "franchise"))
    }
  }
})

const { setQueries } = reducerSlice.actions

export const { reducer } = reducerSlice

function NormalPhase(props: IProps) {
  const [empty_q, set_empty_q] = useState<Array<string>>()
  const [{queries}, dispatch] = useReducer(reducer, initialState)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const { onDone } = props

  const {load_current_form_queries_with_init_data : load_queries, updateResult,previous:  _previous, currentFormSchema, results, chosen_franchise, currentFormType, resetSchema, currentFormState} = useEntityDescriptionForm()


  const previous = () => {
    _previous()
    resetSchema({
      back_one: true
    })
  }
  

  useEffect(()=>{
    (async ()=>{
      const _qs = await load_queries()
      !isEmpty(_qs) && dispatch(setQueries(_qs))
    })()
    
  }, [])

  const done = () => {


    setLoading(true)
    const required_queries = currentFormSchema?.queries?.map(({required, field})=>  required ? field : null)?.filter((v)=> v !== null)
    let empty_queries = required_queries?.filter((field)=> {
      return isEmpty(results?.[field as string]) && field !== "franchise"
    })
    !isEmpty(empty_queries) && set_empty_q(empty_queries as string[])
    
    if(!isEmpty(currentFormSchema)){
      const { fn } = parse_query(currentFormState === "update" ? currentFormSchema?.on_update : currentFormSchema?.on_submit)
      const data = currentFormType === "franchise" ? results :   {
        ...results,
        franchise: chosen_franchise
      }
      let cleaned = currentFormState === "update" ? omit(data, ['created_on', 'updated_on', 'created_by']) : currentFormSchema?.on_submit
      fn && supabase.rpc(fn, cleaned).then(({data, error})=> {
        if(error){
          setError(error)
        }else {
          // console.log(data)
          setLoading(false)
          setError(null)
          onDone && onDone()
          /**
           * @todo: add logic to handle the response
           */
        }
        setLoading(false)
        setError(null)
      })

    }else {
      setLoading(false)
    }

    

  }

  useEffect(()=>{
    // console.log("Error::", error)
  }, [error])


  return (
    <Grid justify={"center"} >
      {
        !isEmpty(error) && <Grid.Col span={12} p={20} >
            <Notification
              color="red"
              icon={
                <IconCheck
                  size={18}
                />
              }
              disallowClose
            >
              An error occured
            </Notification>
        </Grid.Col>
      }
      {!isEmpty(empty_q) && <Grid.Col span={12} p={20} >
        <Notification
          color="red"
          icon={
            <IconCheck
              size={18}
            />
          }
          disallowClose
        >
          Missing required fields 👉 { empty_q?.join(", ")}
        </Notification>
      </Grid.Col>}
      {
        uniq(queries)?.map((query, i)=> {
          return (
            <PhaseQuery
              query={query}
              key={i}
              onChange={(update)=>{
                /**
                 * @todo?: add logic to check if the update is valid
                 */
                updateResult(update.field, update.value)
              }}
            />
          )
        })
      }
      <Grid justify={"space-between"} w="100%" mt={"md"} px={10} align="center"  >
        <Grid.Col span={"content"} >
          { currentFormState === "create" && <Button onClick={previous} >
            Previous
          </Button>}
        </Grid.Col>
        <Grid.Col span={"content"} >
          <Button 
          loading={loading}
            onClick={done}
          >
            { currentFormState === "update" ? "Update" : "Done"}
          </Button>
        </Grid.Col>
      </Grid>
    </Grid>
  )
}

export default NormalPhase