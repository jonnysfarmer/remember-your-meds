import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Avatar from '@material-ui/core/Avatar'


import axios from 'axios'
import Auth from '../lib/auth'

// import { makeStyles } from '../styles/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.success.main
  }
}))

const DisplayPrescriptions = ({ medicine, data, prescription }) => {

  const [reminders, setReminder] = useState([])
  const [errors, setErrors] = useState([])

  const dataHook = () => {
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        setReminder(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }

  useEffect(dataHook, [])

  const classes = useStyles()
  console.log(reminders)

  if (medicine === null) return <div>Loading</div>
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {medicine.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  more information
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar} >
                <EditOutlinedIcon fontSize="small"/>
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )

}

export default DisplayPrescriptions