export type tFormType = "character" | "fight" | "place" | "franchise" | "gadget" | "species";
export type tFormQueryType = "image" | "text" | "description" | "list" | "time" | "number" | "boolean" | "select" | "multi-select" | "options" | "color";

export interface IQueryInterface<T> {
    field: keyof Partial<T>,
    value: string | null,
    type: tFormQueryType,
    label: string,
    required: boolean,
    query?: string,
    options?: Array<{
        label: string,
        value: string,
    }| string>,
    placeholder?: string
}

export interface IDynamicForm<T> {
    entity: "character" | "fight" | "place" | "franchise" | "gadget" | "species",
    queries: Array<IQueryInterface<T>>,
    on_submit: string
}