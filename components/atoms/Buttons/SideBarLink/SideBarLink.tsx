import { Group, MantineTheme, Sx, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'

interface IProps {
    icon: React.ReactNode,
    label: string,
    color: string,
    link?: string
} 

export type ISidebarLink = IProps

const makeStyles: Sx = (theme: MantineTheme) => ({
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.black,
    '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }
})

function SideBarLink(props: IProps) {
    const { color, label, icon, link } = props;
    const { push } = useRouter()
  return (
    <UnstyledButton
        sx={makeStyles}
        onClick={()=>{
            if(link){
                push(link)
            }
        }}
    >
        <Group>
            <ThemeIcon color={color} >
                {
                    icon
                }
            </ThemeIcon>
            <Text size="sm" >
                {
                    label
                }
            </Text>
        </Group>
    </UnstyledButton>
  )
}

export default SideBarLink