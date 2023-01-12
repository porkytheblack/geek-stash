import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Button, Center, Container, Flex, Grid, Text } from '@mantine/core'
import { IconBrandGit, IconBrandGithub, IconBrandGoogle } from '@tabler/icons'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  
    <Grid w={"100%"} h="100vh" m={0} >
      <Grid.Col
      
        sx={{
          backgroundImage: " url('https://images-ext-1.discordapp.net/external/CYC2hnguFJu3-HTja31GIVPvDGSmHU3ICaLSqhoKMuI/%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D1260%26h%3D750%26dpr%3D1/https/images.pexels.com/photos/355906/pexels-photo-355906.jpeg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
        span={6} p={0}  >

      </Grid.Col>
      <Grid.Col span={6} >
        <Flex
          dir="column"
          direction={"column"}
          align="center"
          justify="center"
          h="100%"
        >
            <Text
              size="xl"
              fw={700}
              color="blue"
              mb="lg"
            >
              Continue with
            </Text>
            <Button
              mb="md"
              w="80%"
              leftIcon={
                <IconBrandGoogle/>
              }
            >
              Google
            </Button>
            <Button
              leftIcon={
                <IconBrandGithub/>
              }
              w="80%"
            >
              Github
            </Button>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}
