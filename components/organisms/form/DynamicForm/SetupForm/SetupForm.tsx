import { Button, Divider, Grid, Notification, Select, Text } from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useEntityDescriptionForm } from '../../../../../hooks/form/useEntityDescriptionForm'
import { useGetFranchisesQuery } from '../../../../../redux/data/franchiseApi'
import { selectCurrentPhaseIndex } from '../../../../../redux/entityDescriptionForm'
import { useAppDispatch, useAppSelector } from '../../../../../redux/store'

function SetupForm() {
    let current_phase_index = useAppSelector(selectCurrentPhaseIndex)

  return (
    current_phase_index === -1 ? <FranchiseForm /> : <ChooseEntityType />
  )
}

export default SetupForm


export function FranchiseForm() {
    const [empty_q, set_empty_q] = useState<boolean>(false)
    const { data, isError, isLoading } = useGetFranchisesQuery('')

    const {chooseFranchise, initFormState, changePhase, chosen_franchise, currentFormType} = useEntityDescriptionForm()

    const { next: _next } = useEntityDescriptionForm()


    const next = () => {
        if(isEmpty(chosen_franchise)) {
            set_empty_q(true)
        }else{
            _next()
        }
    }
    
    return (
        <Grid align="center" px={20}  justify={"center"} >
            { empty_q && <Grid.Col span={12} >
                <Notification
                    color="red"
                    icon={
                        <IconCheck
                          size={18}
                        />
                    }
                >
                    Please choose a franchise to continue
                </Notification>
            </Grid.Col> }
            <Grid.Col span={12}  >
                <Select
                    label="Select a franchise"
                    placeholder="Select a franchise"
                    data={data ? data?.map((_franchise: any)=> ({
                        value: _franchise?.id,
                        label: _franchise?.name,
                    })) : []}
                    onChange={(val)=>{
                        val && chooseFranchise(val)
                    }}
                    value={chosen_franchise}
                />
            </Grid.Col>
            <Divider
                w="100%"
                label="Or"
                labelPosition='center'
            />
            <Grid.Col span={"content"} px={20}  >
                    <Button onClick={()=>{
                        initFormState("franchise")
                        changePhase(1)
                    }} >
                        Create Something New 
                    </Button>
            </Grid.Col>
            <Grid
                align="center"
                justify={"flex-end"}
                w="100%"
                px={10}
            >
                <Grid.Col span="content"  >
                    <Button onClick={next} > 
                        Next
                    </Button>
                </Grid.Col>
            </Grid>
        </Grid>
    )
}

export function ChooseEntityType() {
    const [empty_q, set_empty_q] = useState<boolean>(false)
    const { next: _next, previous, initFormState, chosen_franchise, currentFormType } = useEntityDescriptionForm()

    const next = () => {
        if(isEmpty(currentFormType)) {
            set_empty_q(true)
        }else{
            _next()
        }
    }

    return (
        <Grid align="center" justify={"center"} p={30} >
            { empty_q && <Grid.Col span={12} >
                <Notification
                    color="red"
                    icon={
                        <IconCheck
                          size={18}
                        />
                    }
                
                >
                    Please choose an entity to continue
                </Notification>
            </Grid.Col> }
            <Grid.Col  span={12} >
                <Select
                    label="Choose an entity to add"
                    placeholder="Choose an entity"
                    value={currentFormType}
                    data={[
                        {
                            value: "characters",
                            label: "Characters",
                            description: "Add a new character"
                        },
                        {
                            value: "gadgets",
                            label: "Gadgets",
                            description: "Add gadget"
                        },
                        {
                            value: "places",
                            label: "Places",
                            description: "Add a place, a planet, a galaxy that's significant e.g earth"
                        },
                        {
                            value: "fights",
                            label: "Fights",
                            description: "Add a significant battle or fight"
                        },
                        {
                            value: "species",
                            label: "Species",
                            description: "Add a new species, e.g Mutant Rat"
                        }
                    ]}

                    onChange={(val)=>{
                        val && initFormState(val as any)
                    }}
                />
            </Grid.Col>
            
            <Grid w="100%" align="center" justify={"space-between"} mt="md" >
                <Grid.Col span="content" >
                    <Button onClick={previous} >
                        Previous
                    </Button>
                </Grid.Col>
                <Grid.Col span="content" >
                    <Button onClick={next} >
                        Continue
                    </Button>
                </Grid.Col>
            </Grid>
        </Grid>
    )
}

