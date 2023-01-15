import { useState, useEffect } from 'react';
import { selectQueryResults } from './../../redux/entityDescriptionForm';
import { useAppSelector } from './../../redux/store';

interface IProps {
    field: string,
}

export function useQueryValue(props: IProps){

    const { field } = props;

    const results = useAppSelector(selectQueryResults)

    
    return {
        value: results ? results?.[field] : undefined
    }
}