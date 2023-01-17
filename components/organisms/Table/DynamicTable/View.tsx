import { Grid } from '@mantine/core'
import React from 'react'
import { ITable } from '../../../../types/tables'
import { get_nested_object_value } from '../../../../utils/general-util-functions'
import FieldValue from './FieldValue'

interface IProps {
    schema: ITable<any>,
    data: any
}

function View(props: IProps) {

    
  return (
    <Grid>
        {
            props.schema?.columns?.map((column, index)=>{
                return (
                    <FieldValue
                        key={index}
                        value={get_nested_object_value(props.data, column.fetched_data_key as any)}
                        type={column.type}
                        _key={column.key as any}
                    />
                )
            })
        }
    </Grid>
  )
}

export default View