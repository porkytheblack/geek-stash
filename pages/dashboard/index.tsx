import { Button, Flex, Grid, Tabs, Text, Tooltip, useMantineColorScheme } from "@mantine/core"
import { useEffect } from "react"
import { IPageProps } from "../../types/next-related-extensions"
import { Prism } from "@mantine/prism"
import { IconBrandPython, IconBrandTypescript, IconKey, IconTrash } from "@tabler/icons"
import { useGetApiKeysQuery } from "../../redux/data/apiKeys"
import useKeys from "../../hooks/auth/useKeys"
import { useAuthState } from "../../hooks/auth/useAuthState"
import { isEmpty } from "lodash"

const tsCodeSnippet = `
import axios from "axios"

axios.get('https://geek-stash.doncodes.xyz/api/data/get?type=character&id=someid', {
  headers: {
      "Authorization": "Bearer {{your api key goes here}}"
  }
})
`

const pyCodeSnippet = `
import requests

url = "https://geek-stash.doncodes.xyz/api/data/get?type=character&id=someid"

payload={}

headers = {
    Authorization: "Bearer {{your api key goes here}}"
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
`


function Dashboard(props: any){

    const { apiKey, apiKeys, apiKeysError, apiKeysLoading, generate_new_api_key } = useKeys()

    const {colorScheme} = useMantineColorScheme()

    useEffect(()=>{
        console.log("apiKeys::", apiKeys)
    }, [apiKeys])
    
    return (
        <Flex
            w="100%"
            h="100%"
            align="flex-start"
            justify="flex-start"
        >
            <Flex w="full" direction={"column"} align="flex-start" justify={"flex-start"} >
                <Flex w="full" align={"center"} justify="space-between" >
                    <Flex w="full" align="flex-start" direction="column" justify={"center"}  >
                        <Text fz={20} fw={600} color="blue" mb="sm" >
                            API Key
                        </Text>
                        <Prism
                            w={700}
                            language="typescript"
                            colorScheme={ colorScheme === "dark" ? "light" : "dark"}
                        >
                            {
                                isEmpty(apiKey) ? "Click generate to get a new one" : apiKey?.api_key
                            }
                        </Prism>
                        <Text 
                            w="full"
                            p={20}
                            px={0}
                            mt={10}
                            fz={12}
                            fw={600}
                            color={
                                colorScheme === "dark" ? "gray" : "dark"
                            }
                        >
                            Use your api key to authenticate your api requests to geek-stash.
                        </Text>
                        <Flex w="100%" align="center" justify={"space-between"} >
                            <Button
                                leftIcon={
                                    <IconKey
                                        size={20}
                                        color="white"
                                    />
                                }
                                onClick={generate_new_api_key}
                            >
                                Generate New Key
                            </Button>
                            <Tooltip
                                label="Coming soon!"
                            >   
                                <Button
                                        leftIcon={
                                            <IconTrash
                                                size={20}
                                                color="white"
                                            />
                                        }
                                        type="reset"
                                        disabled
                                    >
                                        Delete Key
                                    </Button>
                            </Tooltip>
                            
                        </Flex>
                    </Flex>
                        
                </Flex>
                <Flex w="full" align="center" pt={40} direction="column" justify={"flex-start"} >
                    <Text fz={20} fw={600} color="blue" mb="sm" >
                        Implement the api in your code
                    </Text>
                    <Prism.Tabs defaultValue={"typescript"} w={650} h={300} >
                        <Prism.TabsList>
                            <Prism.Tab lang="typescript" value="typescript" icon={<IconBrandTypescript/>} >
                             Typescript
                            </Prism.Tab>
                            <Prism.Tab lang="python" value="python" icon={<IconBrandPython/>}  >
                                Python
                            </Prism.Tab>
                        </Prism.TabsList>
                        <Prism.Panel
                            language="typescript"
                            value="typescript"
                            w="full"
                        >
                            {
                                tsCodeSnippet
                            }
                        </Prism.Panel>
                        <Prism.Panel
                            language="python"
                            value="python"
                            w="full"
                        >
                            {
                                pyCodeSnippet
                            }
                        </Prism.Panel>
                    </Prism.Tabs>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Dashboard


export const getStaticProps = async () => {
    return {
        props: {
            layout: "dashboard",
            accessLevel: "private"
        } as IPageProps
    }
}