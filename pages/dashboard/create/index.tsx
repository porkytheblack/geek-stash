import { Button, Divider, Flex, Grid, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import React from 'react'
import EntityTable from '../../../components/organisms/Table/EntityTable/EntityTable'
import { eICharacter } from '../../../types/entities'
import { IPageProps } from '../../../types/next-related-extensions'

const characterColumns: Array<{
    label: string
    key: keyof Partial<eICharacter>
}> = [
    {
        label: "ID",
        key: "id"
    },
    {
        label: "Name",
        key: "name"
    },
    {
        key: "species",
        label: "Species"
    },
    {
        key: "status",
        label: "Status"
    }
]


function Create() {
  return (
    <Grid   align="flex-start" justify={"flex-start"} >
        <Grid h={50}  p={10}  align="flex-start" w="100%" justify={"flex-start"} >
            <Grid w="100%"  align="stretch" mb="sm" justify={"space-between"} >
                <Grid.Col span="content"  >
                    <Text fz={20} fw={600} color="blue"  >
                        Your Creations
                    </Text>
                </Grid.Col>
                <Grid.Col span="content" >
                    <Button
                        leftIcon={
                            <IconPlus
                                size={20}
                                color="white"
                            />
                        }
                    >
                        New Creation
                    </Button>
                </Grid.Col>
                
                
            </Grid> 
            
            <Divider  w="100%" />
        </Grid>
        <Grid w="100%" mt="md" >
            <Grid.Col span={12} >
                <EntityTable
                    columns={characterColumns}
                    data={[{
                        id: "1",
                        name: "Rick Sanchez",
                        species: "Human",
                        status: "Alive"

                    }]}
                    title="Characters"
                    error={null}
                    loading={false}

                />
            </Grid.Col>
        </Grid>
    </Grid>
  )
}

export default Create

export const getStaticProps = async () => {
    return {
        props: {
            layout: "dashboard",
            accessLevel: "private"
        } as IPageProps
    }
}