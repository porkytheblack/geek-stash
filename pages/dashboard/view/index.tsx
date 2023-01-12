import React from 'react'
import { IPageProps } from '../../../types/next-related-extensions'

function View() {
  return (
    <div>View</div>
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