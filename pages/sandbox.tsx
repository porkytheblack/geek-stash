import React from 'react'
import DynamicForm from '../components/organisms/form/DynamicForm/DynamicForm'
import DynamicTable from '../components/organisms/Table/DynamicTable/DynamicTable'

function Sandbox() {
  return (
    <DynamicTable
        schema="creatorFightsTableSchema"
    />
  )
}

export default Sandbox


export function getStaticProps() {
  return {
    props: {
        layout: "main",
        accessLevel: "public"
    }
  }
}