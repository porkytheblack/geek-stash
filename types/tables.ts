import { tFormQueryType } from './forms';

export type tTableColumnType = tFormQueryType | 'list' | 'date' | 'badge' | 'badges';

export interface IColumn<eT> {
    label: string,
    key: keyof eT,
    fetched_data_key: string,
    type: tTableColumnType
}

export interface ITable<eT> {
    name: string,
    label: string,
    query: string,
    has_actions: boolean,
    unique_identifier: keyof eT,
    columns: Array<IColumn<eT>>,
    delete_query: string,
}