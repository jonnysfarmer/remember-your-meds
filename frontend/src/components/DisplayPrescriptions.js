import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
//Material UI
import { withStyles, Grid, Paper, Typography, Avatar, Switch, Box, IconButton } from '@material-ui/core'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import { red, green } from '@material-ui/core/colors'
//Material UI our styles/icons
import { useStyles } from '../styles/styles'
//Our components/functions
import Auth from '../lib/auth'

const SwitchonOFF = withStyles({
  switchBase: {
    color: red[500],
    '&$checked': {
      color: green[500]
    },
    '&$checked + $track': {
      backgroundColor: green[500]
    },
    '& + $track': {
      backgroundColor: red[500]
    }
  },
  checked: {},
  track: {}
})(Switch)
  
const DisplayPrescriptions = ({ medicine, presID }) => {

  const classes = useStyles()
  const history = useHistory()

  const [reminders, setReminder] = useState([])
  const [takeReminders, setTakeReminders] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([])

  // pulls all the reminder info then filters for specific prescriptioj
  const dataHook = () => {
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        const data1 = resp.data
        const specific = data1.filter(ele => ele.prescription.id === presID)
        const nontake = specific.filter(ele => ele.reminder_type === 'order prescription' || ele.reminder_type === 'make appointment')
        const take = specific.filter(ele => ele.reminder_type === 'take-mid' || ele.reminder_type === 'take-pm' || ele.reminder_type === 'take-am')
        const takeEdited = take.filter(ele => ele.edited === true && ele.active === true)
        // console.log(takeEdited)
        setTakeReminders(takeEdited)
        setReminder(nontake)

      })
      .catch(err => setErrors(err.response.data))
  }

  const handleChange = (id, i) => (event) => {
    if (reminders[i].edited === false) {
      history.push(`/prescriptions/${presID}/edit-reminders`)
    } else {
      const newreminders = [...reminders]
      newreminders[i].active = event.target.checked
      axios.put(`/api/reminders/${id}/`, { 'active': event.target.checked }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      setReminder(newreminders)
      setErrors({})
    }
  }

  const handleinitialredirect = () => {
    history.push(`/prescriptions/${presID}/edit-reminders`)
  }

  const handlechangeall = (e) => {
    const newtakereminders = [...takeReminders]
    newtakereminders.map((ele) =>{
      ele.active = e.target.checked
      axios.put(`/api/reminders/${ele.id}/`, { 'active': event.target.checked }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
    })
    setTakeReminders(newtakereminders)
    
  }
  const pushDetailPage = () => {
    history.push(`/prescriptions/${presID}/`)
  }

  useEffect(dataHook, [])

  if (medicine === null || reminders === []) return <div>Loading</div>
  return (
    <div className={classes.root}>
      <Paper className={classes.paperCard}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {medicine.name}
                </Typography>
                {!takeReminders[0] ?
                  <Typography component="div" variant="caption" color="textSecondary">
                    <Grid component="label" container alignItems="center" spacing={0}>
                      <Grid item>
                        <SwitchonOFF
                          size="small"
                          checked= {false}
                          onChange={()=>handleinitialredirect()}
                          value="active"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      </Grid>
                      <Grid item >
                        <Box className={classes.boxdisplay}>
                          Reminder to take medicine
                        </Box>
                      </Grid>
                    </Grid>
                  </Typography>
                  :
                  <Typography component="div" variant="caption" color="textSecondary">
                    <Grid component="label" container alignItems="center" spacing={0}>
                      <Grid item>
                        <SwitchonOFF
                          size="small"
                          checked= {takeReminders[0].active}
                          onChange={(e)=>handlechangeall(e)}
                          value="active"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      </Grid>
                      <Grid item >
                        <Box className={classes.boxdisplay}>
                          Reminder to take medicine
                        </Box>
                      </Grid>
                    </Grid>
                  </Typography>
                }
                {reminders.map((ele, i) => {
                  return (
                    <Typography component="div" variant="caption" color="textSecondary" key={i}>
                      <Grid component="label" container alignItems="center" spacing={0}>
                        <Grid item>
                          <SwitchonOFF
                            size="small"
                            checked={ele.active}
                            onChange={handleChange(ele.id, i)}
                            value="active"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                        </Grid>
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
            </Grid>
            <Grid item>
              <IconButton className={classes.noPadding} onClick={()=>pushDetailPage()}>
                <Avatar className={classes.avatar} >
                  <AddOutlinedIcon  fontSize="small" />
                </Avatar>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default DisplayPrescriptions

