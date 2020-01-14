import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { PillIcon, InjectIcon, BackgroundIcon } from '../styles/icons'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import grey from '@material-ui/core/colors/grey'
import Grid from '@material-ui/core/Grid'









import Box from '@material-ui/core/Box'
// import { fontWeight } from '@material-ui/system'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    background: 'linear-gradient(45deg, #00B950 35%, #38ef7d 100%)'


  },
  title: {
    textAlign: 'center',
    color: grey[50],
    fontWeight: '400'

  },
  copyright: {
    color: grey[800]
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
    color: grey[800],
    backgroundColor: grey[50],
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  submitgrey: {
    margin: theme.spacing(5, 0, 2),
    color: grey[800],
    border: '2px solid',
    '&:hover': {
      backgroundColor: theme.palette.text.secondary
    }
  },
  avatar: {
    color: grey[800],
    marginBottom: 0
  }
}))

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

        <Typography component="h1" variant="h2" className={classes.avatar} >
          <PillIcon fontSize='inherit' />
          {/* <BackgroundIcon fontSize="inherit"/> */}
          <InjectIcon fontSize='inherit' />
        </Typography>
        <Typography component="h1" variant="h2" className={classes.title} >
          Take Your Medicine
        </Typography>
        <Grid container spacing={2} >
          <Grid item xs={6} className={classes.centeralign} >
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              // color="primary"
              className={classes.submitgrey}
              onClick={(e) => pushRegister(e)}

            >
              register
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // color="primary"
              className={classes.submit}
              onClick={(e) => pushLogin(e)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Box >

  )


}

export default Home