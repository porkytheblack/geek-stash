import { ActionIcon, Button, Grid, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconEye, IconEyeOff, IconTrash, IconUpload } from '@tabler/icons'
import React, { useState } from 'react'
import { useEntityDescriptionForm } from '../../../../hooks/form/useEntityDescriptionForm'
import { useTable } from '../../../../hooks/table/useTable'
import { tableSchemas } from '../../../../utils/dynamic-tables/table-schema'
import { get_nested_object_value } from '../../../../utils/general-util-functions'
import DynamicForm from '../../form/DynamicForm/DynamicForm'
import EntityTable from '../EntityTable/EntityTable'
import View from './View'

interface IProps {
    schema: keyof typeof tableSchemas,
}

function DynamicTable(props: IProps) {
    const { schema } = props
    const [id, setId] = useState<string>("")

    const { initFormState, chooseFranchise, updateResult, changePhase } = useEntityDescriptionForm()

    const {
        tableData, 
        tableError,
        tableLoading,
        tableSchema,
        refetchTableData,
        deleteRow,
        publishItem
    } = useTable({
        schema_name: schema
    })

    const  [opened, {close, open}] = useDisclosure(false)
    const [ updatedOpened, {close: closeUpdateModal, open: openUpdateModal}] = useDisclosure(false)
    const [ viewOpened, {close: closeViewModal, open: openViewModal}] = useDisclosure(false)

    const onRowClick = (id: any) =>{
        const is_schema_public = tableSchema?.query?.includes("public")
        if(is_schema_public){
            setId(id)
            openViewModal()
        }else{
            setId(id)
            open()
        }
        
    }

    const onDelete = () =>{
        deleteRow(id, tableSchema?.delete_query)
    }

    const onPublish = () =>{
        publishItem(id)
        close()
    }

    const updateEntity = () => {
        initFormState(tableSchema?.name as any, "update")
        let _empty_data_object = (tableSchema?.columns?.map(({key, fetched_data_key})=> ({[key]: fetched_data_key})))?.reduce((acc, curr)=> ({...acc, ...curr}), {})
        let _filled_data_object = _empty_data_object ?  Object.entries(_empty_data_object)?.map(([k, f_k])=>{
            let _data = tableData?.find((d)=> d?.id === id)
            return {
                [k]: get_nested_object_value(_data, f_k?.replace(".name", ".id"), null)
            }
        })?.reduce((acc, curr)=>({...acc, ...curr})) : null

        _filled_data_object && Object.entries(_filled_data_object)?.map(([field, value])=> {
            updateResult(field, value)
            field === "franchise" && chooseFranchise(value)
        })

        _filled_data_object && changePhase(1)
        close()
        openUpdateModal()

        


    }  
    
    const onViewClick = () =>{
        close()
        openViewModal()
    }

  return (
    tableSchema && <>
        {
            tableSchema?.has_actions && <Modal
                opened={opened}
                onClose={close}
                title="Actions"
                size="sm"

            >
                <Grid>
                    <Grid.Col span={6} >
                        <Button
                            w="100%"
                            leftIcon={<IconEye
                                size={20}
                                color="white"
                            />}
                            onClick={onViewClick}
                        >
                            View
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6} >
                        <Button
                            w="100%"
                            leftIcon={
                            <IconEdit
                                size={20}
                                color="white"
                            />}
                            onClick={updateEntity}
                        >
                            Update
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6} >
                        <Button
                            w="100%"
                            color="red"
                            leftIcon={<IconTrash
                                size={20}
                                color="white"
                            />}
                            onClick={onDelete}
                            loading={tableLoading}
                        >
                            Delete
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6} >
                        <Button
                            w="100%"
                            leftIcon={
                            tableData?.find((d)=> d?.id === id)?.status === "public"  ? <IconEyeOff
                                size={20}
                                color="white"
                                />:
                            <IconUpload
                                size={20}
                                color="white"
                            />}
                            onClick={onPublish}
                        >
                            {
                                tableData?.find((d)=> d?.id === id)?.status === "public" ? "Unpublish" : "Publish"
                            }
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        }

        {
            updatedOpened && <Modal
                opened={updatedOpened}
                onClose={closeUpdateModal}
                title="Update"
                size={"lg"}
            >
                <DynamicForm
                />
            </Modal>
        }

        {
            viewOpened && <Modal
                opened={viewOpened}
                onClose={closeViewModal}
                title="View"
                fullScreen

            >
                <View
                    data={tableData?.find((d)=> d?.id === id)}
                    schema={tableSchema}

                />
            </Modal>
        }
        <EntityTable
            columns={
                tableSchema?.columns
            }
            data={
                tableData
            }
            error={
                tableError
            }
            loading={
                tableLoading
            }
            title={
                tableSchema?.label
            }
            onRowClick={onRowClick}
        />
    </>
  )
}

export default DynamicTable