/* eslint-disable react-hooks/exhaustive-deps */
import { AppShell, Container } from '@mantine/core';
import { isEmpty, isUndefined } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/organisms/header/DashboardHeader';
import DashboardNavbar from '../components/organisms/navbar/DashboardNavbar';
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
const { push } = useRouter()
const [loading, setLoading] = useState<boolean>(true)

useEffect(()=>{
    if(isEmpty(current_page_access_state)) return;
    console.log("current_page_access_state::", current_page_access_state)
    switch (current_page_access_state) {
        case "authorized": 
            setLoading(false)
            set_layout((accessLevel === "public" || isUndefined(accessLevel)) ? "main" : "dashboard")
            break;
        case "unauthorized":
            set_layout("main")
            push("/").then(()=>{
                setLoading(false)
            })
            break;
        case "loading":
            setLoading(true)
        default:
            console.log("default::", current_page_access_state)
            break;
    }
}, [current_page_access_state])

  return (
    loading ? <AuthGateKeeper
        accessLevel={accessLevel}
    /> :<AppShell
        navbar={
            (current_layout === "main") ? undefined : 
            <DashboardNavbar/>
        }
        header={
            current_layout === "main" ? undefined : 
            <DashboardHeader/>
        }
        styles={(theme)=>({
            main: {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                padding: current_layout === "main" ? 0 : theme.spacing.xs,
            },
            body: {
                padding: current_layout === "main" ? 0 : theme.spacing.xs,
            },
            root: {
                padding: current_layout === "main" ? 0 : theme.spacing.xs,
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