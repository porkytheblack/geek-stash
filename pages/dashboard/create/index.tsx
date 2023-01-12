import React from 'react'
import { IPageProps } from '../../../types/next-related-extensions'

function Create() {
  return (
    <div>Create</div>
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