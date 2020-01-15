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
import Copyright from '../Copyright'


const Register = (props) => {

  const classes = useStyles()

  const [registerInfo, setRegisterInfo] = useState({})
  const [err, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  //===== Show/Hide password text
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  //===== Update form info to state
  const handleChange = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    setErrors({})
  }

  //===== Create registration
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/register/', registerInfo)
      .then(() => props.history.push('/login'))
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
        </Avatar >
        <Typography component="h1" variant="h4">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
            <TextField
              error={err.username && true}
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
              error={err.email && true}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={err.email ? 'Error' : 'Email Address'}
              helperText={err.email}
              name="email"
              autoComplete="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
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

export default Register