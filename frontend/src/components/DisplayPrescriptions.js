import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Avatar from '@material-ui/core/Avatar'
import Switch from '@material-ui/core/Switch'
import { ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'




import { theme } from '../styles/styles'

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
  },
  boxdisplay: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.primary

  }
}))

// ('take', 'Take medicine'),
// ('order a prescription for', 'Order prescription'),
// ('make an appointment for', 'Make doctors appointment')

const DisplayPrescriptions = ({ medicine, data, prescription, presID }) => {

  const [reminders, setReminder] = useState([])
  const [errors, setErrors] = useState([])
  const [takereminder, setTakereminder] = useState({})
  const [orderreminder, setOrderreminder] = useState({})
  const [appointmentreminder, setAppointmentreminder] = useState({})

  const dataHook = () => {
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        const data1 = resp.data
        const specific = data1.filter(ele => ele.prescription.id === presID)
        const take = specific.filter(ele => ele.reminder_type === 'take')
        const order = specific.filter(ele => ele.reminder_type === 'order a prescription for')
        const appointment = specific.filter(ele => ele.reminder_type === 'make an appointment for')
        setReminder(specific)
        setTakereminder(take[0])
        setOrderreminder(order[0])
        setAppointmentreminder(appointment[0])

      })
      .catch(err => setErrors(err.response.data))
  }


  const handleChange = (name, i) => (event) => {
    const newreminders = [...reminders]
    console.log(newreminders)
    newreminders[i].active = event.target.checked
    console.log(newreminders)
    
    setReminder(newreminders)
    // need to create a post here
    setErrors({})
    // console.log(takereminder)

  }



  useEffect(dataHook, [])

  const classes = useStyles()
  console.log(takereminder)
  // console.log(orderreminder)
  // console.log(appointmentreminder)

  if (medicine === null || takereminder === {} || reminders === []) return <div>Loading</div>
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
                {reminders.map((ele, i) => {
                  return (
                    <Typography component="div" variant="body2" color="textSecondary" key={i}>
                      <Grid component="label" container alignItems="center" spacing={0}>
                        <Grid item>Off</Grid>
                        <Grid item>
                          <ThemeProvider theme={theme}>
                            <Switch
                              size="small"
                              checked={ele.active || ''}
                              onChange={handleChange('active', i)}
                              value="active"
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                          </ThemeProvider>
                        </Grid>
                        <Grid item >On</Grid>
                        <Grid item >
                          <Box className={classes.boxdisplay}>
                            Reminder to {ele.reminder_type}
                          </Box>
                        </Grid>
                      </Grid>
                    </Typography>
                  )
                })}

              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  more information
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar} >
                <EditOutlinedIcon fontSize="small" />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )

}

export default DisplayPrescriptions

