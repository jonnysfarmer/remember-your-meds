import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { PillIcon, InjectIcon } from '../styles/icons'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'







import Box from '@material-ui/core/Box'
import { fontWeight } from '@material-ui/system'

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
    color: theme.palette.success.main,
    fontWeight: '400'

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

function Copyright() {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href='/#/'>

          Take your medicine
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Made using NHS data
      </Typography>
    </Box>
  )
}



const Home = () => {

  const classes = useStyles()
  const history = useHistory()

  const pushLogin = (e) => {
    e.preventDefault()
    history.push('/login/')

  }
  const pushRegister = (e) => {
    e.preventDefault()
    history.push('/register/')

  }

  return (
    <Box height='100vh' >
      <CssBaseline />
      <Container component="main" maxWidth="xs" className={classes.paper} >

        <Typography component="h1" variant="h2" color="textSecondary" >
          <PillIcon fontSize='inherit' />
          <InjectIcon fontSize='inherit' />
        </Typography>
        <Typography component="h1" variant="h2" color="textSecondary" className={classes.title} >
          Take Your Medicine
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e)=>pushLogin(e)}
        >
          Login
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submitgrey}
          onClick={(e)=>pushRegister(e)}

        >
          register
        </Button>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Box>

  )


}

export default Home