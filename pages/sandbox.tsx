import React from 'react'
import DynamicForm from '../components/organisms/form/DynamicForm/DynamicForm'

function Sandbox() {
  return (
    <DynamicForm/>
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