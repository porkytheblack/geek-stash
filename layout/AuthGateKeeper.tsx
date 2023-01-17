/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Flex, Loader, Text } from '@mantine/core'
import { isNull, isUndefined } from 'lodash'
import React, { useEffect } from 'react'
import { useAuthState } from '../hooks/auth/useAuthState'
import { useLayout } from '../hooks/layout/useLayout'
import { IPageProps } from '../types/next-related-extensions'

/**
 * based on the access level, determine if the user
 * has access to the page or not
 */

function AuthGateKeeper( { accessLevel, onProceed } : Partial<IPageProps> & {
    onProceed: (status: string) => void
} ) {
    const { set_page_access_state } = useLayout()
    const {user, profile, profileLoading} = useAuthState()

    useEffect(()=>{
        // console.log("Profile loading::", profileLoading)
        if(isNull(profileLoading) || profileLoading == true) return;
        // console.log("AuthGate user ::", user)
        if(profile){
            if( accessLevel === "public" || isUndefined(accessLevel)) {
                onProceed("authorized")
            }else if(accessLevel === "admin" && profile.access === "admin") {
                onProceed("authorized")
            }else if(accessLevel === "private" && ["admin", "user", "creator"].includes(profile.access)){
                onProceed("authorized")
            }else{
                onProceed("unauthorized")
            }
        }else{
            if( accessLevel === "public" || isUndefined(accessLevel)) {
                onProceed("authorized")
            }else {
                onProceed("unauthorized")
            }
        }
    }, [,profileLoading])
    
  return (
       <Flex
        justify={"center"}
        align={"center"}
        direction={"column"}
        mih={"100vh"}
        w={"100vw"}
        >
            <Loader/>
            <Text
                fz="md"
                fw={700}
                mt={10}
            >
                Loading...
            </Text>
        </Flex>
  )
}

export default AuthGateKeeper