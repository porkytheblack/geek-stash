import { Avatar, Flex, Header } from '@mantine/core'
import React from 'react'

function DashboardHeader() {
  return (
    <Header height={60}  >
        <Flex align="center" h="100%" justify="flex-end" px="md" py="lg" >
            <Avatar
                src={"https://images-ext-2.discordapp.net/external/6wEv2nYOkVxaWjWZBn1vaI4-UMH2fCww8x4XfW4H2iQ/%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D1260%26h%3D750%26dpr%3D1/https/images.pexels.com/photos/774909/pexels-photo-774909.jpeg"}
                alt="user"
                radius={"xl"}
            />
        </Flex>
    </Header>
  )
}

export default DashboardHeader