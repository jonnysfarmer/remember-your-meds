import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
//Material UI
import { Container, CssBaseline, Avatar, Typography, Grid, Switch, TextField, Box, Button, Link } from '@material-ui/core'
import { makeStyles, withStyles, ThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
//Material UI our styles/icons
import { useStyles, theme } from '../styles/styles'
import { ReminderIcon } from '../styles/icons'

import Auth from '../lib/auth'

const SwitchOnOFF = withStyles({
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



const EditReminder = (props) => {

  const classes = useStyles()

  const [number, setNumber] = useState() //only used in this component for calculating dates
  const [data, setData] = useState() //data to save to reminders in db
  const [reminders, setReminders] = useState([]) //place to store data retrieved from db & edit state
  const [medicineName, setMedicineName] = useState() //used to display medicine name without having to make more api calls
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
      setData({
        ['user']: reminders[0].user.id,
        ['prescription']: reminders[0].prescription.id,
        ['medicine']: reminders[0].prescription.medicine.id
      })
      setMedicineName(reminders[0].prescription.medicine.name)
    }
  }


  //===== STORE DOSE/NUMBER VALUE AS ENTERED ON FORM
  const handleChange = (e) => {
    setNumber(e.target.value)
    setErrors({})
  }

  //==== CALCULATE REMINDER DUE
  const calcReminderDue = (e) => {
    //----- start with today's date for dates, or the time entered for time
    const startdate = moment().format() //'now'
    const time = e.target.value.split(':')
    //----- set the days to work back to create reminders
    const remOrder = 7 //days
    const remAppt = 14 //days
    //---- calculate due & reminder date/time based on type, store in moment format that works for postgres (default moment)
    switch (e.target.name) {
      case 'order prescription': {
        setData({
          ...data,
          ['due_time']: moment(startdate).add(number, 'd').format(),
          ['reminder_time']: moment(startdate).add(number, 'd').subtract(remOrder, 'd').format()
        })
      } return
      case 'make appointment': {
        setData({
          ...data,
          ['due_time']: moment(startdate).add(number, 'd').format(),
          ['reminder_time']: moment(startdate).add(number, 'd').subtract(remAppt, 'd').format()
        })
      } return
      case 'take-am': {
        setData({
          ...data,
          ['due_time']: moment().hours(time[0]).minutes(time[1]).format()
        })
      } return
      case 'take-mid': {
        setData({
          ...data,
          ['due_time']: moment().hours(time[0]).minutes(time[1]).format()
        })
      } return
      case 'take-pm': {
        setData({
          ...data,
          ['due_time']: moment().hours(time[0]).minutes(time[1]).format()
        })
      } return
    }
    //----- handle if reminder_date is less than today
  }



  //===== UPDATE REMINDER
  function updateReminder(id) {
    axios.put(`/api/reminders/${id}/`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => console.log(resp.data))
      .catch(error => console.log(error.data))
  }

  //===== TURN OFF REMINDER
  function switchReminder(e, i) {
    console.log('changeremindstate')
    //get the id as a number
    const split = e.target.id.split('_')
    const id = parseInt(split[1])
    //change the state to the opposite
    const state = e.target.active = !e.target.active
    //get current reminders
    const newReminders = [...reminders]
    //update the state for this id
    newReminders[i].active = state
    //put the status change tot he db
    axios.put(`/api/reminders/${id}/`, { 'active': state }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      //update our reminder & data
      .then(setReminders(newReminders))
      .then(setData(newReminders))
      .catch(error => console.log(error.data))
  }
  console.log(data)

  //==== SUBMIT DATA
  const handleSubmit = (e) => {
    e.preventDefault()
    setData({ ...data, ['id']: e.target.id })
    updateReminder(e.target.id)
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

          {reminders.map((ele, i) => {
            return (
              <Grid container spacing={0} key={i}>
                <form className={classes.form} id={ele.id} onSubmit={(e) => handleSubmit(e)}>
                  <Typography component='h2' variant='h6' className={classes.capitalize}>
                    {ele.reminder_type}
                  </Typography>

                  <Typography component="div" variant="caption" color="textSecondary" key={i}>
                    <Grid component="label" container alignItems="center" spacing={0}>
                      <Grid item>
                        <SwitchOnOFF
                          id={'switch_' + ele.id}
                          checked={ele.active}
                          size="small"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                          name='active'
                          onChange={(e) => switchReminder(e, i)}
                        />
                      </Grid>
                      <Grid item >
                        <Box className={classes.boxdisplay}>
                          Reminder {ele.active === false && 'inactive'}
                          {ele.active === true && <span>
                            {(ele.reminder_type === 'order prescription' || ele.reminder_type === 'make appointment') ?
                              ` will be sent ${moment(ele.reminder_time).format('DD/MM/YYYY')}` :
                              ` will be sent ${moment(ele.reminder_time).format('HH:MM')}`
                            }
                          </span>
                          }
                        </Box>
                      </Grid>
                    </Grid>
                  </Typography>


                  {(ele.active === true && (ele.reminder_type === 'order prescription' || ele.reminder_type === 'make appointment') &&
                    <>
                      <TextField
                        id={`input_${ele.reminder_type}`}
                        label={ele.reminder_type === 'order prescription' ? 'How many days medicine do you have?' : 'How many prescription repeats are left'}
                        name={ele.reminder_type}
                        type='number'
                        required
                        helperText={ele.reminder_type === 'order prescription' ? 'Not including today' : ''}
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => calcReminderDue(e)}
                      />
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                      >
                        Update {ele.reminder_type} reminder
                      </Button>
                    </>
                  )}
                </form>
              </Grid>
            )
          })}


        </div>
      </ThemeProvider>
    </Container>
  )
}

export default EditReminder