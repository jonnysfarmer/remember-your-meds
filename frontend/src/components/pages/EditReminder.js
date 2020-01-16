import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
//Material UI
import { Container, CssBaseline, Avatar, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
//Material UI our styles/icons
import { useStyles, theme } from '../../styles/styles'
import { ReminderIcon } from '../../styles/icons'
//Our components/functions
import Auth from '../../lib/auth'
import ReminderOrder from '../reminderComponents/ReminderOrder'
import ReminderAppt from '../reminderComponents/ReminderAppt'
import ReminderTake from '../reminderComponents/ReminderTake'

const EditReminder = (props) => {

  const classes = useStyles()
  const [reminders, setReminders] = useState([]) //place to store data retrieved from db & edit state

  //===== GET REMINDER INFO
  const reminderHook = () => {
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => setReminders(resp.data.filter(ele => ele.prescription.id === parseInt(props.match.params.id))))
      .catch(err => console.log(err.response.data))
  }

  //===== USE EFFECT
  useEffect(() => reminderHook(), [])

  //===== UI
  if (reminders.length === 0) return <div>loading</div>
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ReminderIcon />
          </Avatar>
          <Typography component='h1' variant='h4'>
            Reminders
          </Typography>
          <p>for {reminders[0].prescription.medicine.name}</p>

          <ReminderOrder props={reminders} />
          <ReminderAppt props={reminders} />
          <ReminderTake props={reminders} />

        </div>
      </ThemeProvider>
    </Container>
  )
}

export default withRouter(EditReminder)