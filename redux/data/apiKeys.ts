import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const ApiKeysApi = createApi({
    reducerPath: "apiKeysApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/`,
        prepareHeaders: (headers, { getState }) => {
            headers.set("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getApiKeys: builder.query<any, any>({
            query: (uid)=> ({
                url: "get_active_api_keys",
                method: "POST",
                body: {
                    "_status": "active",
                    "_owner": uid
                }
            }),
            transformResponse: (response: any) => {
                console.log("apiKeysApi.getApiKeys.transformResponse", response)
                return response
            }
        })
    })
})

export const { useGetApiKeysQuery } = ApiKeysApi

export default ApiKeysApi

