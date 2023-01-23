import { categorize_hourly_for_today } from './../../utils/usage/usage';
import { IUsage } from './../../types/usage';
import { supabase } from './../../supabase/init.config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const usageApi = createApi({
    reducerPath: "usageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/`,
        prepareHeaders: async (headers, { getState }) => {
            const { data: {session} } = await supabase.auth.getSession()

            headers.set("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)
            headers.set("Authorization", `Bearer ${session?.access_token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getUsageData: builder.query<any, any>({
            query: ()=> `/get_user_api_usage`,
            transformResponse: (result: any)=>{
                let _d = result  as IUsage[]

                let _categorized_data = categorize_hourly_for_today(_d)

                return _categorized_data || null
            }
        }),
        
    })
})

export default usageApi

export const { useGetUsageDataQuery } = usageApi

