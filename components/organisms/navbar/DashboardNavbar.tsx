import { Center, Navbar } from '@mantine/core'
import React from 'react'
import Logo from '../../atoms/brand/Logo/Logo'
import SideLinks from './SideLinks/SideLinks'



function DashboardNavbar() {
  return (
    <Navbar
        width={{
            base: 300
        }}
    >
        <Navbar.Section>
            
        </Navbar.Section>
        <Navbar.Section grow mt="md" >
            <SideLinks/>
        </Navbar.Section>
        <Navbar.Section>
            
        </Navbar.Section>
    </Navbar>
  )
}

export default DashboardNavbar