import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
//Material UI
import { Container, CssBaseline, Avatar, Typography, Grid, Switch, TextField, Box, Button } from '@material-ui/core'
import { withStyles, ThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
//Material UI our styles/icons
import { useStyles, theme } from '../styles/styles'
import { ReminderIcon } from '../styles/icons'

import Auth from '../lib/auth'

const SwitchOnOFF = withStyles({
  switchBase: {
    color: red[500],
    '&$checked': {
      color: green[500]
    },
    '&$checked + $track': {
      backgroundColor: green[500]
    },
    '& + $track': {
      backgroundColor: red[500]
    }
  },
  checked: {},
  track: {}
})(Switch)



const ReminderTake = (props) => {

  const classes = useStyles()

  //===== UI
  if (reminders === []) return <div>loading</div>
  return (
    <>
    </>
  )
}

export default ReminderTake