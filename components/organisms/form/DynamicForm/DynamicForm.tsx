import React from 'react'
import { useEntityDescriptionForm } from '../../../../hooks/form/useEntityDescriptionForm'
import NormalPhase from './NormalPhase'
import SetupForm from './SetupForm/SetupForm'

function DynamicForm() {
  const { currentPhaseIndex } = useEntityDescriptionForm()
  return (
    [-1,0]?.includes(currentPhaseIndex) ? <SetupForm/> :
    <NormalPhase/>
  )
}

export default DynamicForm