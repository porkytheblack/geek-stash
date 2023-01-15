
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { franchise } from "../../types/entities";

export const franchiseApi = createApi({
    reducerPath: "franchiseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/`,
        prepareHeaders: (headers, { getState }) => {
            headers.set("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getFranchises: builder.query<any, any>({
            query: ()=> `/get_franchises`,
        }),
        runRpcQuery: builder.query<any, any>({
            query: (args: {rpc: string, data: any})=>({
                url: args.rpc,
                method: "POST",
                body: args.data
            })
        })
    })
})

export const { useGetFranchisesQuery } = franchiseApi