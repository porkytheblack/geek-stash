import { Button, Divider, Flex, Grid, Modal, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import React from 'react'
import EntityTable from '../../../components/organisms/Table/EntityTable/EntityTable'
import { eICharacter } from '../../../types/entities'
import { IPageProps } from '../../../types/next-related-extensions'
import { useDisclosure } from "@mantine/hooks"
import DynamicForm from '../../../components/organisms/form/DynamicForm/DynamicForm'
import { useEntityDescriptionForm } from '../../../hooks/form/useEntityDescriptionForm'
import DynamicTable from '../../../components/organisms/Table/DynamicTable/DynamicTable'

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


    const [opened, { close, open } ] = useDisclosure(false)
    const { resetSchema } = useEntityDescriptionForm()

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
                        onClick={open}
                    >
                        New Creation
                    </Button>
                </Grid.Col>
                
                
            </Grid> 
            
            <Divider  w="100%" />
        </Grid>
        <Modal
            opened={opened}
            onClose={()=>{
                resetSchema(null)
                close()
            }}
            size="xl"
        >
            <DynamicForm onDone={close} />
        </Modal>
        <Grid w="100%" mt="md" >
            <Grid.Col span={12} >
                <DynamicTable
                    schema="creatorCharactersTableSchema"
                />
            </Grid.Col>
            <Grid.Col span={12} >
                <DynamicTable
                    schema="creatorFightsTableSchema"
                />
            </Grid.Col>
            <Grid.Col span={12} >
                <DynamicTable
                    schema="creatorGadgetTableSchema"
                />
            </Grid.Col>
            <Grid.Col span={12} >
                <DynamicTable
                    schema="creatorPlacesTableSchema"
                />
            </Grid.Col>
            <Grid.Col span={12} >
                <DynamicTable
                    schema="creatorsSpeciesTableSchema"
                />
            </Grid.Col>
            <Grid.Col span={12} >
                <DynamicTable
                    schema="franchiseTableSchema"
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