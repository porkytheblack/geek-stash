import React from 'react'
import { useEntityDescriptionForm } from '../../../../hooks/form/useEntityDescriptionForm'
import NormalPhase from './NormalPhase'
import SetupForm from './SetupForm/SetupForm'

interface IProps {
  onDone?: () => void
}

function DynamicForm(props: IProps) {
  const { currentPhaseIndex } = useEntityDescriptionForm()
  return (
    [-1,0]?.includes(currentPhaseIndex) ? <SetupForm/> :
    <NormalPhase
      onDone={props.onDone}
    />
  )
}

export default DynamicForm