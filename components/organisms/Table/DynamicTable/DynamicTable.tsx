import { ActionIcon, Button, Grid, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconEye, IconTrash } from '@tabler/icons'
import React, { useState } from 'react'
import { useTable } from '../../../../hooks/table/useTable'
import { tableSchemas } from '../../../../utils/dynamic-tables/table-schema'
import EntityTable from '../EntityTable/EntityTable'

interface IProps {
    schema: keyof typeof tableSchemas,
}

function DynamicTable(props: IProps) {
    const { schema } = props
    const [id, setId] = useState<string>("")

    const {
        tableData, 
        tableError,
        tableLoading,
        tableSchema,
        refetchTableData,
        deleteRow
    } = useTable({
        schema_name: schema
    })

    const  [opened, {close, open}] = useDisclosure(false)

    const onRowClick = (id: any) =>{
        setId(id)
        open()
    }

    const onDelete = () =>{
        deleteRow(id, tableSchema?.delete_query)
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
                        >
                            View
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6} >
                        <Button
                            w="100%"
                            leftIcon={<IconEdit
                                size={20}
                                color="white"
                            />}
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
                </Grid>
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