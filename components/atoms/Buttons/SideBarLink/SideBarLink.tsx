import { Group, MantineTheme, Sx, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import React from 'react'

interface IProps {
    icon: React.ReactNode,
    label: string,
    color: string,
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
    const { color, label, icon } = props;
  return (
    <UnstyledButton
        sx={makeStyles}
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