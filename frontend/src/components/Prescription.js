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



// import { useStyles, theme } from '../styles/styles'

import axios from 'axios'
import Auth from '../lib/auth'



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
    color: theme.palette.success.main
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
  }
}))

const IndividualPrescription = (props) => {

  const classes = useStyles()

  const [user, setUser] = useState({})
  const [prescriptions, setPrescriptions] = useState([])

  const [errors, setErrors] = useState([])

  // api/reminders/users/

  const userHook = () => {
    axios.get('/api/profile/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        setUser(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }
  const prescriptionHook = () => {
    axios.get('/api/prescriptions/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        const data = resp.data
        const medicineInfo = data.map(ele => ele.medicine)
        setPrescriptions(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }
  const handleCreate = (e) => {
    e.preventDefault()
    props.history.push('/prescriptions/create/')
  }


  useEffect(userHook, [])
  useEffect(prescriptionHook, [])




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Profile
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Edit Profile
        </Button>
        <Typography component="h2" variant="h6" className={classes.title}>
          Username
        </Typography>
        <Typography component="h1" variant="subtitle1" color="textSecondary">
          {user.username}
        </Typography>
        <Typography component="h2" variant="h6" className={classes.title}>
          Email
        </Typography>
        <Typography component="h1" variant="subtitle1" color="textSecondary">
          {user.email}
        </Typography>
        <Typography component="h2" variant="h6" className={classes.title}>
          Mobile
        </Typography>
        <Typography component="h1" variant="subtitle1" color="textSecondary">
          {user.mobile ? user.mobile : 'No mobile entered'}
        </Typography>
        <Typography component="h2" variant="h6" className={classes.title}>
          Current Prescriptions
        </Typography>
        <div className={classes.root}>
          {prescriptions ?
            prescriptions.map((ele, i) => {

              return (

                <Paper className={classes.grid} key={i}>
                  <Grid container spacing={2} >
                    <Grid item xs={9} className={classes.centeralign} >
                      <Typography component="h3" variant="subtitle1" color="textSecondary" >
                        {ele.medicine.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Avatar className={classes.avatar} >
                        <EditOutlinedIcon fontSize="small" />
                      </Avatar>
                    </Grid>
                  </Grid>
                </Paper>


              )
            }) :
            <div className={classes.altinput}>
              <Typography component="h1" variant="subtitle1" color="textSecondary">
                You currently have no prescriptions
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.altsubmit}
                onClick = {(e)=>handleCreate(e)}
              >
                Create new prescription
              </Button>
            </div>
          }
        </div>


      </div>
    </Container>
  )

}

export default IndividualPrescription