import React from 'react'
import { useHistory } from 'react-router-dom'
//Material UI
import { Button, CssBaseline, Typography, Container, Grid, Box } from '@material-ui/core'
//Material UI our styles/icons
import { useStyles } from '../styles/styles'
import { PillIcon, InjectIcon } from '../styles/icons'
import Copyright from './Copyright'

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
    <Box height='100vh' className={classes.backCol}>
      <Box className={classes.backImg}>
        <CssBaseline />
        <Container component="main" maxWidth="xs" >
          <Box className={classes.homeIcon}>
            <Typography component="h1" variant="h2">
              <PillIcon fontSize='inherit' />
              <InjectIcon fontSize='inherit' />
            </Typography>
          </Box>
          <Box>
            <Typography component="h1" variant="h2" className={classes.title}>
              Take Your Medicine
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  className={classes.outlinedButton}
                  type="submit"
                  fullWidth
                  variant="outlined"
                  onClick={(e) => pushRegister(e)}
                >
                  register
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.containedButton}
                  type="submit"
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={(e) => pushLogin(e)}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home