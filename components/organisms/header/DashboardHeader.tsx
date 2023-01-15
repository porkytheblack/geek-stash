import { Avatar, Flex, Header, Tooltip } from '@mantine/core'
import React from 'react'
import { useAuth } from '../../../hooks/auth/useAuth'
import { useAuthState } from '../../../hooks/auth/useAuthState'
import Logo from '../../atoms/brand/Logo/Logo'

function DashboardHeader() {
  const { profile } = useAuthState()
  const { signOut } = useAuth()
  return (
    <Header height={60}  >
        <Flex align="center" h="100%" justify="space-between" px="md" py="lg" >
            <Logo/>
            <Tooltip
              label="Click me to sign out"
              position="bottom"
              withArrow
            >
            <Avatar
                sx={{
                  cursor: "pointer"
                }}
                onClick={signOut}
                src={profile?.pic_url}
                alt="user"
                radius={"xl"}
            />
            </Tooltip>
        </Flex>
    </Header>
  )
}

export default DashboardHeader