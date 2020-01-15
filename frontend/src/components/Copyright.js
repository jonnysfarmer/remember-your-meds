import React from 'react'
//Material UI
import { Link, Box, Typography } from '@material-ui/core'
//Material UI our styles/icons
import { useStyles } from '../styles/styles'


//===== Copyright block
function Copyright() {
  const classes = useStyles()
  return (
    <Box className={classes.copyright}>
      <Typography variant="body2" align="center" color='inherit'>
        {'Copyright © '}
        <Link color="inherit" href='/#/'>
          Take your medicine
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" align="center" color='inherit'>
        <Link color="inherit" href='https://developer.api.nhs.uk/' target='_blank' rel='noopener'>
          Made using NHS data
        </Link>
      </Typography>
    </Box>
  )
}

export default Copyright