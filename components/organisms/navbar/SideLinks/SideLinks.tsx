import React from 'react'
import SideBarLink, { ISidebarLink } from '../../../atoms/Buttons/SideBarLink/SideBarLink'
import { IconEye, IconKey, IconPlus, IconChartBar } from '@tabler/icons'

function SideLinks() {

    const links: ISidebarLink[] = [
        {
            icon: <IconKey
                size={16}
            />,
            color:"blue",
            label: "API Keys"
        },
        {
            icon: <IconPlus
                size={16}
            />,
            color: "blue",
            label: "Create"
        },
        {
            icon: <IconEye
                size={16}
            />,
            color: "blue",
            label: "View"
        },
        {
            icon: <IconChartBar
                size={16}
            />,
            color: "blue",
            label: "Usage"
        }
    ]

  return (
    <div>
        {
            links.map((link, index)=>{
                return (
                    <SideBarLink
                        key={index}
                        {...link}
                    />
                )
            })
        }
    </div>
  )
}

export default SideLinks