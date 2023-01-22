import { useEffect } from 'react';
import { isEmpty, reverse, sortBy } from 'lodash';
import axios from "axios";
import { useGetApiKeysQuery } from "../../redux/data/apiKeys";
import { supabase } from "../../supabase/init.config";
import { useAuthState } from './useAuthState';

function useKeys () {

    const { profile } = useAuthState()
    const { isLoading, isError, data, refetch } = useGetApiKeysQuery(profile?.id, {
        skip: isEmpty(profile)
    })


    useEffect(()=>{
        console.log("FETCHED KEYS::",data)
    }, [,data, isLoading, isError])

    /**
     * @name generate_new_api_key
     * @description Generate a new API key
     */

    const generate_new_api_key = () => {
        console.log("generating new api key")
        supabase.auth.getSession().then(({data})=>{
            const token = data?.session?.access_token;
            axios.post('/api/keys/generate', {
                
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(({data})=>{
                refetch()
                console.log(data)
            }).catch((e)=>{
                /**
                 * @todo Handle error
                 */
                console.log(e)
            })
        })
        
    }

    return {
        generate_new_api_key,
        apiKey: data ? reverse(sortBy(data, ({created_on})=> new Date(created_on)))?.[0] : null,
        apiKeys: data,
        apiKeysLoading: isLoading,
        apiKeysError: isError
    }
}

export default useKeys;