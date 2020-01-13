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
  const [editState, setEditState] = useState() //used to determine whether to show or hide form fields or edit label
  const [errors, setErrors] = useState()



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
    const arr = []

    if (reminders.length === 0) {
      console.log('waiting for data')
    } else {
      setData({
        ['user']: reminders[0].user.id,
        ['prescription']: reminders[0].prescription.id,
        ['medicine']: reminders[0].prescription.medicine.id
      })
      setMedicineName(reminders[0].prescription.medicine.name)
      //set default edit state to false
      reminders.map(ele => {
        arr.push({ ['id']: ele.id, ['state']: false })
      })
      setEditState(arr)
    }
  }

  //==== CHANGE EDIT STATE
  const changeEditState = (e) => {
    console.log('changeeditstate')
    //get the reminder Id for this reminder
    const getId = e.target.id.split('_')
    //get the user from the array and update to true


    //set everything back to the editState


    // setEditState({ ...editState, ['id']: parseInt(getId[1], ['state']: true })
    // console.log(edit)

  }




  console.log('editstates', editState)

  //===== DEFINE FORM LABELS AND FIELD TYPES
  const defineFormFields = (e) => {

  }





  //===== STORE DOSE/NUMBER VALUE     
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
    }
    //----- handle if reminder_date is less than today
  }



  //===== UPDATE REMINDER
  function updateReminder(id) {
    console.log('putting', id, data)
    axios.put(`/api/reminders/${id}/`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
  }

  // //===== MAKE REMINDER
  // function makeReminder() {
  //   console.log('posting')
  //   //----- POST to /reminder
  //   axios.post('/api/reminders/', data, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then((resp) => console.log(resp))
  //     .catch((err) => {
  //       setErrors(err.response.data)
  //       console.log(errors)
  //     })
  // }


  //==== SUBMIT DATA
  const handleSubmit = (e) => {
    console.log('handlesubmit')
    e.preventDefault()
    //decide whether this is a create or an update and call appropriate api function
    // if (!e.target.id) {
    //   makeReminder()
    // } else {
    setData({ ...data, ['id']: e.target.id })
    updateReminder(e.target.id)
    // }
  }



  //===== USE EFFECT
  useEffect(() => {
    reminderHook()
  }, [])
  useEffect(() => {
    setInitialData(),
      defineFormFields()
  }, [reminders])

  // console.log(reminders)
  useEffect(() => setInitialData(), [reminders])
  useEffect(() => defineFormFields(), [reminders])

  // console.log(buttonState)

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
                          id={'switch_' + ele.id}
                          checked={ele.active}
                          size="small"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                          name='active'
                          // value={ele.active}
                          onChange={() => setData({ ...data, ['active']: ele.active = !ele.active })}
                          onChange={(e) => setData({ ...data, ['active']: ele.active = !ele.active })}
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

                  {(ele.active === true) &&
                    <>
                      <Grid item>
                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                          <Link
                            id={'edit_' + ele.id}
                            onClick={e => changeEditState(e)}>
                            Edit
                        </Link>
                        </Typography>
                      </Grid>
                      <TextField
                        id={`input_${ele.reminder_type}`}
                        label={ele.reminder_type}
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



                  {/* {buttonState === 'submit' &&
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='primary'
                          className={classes.submit}
                        >
                          Save reminder
                        </Button>
                      }
                      {buttonState === 'edit' &&
                        <Typography>
                          <a
                            onClick={setButtonState({ ['button']: 'submit' })}
                            type='edit'
                          >Edit reminder</a>
                        </Typography>
                      }
                    </> */}

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