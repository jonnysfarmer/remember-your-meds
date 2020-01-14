import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { green } from '@material-ui/core/colors'
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'


import Auth from '../lib/auth'
import axios from 'axios'

// This basically Creates the copywrite document, need to add URL

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
      <Link color="inherit" href='https://developer.api.nhs.uk/'>
      Made using NHS data
      </Link>
      </Typography>
    </Box>
  )
}

// These are the styles for the form

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main
  },
  form: {
    width: '100%',
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }

  }
}))

// this is Themse for the form palette

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})


const Login = (props) => {

  const classes = useStyles()

  const [loginInfo, setLoginInfo] = useState()
  const [err, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }


  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    setErrors({})
  }

  // Need to add getting Auth Token
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login/', loginInfo)
      .then((resp) => {
        Auth.setToken(resp.data.token)
        // console.log('Logged In')
        props.history.push('/prescriptions')
      })
      .catch((err) => {
        setErrors(err.response.data)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
            {/* <TextField
              error={err.message && true}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={err.message ? 'Error' : 'Username'}
              helperText={err.message}
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => handleChange(e)}
            /> */}
            <TextField
              error = {err.email && true}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={err.email ? 'Error' : 'Email Address'}
              helperText={err.email}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <TextField
              error={err.password && true}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={err.password ? 'Error' : 'Password'}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              helperText={err.password}
              onChange={(e) => handleChange(e)}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
              }}
            />

          </ThemeProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>

        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Login
