import { Text } from '@mantine/core'
import React from 'react'
import { IPageProps } from '../../../types/next-related-extensions'

function Usage() {
  return (
    <div>
      <Text
        color={"red"}
      >
        Still under development ⚠️
      </Text>
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
