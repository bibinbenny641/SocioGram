import React from 'react'
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    
  } from '@chakra-ui/react'
  import { Button, ButtonGroup } from '@chakra-ui/react'
  import { ArrowDownIcon } from '@chakra-ui/icons'

function Menus() {
  return (
    <> 
    <Menu>
  <MenuButton >
  <GridViewOutlinedIcon />
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
    </>
  )
}

export default Menus