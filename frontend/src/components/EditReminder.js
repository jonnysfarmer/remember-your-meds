import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
//Material UI
import { Divider, Container, CssBaseline, Avatar, Typography, Grid, Switch, TextField, Box, Button } from '@material-ui/core'
import { makeStyles, withStyles, ThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
//Material UI our styles/icons
import { theme } from '../styles/styles'
import { ReminderIcon } from '../styles/icons'

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
  }
}))
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

  const [editing, setEditing] = useState() //determines whether data collection fields are visible or not
  const [number, setNumber] = useState() //only used in this component for calculating dates
  const [data, setData] = useState() //data to save to reminders in db
  const [reminders, setReminders] = useState([]) //place to store data retrieved from db
  const [medicineName, setMedicineName] = useState() //used to display medicine name without having to make more api calls
  const [errors, setErrors] = useState()

  //===== SET CUSTOM CONTENT 
  //----- Set the days (order, appt) or time (take) to count back for creating when we send reminders
  const remOrder = 7 //days
  const remAppt = 14 //days
  const remTake = 15 //min


  //===== GET REMINDER INFO
  // can I call a getReminderHook here?
  const reminderHook = () => {
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => setReminders(resp.data.filter(ele => ele.prescription.id === parseInt(props.match.params.id))))
      .catch(err => setErrors(err.response.data))
  }

  //===== SET INITIAL DATA THAT IS CONSTANT
  const setInitialData = () => {
    console.log('init', reminders)
    if (reminders.length === 0) { console.log('waiting for data') } else {
      setData({
        ['user']: reminders[0].user.id,
        ['prescription']: reminders[0].prescription.id,
        ['medicine']: reminders[0].prescription.medicine.id
      })
      setMedicineName(reminders[0].prescription.medicine.name)
    }
  }

  //===== STORE ACTIVE STATE
  //this tells the component whether to make the form visible or not
  //it also update the 'active' field in our dataset
  const handleActive = (editState) => {
    console.log(editState)
    if (editState === true) {
      setEditing(true)
    } else {
      setEditing(false)
    }
  }

  //===== STORE DOSE/NUMBER VALUE     
  const handleChange = (e) => {
    setNumber(e.target.value)
    setErrors({})
  }

  //==== CALCULATE REMINDER DUE
  const calcReminderDue = (e) => {
    //----- start with today's date
    const startdate = moment().format() //'now'
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
    }
    //----- handle if reminder_date is less than today
  }

  //===== HANDLE TAKE REMINDERS
  const handleTake = (e) => {
    const time = e.target.value.split(':')
    setData({
      ...data,
      ['due_time']: moment().hours(time[0]).minutes(time[1]).format()
    })
  }

  //===== UPDATE REMINDER
  function updateReminder(id) {
    console.log(data)
    console.log('putting')
    axios.put(`/api/reminders/${id}/`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
  }

  //===== MAKE REMINDER
  function makeReminder() {
    console.log('posting')
    //----- POST to /reminder
    axios.post('/api/reminders/', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => console.log(resp))
      .catch((err) => {
        setErrors(err.response.data)
        console.log(errors)
      })
  }


  //==== SUBMIT DATA
  const handleSubmit = (e) => {
    e.preventDefault()
    //----switch data to non editing mode
    setEditing(false)
    //decide whether this is a create or an update and call appropriate api function
    if (!e.target.id) {
      makeReminder()
    } else {
      setData({ ...data, ['id']: e.target.id })
      updateReminder(e.target.id)
    }
  }



  //===== USE EFFECT
  useEffect(() => {
    reminderHook()
  }, [])
  useEffect(() => setInitialData(), [reminders])
  console.log('editpage', reminders)

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

                  <Typography component="div" variant="caption" color="textSecondary">
                    <Grid component="label" container alignItems="flex-start" spacing={0}>
                      <Grid item>
                        <SwitchOnOFF
                          size="small"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                          name='active'
                          value={ele.active}
                          onChange={(e) => {
                            handleActive(ele.active)
                            setData({ ...data, ['active']: ele.active = !ele.active })
                          }}
                        />
                      </Grid>
                      <Grid item >
                        <Box className={classes.boxdisplay}>
                          Reminder {ele.active === false && 'inactive'}
                          {ele.active === true && ` will be sent on ${moment(ele.reminder_time).format('DD/MM/YYYY')}`}
                        </Box>
                      </Grid>
                    </Grid>
                  </Typography>

                  {(editing === true && ele.reminder_type !== 'take') &&
                    <>
                      <TextField
                        id={`input_${ele.reminder_type}`}
                        label={ele.reminder_type === 'order prescription' ? 'How many days do you have left?' : 'How many repeats do you have left?'}
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
                        Save reminder
                      </Button>
                    </>
                  }

                  {(editing === true && ele.reminder_type === 'take') &&
                    <>
                      <TextField
                        id='input_take_am'
                        label='Set morning reminder'
                        name='take'
                        helperText='Leave blank if you do not take in the morning'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        type='time'
                        onBlur={(e) => handleTake(e)}
                      >
                      </TextField>
                      <TextField
                        id='input_take_mid'
                        label='Set midday reminder'
                        name='take'
                        helperText='Leave blank if you do not take in the middle of the day'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        type='time'
                        onBlur={(e) => handleTake(e)}
                      >
                      </TextField>
                      <TextField
                        id='input_take_pm'
                        label='Set evening reminder'
                        name='take'
                        helperText='Leave blank if you do not take in the evening'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        type='time'
                        onBlur={(e) => handleTake(e)}
                      >
                      </TextField>
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                      >
                        Save reminder
                      </Button>
                    </>
                  }
                </form>
              </Grid>
            )
          })}


        </div>
      </ThemeProvider >
    </Container >
  )
}

export default EditReminder