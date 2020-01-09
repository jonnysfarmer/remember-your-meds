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



import axios from 'axios'

// This basically Creates the copywrite document, need to add URL

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">

        Takeyourmedicine
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
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
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.success.main

  }
}))

// this is Themse for the form palette

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

const registerform = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  mobile: ''
}

const Register = (props) => {

  const classes = useStyles()

  const [registerInfo, setRegisterInfo] = useState(registerform)
  const [err, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword( !showPassword )
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }


  const handleChange = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    setErrors({})
    console.log(registerInfo)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/register/', registerInfo)
      .then(() => console.log('registered'))
      .catch((err) => {
        setErrors(err.response.data)
        // console.log(err.response.data.password)
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
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
            <TextField
              error = {err.username && true}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={err.username ? 'Error' : 'Username'}
              name="username"
              autoComplete="email"
              helperText={err.username}
              autoFocus
              onChange={(e) => handleChange(e)}
            />
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
              error = {err.password && true}
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
              InputProps={{ endAdornment: 
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Password Confirmation"
              type={showPassword ? 'text' : 'password'}
              id="password_confirmation"
              autoComplete="confirmation-password"
              onChange={(e) => handleChange(e)}
              InputProps={{ endAdornment: 
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="mobile"
              label="Mobile Number"
              type="mobile"
              id="mobile"
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
              InputProps={{
                startAdornment: <InputAdornment position="start">+44</InputAdornment>
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
            Register
          </Button>

        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Register
