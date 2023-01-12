import { Flex, Text } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <Flex 
      align="center"
      justify="around"
      h="100%"
    >
        <Image
          width={60}
          height={60}
          src="/brand/logo.svg" alt={'Logo'}    
        />

        <Text
          fz={18}
          fw={700}
          color="blue"
        >
          The-repository
        </Text>
    </Flex>
    
  )
}

export default Logo