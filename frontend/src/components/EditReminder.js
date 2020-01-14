import React, { useState, useEffect } from 'react'
import axios from 'axios'
//Material UI
import { Container, CssBaseline, Avatar, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
//Material UI our styles/icons
import { useStyles, theme } from '../styles/styles'
import { ReminderIcon } from '../styles/icons'

import Auth from '../lib/auth'
import ReminderOrder from './reminderComponents/ReminderOrder'

const EditReminder = (props) => {

  const classes = useStyles()

  // eslint-disable-next-line no-unused-vars
  // const [data, setData] = useState() //data to save to reminders in db
  const [reminders, setReminders] = useState([]) //place to store data retrieved from db & edit state
  const [medicineName, setMedicineName] = useState() //used to display medicine name without having to make more api calls
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState()

  //===== GET REMINDER INFO
  const reminderHook = () => {
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => setReminders(resp.data.filter(ele => ele.prescription.id === parseInt(props.match.params.id))))
      .catch(err => setErrors(err.response.data))
  }

  //===== SET INITIAL DATA THAT IS CONSTANT
  const setInitialData = () => {
    if (reminders.length === 0) {
      console.log('waiting for data')
    } else {
      // setData({
      //   ['user']: reminders[0].user.id,
      //   ['prescription']: reminders[0].prescription.id,
      //   ['medicine']: reminders[0].prescription.medicine.id
      // })
      setMedicineName(reminders[0].prescription.medicine.name)
    }
  }


  //===== USE EFFECT
  useEffect(() => reminderHook(), [])
  useEffect(() => setInitialData(), [reminders])

  //===== UI
  if (reminders === []) return <div>loading</div>
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
          <p>for {medicineName}</p>

          <ReminderOrder props={reminders} />

        </div>
      </ThemeProvider>
    </Container>
  )
}

export default EditReminder