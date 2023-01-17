/* eslint-disable react-hooks/exhaustive-deps */
import { AppShell, Container } from '@mantine/core';
import { isEmpty, isUndefined } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/organisms/header/DashboardHeader';
import DashboardNavbar from '../components/organisms/navbar/DashboardNavbar';
import { useAuthState } from '../hooks/auth/useAuthState';
import { useLayout } from '../hooks/layout/useLayout';
import { IPageProps } from '../types/next-related-extensions';
import AuthGateKeeper from './AuthGateKeeper';

interface IProps {
    children: React.ReactNode,
    pageProps: IPageProps
}

function Layout(props: IProps) {

const { children, pageProps: { layout, accessLevel } } = props;
const { current_page_access_state, current_layout,  set_layout }  = useLayout()
const { push, events, pathname } = useRouter()
const [loading, setLoading] = useState<boolean>(true)

const { user, profile } = useAuthState()




useEffect(()=>{
    events.on("routeChangeStart", (path)=>{
        setLoading(true)
        
    })
    return ()=>{
        events.off("routeChangeStart", (path)=>{
            // console.log("Path unmounted: :", path)
            setLoading(true)
        })
    }
}, [])



const onProceed = ( access_state: string ) => {
    // console.log("Proceeding  path::", pathname)
    if(isEmpty(access_state)) return;

    switch (access_state) {
        case "authorized": 
            setLoading(false)
            set_layout((accessLevel === "public" || isUndefined(accessLevel)) ? "main" : "dashboard")
            break;
        case "unauthorized":
            set_layout("main")
            // console.log("unauthorized")
            push("/").then(()=>{
                setLoading(false)
            })
            break;
        case "loading":
            setLoading(true)
        default:
            break;
    }
}


  return (
    loading ? <AuthGateKeeper
        onProceed={onProceed}
        accessLevel={accessLevel}
    /> :  current_layout === "main" ? <AppShell
        styles={(theme)=>({
            main: {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                padding: 0
            },
            body: {
                padding: 0
            },
            root: {
                padding: 0
            }
        })}

    >
        {
            children
        }
        
    </AppShell> : <AppShell
        fixed
        header={<DashboardHeader />}
        navbar={<DashboardNavbar />}
        styles={(theme)=>({
            main: {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            }
        })}



    >
    
        {
            children
        }
        
    </AppShell>
  )
}

export default Layout