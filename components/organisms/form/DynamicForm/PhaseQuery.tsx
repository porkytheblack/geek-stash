import { ColorPicker, FileInput, Flex, Grid, Image, Loader, NumberInput, Select, Text, Textarea, TextInput } from '@mantine/core'
import { isEmpty, isString } from 'lodash'
import React, { useEffect, useState } from 'react'
import { IQueryInterface } from '../../../../types/forms'
import { DatePicker } from "@mantine/dates"
import { useEntityDescriptionForm } from '../../../../hooks/form/useEntityDescriptionForm'
import { useQueryValue } from '../../../../hooks/form/useQueryValue'
import { useStorage } from '../../../../hooks/data/useStorage'

interface IUpdateValueParam {
    value: any,
    field: string
}


interface IProps {
    query?: IQueryInterface<any>,
    onChange?: (updateValue: IUpdateValueParam) => void
}

function PhaseQuery(props: IProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const { query, onChange: updateField } = props

    const { currentFormType } = useEntityDescriptionForm()

    const { uploadToBucket } = useStorage()

    const {value: query_value} = useQueryValue({
        field: query?.field as string,
    })

    const onChange = (val: any) => {
        updateField && updateField({
            field: query?.field as string,
            value: val
        })
    }

  return (
    <Grid.Col span={12} px={20} py={5}  mt={10} >
        {
            query?.type === "text" && <TextInput
                placeholder={query?.placeholder}
                label={query?.label}
                onChange={(e) => onChange(e.target.value)}
                required={query?.required}
                value={query_value}
            />
        }
        {
            query?.type === "select" && <Select
                label={query?.label}
                placeholder={query?.placeholder}
                data={ query?.options ? isString(query?.options?.[0]) ? query?.options?.map((v)=>({
                    value: v,
                    label: v,
                })) : query?.options as any : []}
                required={query?.required}
                onChange={(val)=>onChange(val)}
                value={query_value}
            />
        }
        {
            query?.type === "image" &&<Grid
                w="100%"
                align="flex-start"
                justify={"flex-start"}
            > 
            <Grid.Col span={12}  >
                { !isEmpty(query_value) && <Image
                    src={query_value}
                    height={200}
                    width={200}
                    alt="Uploaded image"
                />}
                <Flex w="full" align="center" px={10} py={10} justify={"flex-start"} >
                    {
                        loading && <Loader size={20} />
                    }
                    <Text>
                        {
                            loading && "Uploading image..."
                        }
                        {
                            !loading && isEmpty(query_value) && "No image uploaded"
                        }
                        {
                            !loading && !isEmpty(query_value) && "Image uploaded"
                        }
                    </Text>
                </Flex>
                
            </Grid.Col>
            <Grid.Col span={12} >
                <FileInput
                    label={query?.label}
                    placeholder={query?.placeholder}
                    required={query?.required}
                    onChange={(file)=>{
                        file && setLoading(true)
                        file && uploadToBucket(currentFormType, file ).then((url)=>{
                            setLoading(false)
                            onChange(url)
                        }).catch((e)=>{
                            /**
                             * @todo - handle error
                             */
                            setLoading(false)
                        })
                    }}
                    value={
                        isEmpty(query_value) ? undefined : new File([], query_value, {
                            type: "image/jpeg"
                        })
                    }
                />
            </Grid.Col>
            
            
            </Grid>
        }
        {
            query?.type === "description" && <Textarea
                placeholder={query?.placeholder}
                label={query?.label}
                required={query?.required}
                onChange={(e)=>onChange(e.target.value)}
                value={query_value}
            />
        }
        {
            query?.type === "number" && <NumberInput
                placeholder={query?.placeholder}
                label={query?.label}
                required={query?.required}
                onChange={(val)=>onChange(val)}
                value={query_value}
            />
        }
        {
            query?.type === "color" && <ColorPicker
                placeholder={query?.placeholder}
                onChange={(val)=>onChange(val)}
                value={query_value}
            />
        }
        {
            query?.type === "options" && <Select
                label={query?.label}
                placeholder={query?.placeholder}
                data={ query?.options ? isString(query?.options?.[0]) ? query?.options?.map((v)=>({
                    value: v,
                    label: v,
                })) : query?.options as any : []}
                required={query?.required}
                onChange={(val)=>onChange(val)}
                value={query_value}
            />
        }
        {
            query?.type === "time" && <DatePicker
                placeholder={query?.placeholder}
                label={query?.label}
                required={query?.required}
                onChange={(val)=>onChange(val?.toISOString())}
                value={query_value}
            />
        }
    </Grid.Col>
  )
}

export default PhaseQuery