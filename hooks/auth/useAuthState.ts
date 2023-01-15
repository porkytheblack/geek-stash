import { eIProfile } from './../../types/entities';
import { isEmpty } from 'lodash';
import { AuthChangeEvent } from './../../node_modules/@supabase/gotrue-js/src/lib/types';
import { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/init.config';
import { useUser } from '@supabase/auth-helpers-react';


export function useAuthState () {

    const user = useUser()
    const [profile, setProfile] = useState<eIProfile | null>(null)
    const [profileLoading, setProfileLoading] = useState<boolean|null>(null)

    useEffect(()=>{
        if(!isEmpty(user?.id)){
            setProfileLoading(true)
            supabase.rpc("get_user", {id: user?.id}).then(({data, error})=>{
                setProfileLoading(false)
                if(error){
                    /**
                     * @todo add error handling
                     */
                    console.log(error)
                }
                if(data){
                    setProfile(data?.[0])
                }
            })
        }else{
            setProfileLoading(false)
        }
    }, [,user])

    return {
        user,
        profile,
        profileLoading
    }
    
}