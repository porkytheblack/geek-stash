import { Flex, Grid, Loader, Notification, Table, Text } from '@mantine/core'
import { IconX } from '@tabler/icons'
import { isEmpty } from 'lodash'
import React from 'react'

interface IProps {
    loading: boolean,
    error: any,
    data: any[],
    columns: {
        key: string,
        label: string,
    }[],
    title: string
}

function EntityTableHead ({headers}:{headers: string[]}) {
    return (
        <thead>
            <tr>
                {
                    headers?.map((header, index)=>(
                        <th key={index} >
                            {
                                header
                            }
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}

function EntityTableRows ({
    keys,
    data
}: { 
    keys: string[],
    data: any[]
}) {
    return (
        <tbody>
            {
                data?.map((item, index)=>(
                    <tr key={index} >
                        {
                            keys?.map((key, index)=>(
                                <td key={index} >
                                    {
                                        item?.[key]
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    )
}

function EntityTable(props: IProps) {
    const { loading, error, data, columns, title } = props;

    

  return (
    <Grid  >
        <Grid.Col span={12} >
            <Text
                fz={20}
                fw={600}
                color="blue"
            >
                {
                    title
                }
            </Text>
        </Grid.Col>
        <Grid.Col span={12}  >
            {(loading || !isEmpty(error) || isEmpty(data)) ?<Grid  h={400}  align="center" justify="center" >
                {
                    loading && <Loader/>
                }
                {
                    error && <Notification icon={<IconX size={18} />} disallowClose >
                        Something went wrong 
                    </Notification>
                }
                {
                    !loading && !error && isEmpty(data) && <Text fz={18} fw={600} color="blue" >
                        No data found
                    </Text>
                }
            </Grid> :
            <Table
                striped
                highlightOnHover
            >
                <EntityTableHead headers={columns?.map((column)=>column?.label)} />
                <EntityTableRows keys={columns?.map((column)=>column?.key)} data={data} />
            </Table>
            }
        </Grid.Col>
        


    </Grid>
  )
}

export default EntityTable

/**
 * @todo - Pagination
 * @todo - Search
 * @todo - Sort
 * @todo - Filter
 * @todo - Custom Actions
 * tl;dr - Make it a full fledged table, after initial release count as tech debt
 */