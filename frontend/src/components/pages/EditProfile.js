import React, { useState, useEffect } from 'react'
import axios from 'axios'
//Material UI
import { Button, CssBaseline, Typography, Container, Avatar, Grid, TextField } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
//Material UI our styles/icons
import { useStyles, theme } from '../../styles/styles'
import { ProfileIcon } from '../../styles/icons'
//Our Libraries/Components
import Auth from '../../lib/auth'

const EditProfile = (props) => {

  const classes = useStyles()

  const [user, setUser] = useState({})
  const [err, setErrors] = useState({})

  // logs the handle change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    setErrors({})
  }

  // on save button, posts new data
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('/api/profile/', user, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => props.history.push('/profile'))
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

  // return to profile page
  const handleReturn = (e) => {
    e.preventDefault()  
    props.history.push('/profile/')
  }

  // hook to pull data
  useEffect(userHook, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ProfileIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Edit Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
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
              value={user.username || ''}
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
              value={user.email || ''}
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
                color="primary"
                className={classes.submitsmall}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )

}

export default EditProfile