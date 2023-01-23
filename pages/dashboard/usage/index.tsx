import { Text } from '@mantine/core'
import React, { useEffect } from 'react'
import UsageChart from '../../../components/organisms/charts/UsageChart'
import { useGetUsageDataQuery } from '../../../redux/data/usageApi'
import { IPageProps } from '../../../types/next-related-extensions'

function Usage() {

  

  return (
    <div>
      <Text
        color={"red"}
      >
        Still under development ⚠️
      </Text>
      <UsageChart/>
    </div>
  )
}

export default Usage 

export const getStaticProps = async () => {
    return {
        props: {
            layout: "dashboard",
            accessLevel: "private"
        } as IPageProps
    }
}
