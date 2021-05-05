import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export const SortMenu = withStyles({
  paper: {
    background:  'linear-gradient(#FFFFFF, #FFFFFF)'
  },
})((props: any) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

export const SortMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#edefef',
      color: 'red'
    },
    '&:active': {
      backgroundColor: '#edefef',
      color: 'red'
    },
  },
}))(MenuItem)
