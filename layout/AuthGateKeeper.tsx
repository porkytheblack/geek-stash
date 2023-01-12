/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Flex, Loader, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { useLayout } from '../hooks/layout/useLayout'
import { IPageProps } from '../types/next-related-extensions'

/**
 * based on the access level, determine if the user
 * has access to the page or not
 */

function AuthGateKeeper( { accessLevel } : Partial<IPageProps> ) {
    const { set_page_access_state } = useLayout()

    useEffect(()=>{
        const timer_ref = setTimeout(()=>{
            set_page_access_state("authorized")
        }, 3000)

        return ()=>{
            clearTimeout(timer_ref)
        }
    }, [])
    
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