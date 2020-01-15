import React, { useState, useEffect } from 'react'
import axios from 'axios'
//Material UI
import { Button, CssBaseline, Typography, Container, Avatar, Grid, Paper } from '@material-ui/core'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import IconButton from '@material-ui/core/IconButton'
//Material UI our styles/icons
import { useStyles } from '../../styles/styles'
import { ProfileIcon } from '../../styles/icons'
//Our Libraries/Components
import Auth from '../../lib/auth'

const Profile = (props) => {

  const classes = useStyles()

  const [user, setUser] = useState({})
  const [prescriptions, setPrescriptions] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([])

  //===== Get user info
  const userHook = () => {
    axios.get('/api/profile/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        setUser(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }

  //===== Get prescription info
  const prescriptionHook = () => {
    axios.get('/api/prescriptions/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        const data = resp.data
        if (data.length === 0) {
          console.log('test')
          setPrescriptions('')
        } else {
          setPrescriptions(resp.data)
        }
      })
      .catch(err => setErrors(err.response.data))
  }

  //===== Go to relevant page
  const handleCreate = (e) => {
    e.preventDefault()
    props.history.push('/prescriptions/create/')
  }
  const handleEdit = (e) => {
    e.preventDefault()
    props.history.push('/profile/edit/')
  }
  const pushDetail = (id) => {
    props.history.push(`/prescriptions/${id}`)
  }

  //===== USE EFFECT
  useEffect(userHook, [])
  useEffect(prescriptionHook, [])


  // This displays the info.
  //it then maps through your prescriptions, displaying what you currently have
  // if you do not have any prescriptions, it has a button to create a prescription
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ProfileIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          My Profile
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e) => handleEdit(e)}
        >
          Edit Profile
        </Button>
        <Typography variant="h6" className={classes.inlineTitle}>
          Username
        </Typography>
        <Typography className={classes.inlineText}>
          {user.username}
        </Typography>
        <Typography variant="h6" className={classes.inlineTitle}>
          Email
        </Typography>
        <Typography className={classes.inlineText}>
          {user.email}
        </Typography>
        <Typography variant="h6" className={classes.inlineTitle}>
          Mobile
        </Typography>
        <Typography className={classes.inlineText}>
          {user.mobile ? user.mobile : 'No mobile entered'}
        </Typography>
        <Typography variant="h6" className={classes.inlineTitle}>
          Current Prescriptions
        </Typography>
        <div className={classes.root}>
          {prescriptions ?
            prescriptions.map((ele, i) => {
              return (
                <Paper className={classes.paperCard} key={i}>
                  <Grid container spacing={2} >
                    <Grid item xs={10} className={classes.centeralign} >
                      <Typography color="textSecondary" >
                        {ele.medicine.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton edge="end" className={classes.noPadding} onClick={() => pushDetail(ele.id)}>
                        <Avatar className={classes.avatargrey} >
                          <AddOutlinedIcon fontSize="small"  />
                        </Avatar>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              )
            }) :
            <div className={classes.centerText}>
              <Typography className={classes.inlineText}>
                You currently have no prescriptions
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => handleCreate(e)}
              >
                Create new prescription
              </Button>
            </>
          }
        </div>


      </div>
    </Container>
  )
}

export default Profile