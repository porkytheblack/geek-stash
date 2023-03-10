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
                /**
                 * @todo - move this from parameters back to the prepare headers function, and get the token from the current user session
                 */
                body: {
                    "_status": "active",
                    "_owner": uid
                }
            }),
            transformResponse: (response: any) => {
                return response
            }
        })
    })
})

export const { useGetApiKeysQuery } = ApiKeysApi

export default ApiKeysApi

