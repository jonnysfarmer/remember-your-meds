import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Box from '@material-ui/core/Box'
import { red, green } from '@material-ui/core/colors'

import Auth from '../../lib/auth'

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



const EditOrderReminder = (props) => {

  const classes = useStyles()

  const [editing, setEditing] = useState() //determines whether data collection fields are visible or not
  const [doses, setDoses] = useState() //only used in this component for calculating dates
  const [data, setData] = useState() //data to save to reminders
  const [errors, setErrors] = useState()

  //===== INITIATE DATA FROM PROPS
  const setDataFromProps = () => {
    // console.log('editloading', props.props.propsData)
    setData({
      ...props.props.propsData,
      ['user']: Auth.getUserId(),
      ['doctor']: '' //setting to null unless we implement doctor
    })
  }

  //===== STORE ACTIVE STATE
  const handleActive = () => {
    const remState = (data.active = !data.active)
    setData({ ...data, ['active']: remState })
    if (remState === true) {
      setEditing(true)
    } else {
      setEditing(false)
    }
  }

  //===== STORE DOSE VALUE     
  const handleChange = (e) => {
    setDoses(e.target.value)
    setErrors({})
  }

  //==== CALCULATE REMINDER DUE
  const calcReminderDue = () => {
    //----- start with today's date
    const startdate = moment().format() //'now'
    //----- add to it the number of doses user has remaining (due_date)
    const dueDate = moment(startdate).add(doses, 'd').format()
    //----- subtract from that 7 days as we will notify them 7 days in advance (reminder_date)
    const reminderDate = moment(dueDate).subtract(7, 'd').format()

    //----- handle if reminder_date is less than today
   
    //---- set data in our object
    setData({
      ...data,
      ['due_time']: dueDate,
      ['reminder_time']: reminderDate
    })
  }

  //===== UPDATE REMINDER
  function updateReminder() {
    axios.put(`/api/reminders/${data.id}/`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
  }

  //===== MAKE REMINDER
  function makeReminder() {
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
    //----calculate the dates
    setEditing(false)
    //decide whether this is a create or an update and call appropriate api function
    !data.id ? makeReminder() : updateReminder()
  }



  //===== USE EFFECT
  useEffect(() => {
    setDataFromProps()
  }, [props])
  // console.log('editpage', data)

  if (!data) return <div>loading</div>
  return (
    <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
      <Typography component='h2' variant='h6'>
        Order a prescription
      </Typography>

      <Typography component="div" variant="caption" color="textSecondary">
        <Grid component="label" container alignItems="center" spacing={0}>
          <Grid item>
            <SwitchOnOFF
              size="small"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              name='active'
              value={data.active}
              onChange={e => handleActive(e)}
            />
          </Grid>
          <Grid item>
            <Box className={classes.boxdisplay}>
              Reminder to order {data.active === false && 'inactive'}
              {data.active === true && ' will be sent on '} {data.reminder_time && <span>{moment(data.reminder_time).format('DD/MM/YYYY')}</span>}
            </Box>
          </Grid>
        </Grid>
      </Typography>

      {editing === true && <>
        <TextField
          id='days_doses_remaining'
          label='How many days doses do you have left?'
          name='days_doses_remaining'
          type='number'
          required
          helperText={'not including today\'s'}
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


    </form>

  )
}

export default EditOrderReminder