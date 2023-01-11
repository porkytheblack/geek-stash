import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Center, Container, Text } from '@mantine/core'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <Container 
   >
    <Center 
    >
      <Text>
        Howdy
      </Text>
    </Center>
   </Container>
  )
}
