import { Badge, Flex, Grid, Image, Loader, Notification, Table, Text } from '@mantine/core'
import { IconX } from '@tabler/icons'
import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { IColumn, tTableColumnType } from '../../../../types/tables'

import dayjs from "dayjs"
import { truncate_string } from '../../../../utils/general-util-functions'
import { useTable } from '../../../../hooks/table/useTable'

interface IProps {
    loading: boolean,
    error: any,
    data: any[],
    columns: Array<Partial<IColumn<any>>>,
    title: string,
    onRowClick?: (id: any) => void
}

function EntityTableHead ({headers}:{headers: (string | undefined)[]}) {
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
    data,
    types,
    onRowClick
}: { 
    keys: (string|undefined)[],
    data: any[],
    types: tTableColumnType [],
    onRowClick?: (id: any) => void
}) {

    return (
        <tbody>
            {
                data?.map((item, index)=>(
                    <tr key={index}
                        onClick={()=>onRowClick?.(item?.id)}
                    >
                        {
                            keys?.map((key, index)=>(
                                <td key={index} >
                                        {
                                            key ? (
                                            <>
                                                {
                                                    types?.[index] === "image" && <Image
                                                        src={item?.[key]}
                                                        alt={item?.[key]}
                                                        width={50}
                                                        height={50}
                                                        
                                                    />
                                                }
                                                {
                                                    types?.[index] === "text" && truncate_string(item?.[key], 20)
                                                }
                                                {
                                                    types?.[index] === "date" && dayjs(item?.[key]).format("DD/MM/YYYY")
                                                }
                                                {
                                                    types?.[index] === "description" && truncate_string(item?.[key], 20)
                                                }
                                                {
                                                    types?.[index] === "color" && <Flex
                                                        style={{
                                                            backgroundColor: item?.[key],
                                                            width: 50,
                                                            height: 50,
                                                            borderRadius: 50
                                                        }}
                                                    />
                                                }
                                                {
                                                    types?.[index] === 'badge' && <Badge>
                                                        {item?.[key]}
                                                    </Badge>
                                                }
                                                {
                                                    types?.[index] === 'badges' && <Flex align="center" justify={"center"} >
                                                        {
                                                            item?.[key]?.split(",")?.map((badge: string, index: number)=>(
                                                                <Badge
                                                                    key={index}
                                                                >
                                                                    {badge}
                                                                </Badge>
                                                            ))
                                                        }
                                                    </Flex>
                                                }
                                            </>
                                            )
                                            : ""
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
    const { loading, error, data, columns, title, onRowClick } = props;

    

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
                <EntityTableRows 
                    types={columns?.map((column)=>column.type) as any} 
                    keys={columns?.map((column)=>column?.key) as any} 
                    data={data} 
                    onRowClick={onRowClick}
                />
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