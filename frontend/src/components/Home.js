import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { PillIcon, InjectIcon } from '../styles/icons'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import grey from '@material-ui/core/colors/grey'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
// import { fontWeight } from '@material-ui/system'

//Material UI our styles/icons
import { useStyles } from '../styles/styles'

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
          <InjectIcon fontSize='inherit' />
        </Typography>
        <Typography component="h1" variant="h2" className={classes.title} >
          Take Your Meds
        </Typography>
        <Grid container spacing={2} >
          <Grid item xs={6} className={classes.centeralign} >
            <Button
              type="submit"
              fullWidth
              variant="outlined"
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