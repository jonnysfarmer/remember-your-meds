import React, { useState, useEffect } from 'react'
import moment from 'moment'
//Material UI
import { Typography, Grid, Switch, Paper, TextField, Box, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
//Material UI our styles/icons
import { useStyles } from '../../styles/styles'
//Our functions
import SwitchReminder from './SwitchReminder'
import updateReminder from './UpdateReminder'


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


const ReminderAppt = (props) => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [adjustment, setAdjustment] = useState() //for capturing the input from the form field

  //===== SET DATA FOR THIS REMINDER TYPE
  const setInitialData = () => {
    if (props.length === 0) {
      console.log('waiting for data')
    } else {
      setData(props.props.filter(ele => ele.reminder_type === 'make appointment'))
    }
  }

  //===== ON FIELD CHANGE, CAPTURE ENTRY
  const handleChange = (e) => {
    setAdjustment(e.target.value)
  }

  //===== CALCULATE REMINDER DATES FOR ORDERING
  const calculateDates = () => {
    //calculate the due and reminder times
    const startdate = moment().format() //'now'
    const daysBefore = 14 //number of days before due that we will send reminder
    const dosesOnPrescription = data[0].prescription.number_days_doses //number of doses on a normal prescription
    const dueTime = moment(startdate).add(adjustment * dosesOnPrescription, 'd').format()
    const reminderTime = moment(startdate).add(adjustment * dosesOnPrescription, 'd').subtract(daysBefore, 'd').format()
    
    //update our data
    const newData = [...data]
    //there is only one reminder for ordering, so it is always position 0 of array
    newData[0].due_time = dueTime
    newData[0].reminder_time = reminderTime
    return newData
  }

  //===== SUBMIT UPDATES
  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = calculateDates(e)
    updateReminder(submitData[0].id, submitData[0])
    setData(submitData)
  }

  //===== USE EFFECT
  useEffect(() => setInitialData(), [props])

  //===== UI
  if (data === []) return <div>loading</div>
  return (
    data.map((ele, i) => {
      return (
        <form className={classes.form} id={ele.id} onSubmit={(e) => handleSubmit(e)} key={i}>
          <Paper className={classes.reminderFormPaper}>
            <Typography component='h2' variant='h6' className={classes.capitalize}>
              {ele.reminder_type}
            </Typography>
            <Typography component="div" variant="caption" color="textSecondary" key={i}>
              <Grid component="label" container alignItems="flex-start" justify='flex-start' spacing={0}>
                <Grid item>
                  <SwitchOnOFF
                    id={'switch_' + ele.id}
                    checked={ele.active}
                    size="small"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name='active'
                    onChange={(e => setData(SwitchReminder(e, i, data)))}
                  />
                </Grid>
                <Grid item >
                  <Box className={classes.boxdisplay}>
                    Reminder {ele.active === true ? ` will be sent ${moment(ele.reminder_time).format('DD/MM/YYYY')}` : 'inactive'}
                  </Box>
                </Grid>
              </Grid>
            </Typography>

            {ele.active === true &&
              <div className={classes.reminderForm}>
                <TextField
                  id={`input_${ele.reminder_type}`}
                  label='How many repeats do you have left?'
                  name={ele.reminder_type}
                  type='number'
                  required
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  onChange={(e) => handleChange(e)}
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
              </div>
            }
          </Paper>
        </form>
      )
    })
  )
}

export default ReminderAppt