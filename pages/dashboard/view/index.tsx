import { Center, Grid, Select, Text } from '@mantine/core'
import { isNull } from 'lodash'
import React, { useEffect, useState } from 'react'
import DynamicTable from '../../../components/organisms/Table/DynamicTable/DynamicTable'
import { IPageProps } from '../../../types/next-related-extensions'
import { tableSchemas } from '../../../utils/dynamic-tables/table-schema'

function View() {

  const [current_schema, set_current_schema] = useState<keyof typeof tableSchemas | null>(null)

  useEffect(()=>{
    console.log("The current schema is::", current_schema)
  }, [current_schema])

  return (
    <Grid>
      <Grid.Col span={12} >
        <Grid align={"center"} justify="space-between" >
          <Grid.Col>
              <Text
                fz={20}
                fw={700}
              >
                Public Data
              </Text>
          </Grid.Col>
          <Grid.Col>
              <Select
                label="Select data you would like to view"
                placeholder="Select data you would like to view"
                value={current_schema}
                onChange={(v)=>{
                  set_current_schema(v as keyof typeof tableSchemas)
                }}
                data={[
                  {
                    label: "Characters",
                    value: "publicCharactersTableSchema"
                  },
                  {
                    label: "Franchises",
                    value: "publicFranchiseTableSchema"
                  },
                  {
                    label: "Species",
                    value: "publicSpeciesTableSchema"
                  },
                  {
                    label: "Gadgets",
                    value: "publicGadgetTableSchema"
                  },
                  {
                    label: "Places",
                    value: "publicPlacesTableSchema"
                  },
                  {
                    label: "Fights",
                    value: "publicFightsTableSchema"
                  }
                ] as Array<{
                  label: string,
                  value: keyof typeof tableSchemas
                }>}
              />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={12} >
        { isNull(current_schema) ? <Center>
          <Text>
            Please select a data type to view
          </Text>
        </Center> : <DynamicTable
          key={current_schema}
          schema={current_schema}
        />}
      </Grid.Col>
    </Grid>
  )
}

export default View


export const getStaticProps = async () => {
    return {
        props: {
            layout: "dashboard",
            accessLevel: "private"
        } as IPageProps
    }
}