import React from 'react'
import { IPageProps } from '../../../types/next-related-extensions'

function Usage() {
  return (
    <div>Usage</div>
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
