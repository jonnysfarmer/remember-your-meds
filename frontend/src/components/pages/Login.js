import React, { useState } from 'react'
import axios from 'axios'
//Material UI
import { ThemeProvider, Avatar, Button, CssBaseline, TextField, Box, Typography, Container, InputAdornment, IconButton } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
//Material UI our styles/icons
import { useStyles, theme } from '../../styles/styles'
//Our Libraries/Components
import Auth from '../../lib/auth'
import Copyright from '../Copyright'


const Login = (props) => {

  const classes = useStyles()

  const [loginInfo, setLoginInfo] = useState()
  const [err, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  //===== Show/Hide password text
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  //===== Get form input data
  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    setErrors({})
  }

  //===== Log user in
  const handleSubmit = (e) => {
    e.preventDefault()
    const loginLower = { ...loginInfo }
    loginLower.email = loginLower.email.toLowerCase()
    axios.post('/api/login/', loginLower)
      .then((resp) => {
        Auth.setToken(resp.data.token)
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
            <TextField
              error={err.message && true}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={err.message ? 'Error' : 'Email Address'}
              helperText={err.message}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <TextField
              error={err.message && true}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={err.message ? 'Error' : 'Password'}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              helperText={err.message}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
          </Button>
          </ThemeProvider>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Login
