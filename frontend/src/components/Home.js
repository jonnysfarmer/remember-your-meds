import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { PillIcon, InjectIcon } from '../styles/icons'
import Button from '@material-ui/core/Button'





import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%'

  },
  title: {
    textAlign: 'center',
    color: theme.palette.success.main

  },
  submit: {
    margin: theme.spacing(5, 0, 1),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  submitgrey: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.text.secondary
    }
  }
}))



const Home = () => {

  const classes = useStyles()

  return (
    <Box height='100vh' >
      <CssBaseline />
      <Container component="main" maxWidth="xs" className={classes.paper} >
        
        <Typography component="h1" variant="h2" color="textSecondary" >
          <PillIcon fontSize='inherit'/>
          <InjectIcon fontSize='inherit'/>
          </Typography>
          <Typography component="h1" variant="h2" color="textSecondary" className={classes.title} >
          Take your Medicine
        </Typography>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitgrey}
          >
            register
          </Button>
      </Container>
    </Box>

  )


}

export default Home