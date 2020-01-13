import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { makeStyles } from '@material-ui/core/styles'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
// import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'


// import Link from '@material-ui/core/Link'



import { theme } from '../styles/styles'

import axios from 'axios'
import Auth from '../lib/auth'

// Styles for Material UI

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
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  title: {
    // color: theme.palette.success.main
  },
  grid: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
    // margin: 'auto'
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    width: '100%'
  },
  centeralign: {
    alignItems: 'center',
    display: 'flex'
  },
  altinput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  altsubmit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  avatargrey: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.success.main
  },
  submitgrey: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  submitred: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.secondary
    }
  }
}))



const EditProfile = (props) => {

  const classes = useStyles()

  const [user, setUser] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErrors] = useState({})

  //hides and shows the password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // logs the handle change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    setErrors({})
  }

  // on save button
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/register/', user)
      .then(() => props.history.push('/login'))
      .catch((err) => {
        setErrors(err.response.data)
      })
  }

  // Pull Profile Info data to display
  const userHook = () => {
    axios.get('/api/profile/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        setUser(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }

  const handleReturn = (e) => {
    e.preventDefault()
    props.history.push('/profile/')
  }




  useEffect(userHook, [])
  console.log(user.email)

  if (user.email === null) return <div>loading</div>
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Edit Profile
        </Typography>

        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
          <ThemeProvider theme={theme}>
            <TextField
              error={err.username && true}
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label={err.username ? 'Error' : 'Username'}
              name="username"
              autoComplete="email"
              helperText={err.username}
              autoFocus
              onChange={(e) => handleChange(e)}
              value={user.username || 'username'}
            />
            <TextField
              error={err.email && true}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label={err.email ? 'Error' : 'Email Address'}
              helperText={err.email}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e)}
              value={user.email || 'email'}
            />
            <TextField
              error={err.password && true}
              variant="outlined"
              margin="normal"
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
              autoComplete="mobile number"
              value={user.mobile || ''}
              onChange={(e) => handleChange(e)}
              InputProps={{
                startAdornment: <InputAdornment position="start">+44</InputAdornment>
              }}
            />

          </ThemeProvider>

        </form>
        <Grid container spacing={2} >
          <Grid item xs={6} className={classes.centeralign} >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitgrey}
              onClick={(e) => handleReturn(e)}

            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submitred}
            // onClick={(e) => handleDelete(e)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>


      </div>
    </Container>
  )

}

export default EditProfile