import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
//Material UI
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { ThemeProvider } from '@material-ui/core/styles'
//Material UI our styles/icons
import { useStyles, theme, SwitchOnOFF } from '../styles/styles'
import { ReminderIcon } from '../styles/icons'
//Our Libraries/Components
import Auth from '../lib/auth'

const CreateReminder = () => {

  const classes = useStyles()

  const [reminders, setReminders] = useState({})

  //===== INITIAL PAGE DATA
  //----- Medicine Name (prescription.medicine -> medicine.id, medicine.name)
  //----- Reminder Status (with reminder.id)
  //----- Reminder Status (with prescription.id)
  //----- Set prescription id
  // const presId = 22


  // ORDER REPEAT
  //---- Get reminder Id
  const presId = 22
  //---- Call API for Reminder info and then filter by prescription ID
  const getReminderByPrescription = () => {
    console.log('getting reminders')
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      // .then(resp => setReminders(resp.data.filter(ele => ele.prescription.id === presId)))
      .then(resp => console.log(resp.data))
      .catch(err => console.log(err.response.data))
  }
  //---- Get status of reminder to order
    
  // user turns on
  // user needs to enter number of days doses left in their cupboard
  // user needs to confirm how many repeats they have left
  // we calc TODAY - number_days_doses_left - 7 
  // if that is <= today, alert user to order prescription now & update their repeats
  // if that is >today, we set that as reminder_time: date 09:00:00 and reminder_type: order prescription (this type is sent daily at 9am)

  //NOTE when we remind user to order a prescription we need to update the calc, so make sure that's a seperate component
  //that component will take number_days_doses from dB



  const handleSubmit = () => {
    // console.log(e.target)
  }

  //===== LOAD REMINDERS
  useEffect(() => {
    getReminderByPrescription()
    //the empty array below ensure this runs only at on mount
  }, [])

  if (!reminders) return <div>Loading</div>
  console.log(reminders)
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ReminderIcon />
        </Avatar>
        <Typography component='h1' variant='h4'>
          Reminders
        </Typography>

        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>

            <Typography component='h1' variant='h6'>
              Order prescription
            </Typography>
            {/* if on
              show next reminder
              show turn off option
            if off
              confirm num prescription repeats remaining
            turn on */}

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Set reminder
            </Button>
          </ThemeProvider>
        </form>
      </div>
    </Container>
  )

}

export default CreateReminder



// MAKE DOCTORS APPT
//similar to order prescription, do that first


// TAKE YOUR MED
// user needs to enter the times to take it
// we store that in our database

{/* <div>
              {reminders.map((ele, i) => {
                return (
                  <>
                    <p key={i}>{ele.reminder_type} - {moment(ele.reminder_time).format('hh:mm')}</p>
                  </>
                )
              })}
            </div> */}