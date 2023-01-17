import { Badge, Flex, Grid, Image, Text } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'
import { tTableColumnType } from '../../../../types/tables'

interface IProps {
    value: any,
    type: tTableColumnType,
    _key: string
}

function FieldValue(props: IProps) {
    const { _key: key, type, value } = props
  return (
    <Grid w="100%" px={20} py={10}  sx={{
        borderBottom: "1px solid #eaeaea06",
        marginBottom: 10
    }} >
        <Grid.Col span={12} mb={0} p={0} >
            <Text fz={20} p={0} transform="capitalize" fw={600}  >
                {
                    key
                }
            </Text>
        </Grid.Col>
        <Grid.Col span={12} p={0} >
            {
                type === "text" && <Text fz={16} fw={400}  >
                    {
                        value
                    }
                </Text>
            }
            {
                type === "color" && <Flex
                    style={{
                        backgroundColor: value,
                        width: 50,
                        height: 50,
                        borderRadius: 50
                    }}
                ></Flex>
            }
            {
                type === "badge" && <Flex>
                    <Badge>
                        {value}
                    </Badge>
                </Flex>
            }
            {
                type === "badges" && <Flex align="center" justify={"flex-start"} >
                    {
                        value?.split(",")?.map((badge: string, index: number)=>(
                            <Badge
                                key={index}
                            >
                                {badge}
                            </Badge>
                        ))
                    }
                </Flex>
            }
            {
                type === "image" && <Image
                    alt={"image"}
                    src={value}
                    width={200}
                    height={200}
                    fit="contain"
                />
            }
            {
                type === "date" && <Text fz={16} fw={400}  >
                    {
                        dayjs(value).format("DD/MM/YYYY")
                    }
                </Text>
            }
            {
                type === "description" && <Text fz={16} fw={400} >
                    {
                        value
                    }
                </Text>
            }
        </Grid.Col>
    </Grid>
  )
}

export default FieldValue