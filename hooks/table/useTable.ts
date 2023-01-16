/* eslint-disable react-hooks/exhaustive-deps */
import { supabase } from './../../supabase/init.config';
import { parse_query } from './../../utils/dynamic-forms/form-utils';
import { isArray, isEmpty, isUndefined } from 'lodash';
import { useReducer, useEffect } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { ITable } from './../../types/tables';
import { tableSchemas } from './../../utils/dynamic-tables/table-schema';

interface IProps {
    schema_name: keyof typeof tableSchemas,
}

interface ITableReducer {
    tableSchema: ITable<any> | null,
    tableData: Array<any>,
    tableLoading: boolean,
    tableError: any,
}

const initialState: ITableReducer = {
    tableSchema: null,
    tableData: [],
    tableLoading: false,
    tableError: null
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTableSchema: (state, action) => {
            state.tableSchema = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
            state.tableError = null
            state.tableLoading = false
        },
        setTableLoading: (state, action) => {
            state.tableLoading = action.payload
        },
        setTableError: (state, action) => {
            state.tableError = action.payload
            state.tableLoading = false
        }
    }
})

export const { setTableSchema, setTableData, setTableLoading, setTableError } = tableSlice.actions

const reducer = tableSlice.reducer

export function useTable(props: IProps) {

   /**
    * ---------------------------- STATE AND PROPS ----------------------------
    */

    const { schema_name } = props 

    const [{
        tableSchema,
        tableData,
        tableLoading,
        tableError
    }, dispatchAction] = useReducer(reducer, initialState)

    /**
     * ---------------------------- FUNCTIONS ----------------------------
     */


    /**
     * @name - fetchTableData
     */

    const fetchTableData = async () => {
        if (isEmpty(tableSchema)) return
        try {
            const { fn } = parse_query(tableSchema.query)
            if (isUndefined(fn) || isEmpty(fn)) return
            dispatchAction(setTableLoading(true))
            const {data, error} = await supabase.rpc(fn)
            error && dispatchAction(setTableError(error))
            let res = isArray(data) ? data?.filter((m)=>!isEmpty(m)) : data
            !isEmpty(res) && dispatchAction(setTableData(res))
            dispatchAction(setTableLoading(false))
        } catch (e) {
            dispatchAction(setTableError(e))
        }
    }



    /**
     * ---------------------------- EFFECTS ----------------------------
     */

    
    /**
     * @description - set the schema based on the new schema name
     */

    useEffect(()=>{
        if(isEmpty(schema_name)) return 
        dispatchAction(setTableSchema(tableSchemas[schema_name]))

    }, [schema_name])


    /**
     * @description - fetch the data based on the schema
     */

    useEffect(()=>{
        !isEmpty(tableSchema) && fetchTableData()
    }, [,tableSchema])

    /**
     * @name refetchTableData
     * @description - refetch the table data
     * 
     */

    const refetchTableData = () => {
        fetchTableData()
    }

    /**
     * @name - delete row
     * @description - delete a row from the table
     * @param {string} id - the id of the row to delete
     * @param {string} query - the query to delete the row
     */

    const deleteRow = async (id: string, query?: string) => {
        if (isEmpty(query) || isUndefined(query)) return
        try {
            const { fn } = parse_query(query)
            if (isUndefined(fn) || isEmpty(fn)) return
            dispatchAction(setTableLoading(true))
            const {data, error} = await supabase.rpc(fn, {id})
            error && dispatchAction(setTableError(error))
            fetchTableData()
            dispatchAction(setTableLoading(false))
        } catch (e) {
            dispatchAction(setTableError(e))
        }
    }





    return {
        tableData,
        tableError,
        tableLoading,
        tableSchema,
        refetchTableData,
        deleteRow
    }
}