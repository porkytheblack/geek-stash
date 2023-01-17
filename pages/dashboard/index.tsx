import { Button, Flex, Grid, Tabs, Text, useMantineColorScheme } from "@mantine/core"
import { useEffect } from "react"
import { IPageProps } from "../../types/next-related-extensions"
import { Prism } from "@mantine/prism"
import { IconBrandPython, IconBrandTypescript, IconKey, IconTrash } from "@tabler/icons"


function Dashboard(props: any){

    const {colorScheme} = useMantineColorScheme()
    
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
                            language="yaml"
                            w="full"
                            colorScheme={ colorScheme === "dark" ? "light" : "dark"}
                        >
                            y8skshsijsmslsjjs8djsjs88hhIBKHB*8hs99fdbdjjsjskskksldmdmdmdkdmddjdjdjdjdjfjdjdjdjd
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
                            >
                                Generate New Key
                            </Button>

                            <Button
                                leftIcon={
                                    <IconTrash
                                        size={20}
                                        color="white"
                                    />
                                }
                                type="reset"
                            >
                                Delete Key
                            </Button>
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
                            Some Typescript code
                        </Prism.Panel>
                        <Prism.Panel
                            language="python"
                            value="python"
                            w="full"
                        >
                            Some Python code
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