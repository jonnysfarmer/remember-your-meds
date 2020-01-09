import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'



import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    
  }
}))



const Home = () => {

  const classes = useStyles()

  return (
    <Box color='primary.main' >
      <CssBaseline />
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <h1>Take your Meds</h1>
      </Container>
    </Box>

  )


}

export default Home