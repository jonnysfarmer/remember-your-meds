import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
//Material UI
import { Typography, Grid, Switch, Paper, TextField, Button } from '@material-ui/core'
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


const ReminderTake = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [data, setData] = useState([])
  const [active, setActive] = useState([])

  //===== SET DATA FOR THIS REMINDER TYPE
  const setInitialData = () => {
    if (props.length === 0) {
      console.log('waiting for data')
    } else {
      setData(props.props.filter(ele => (ele.reminder_type === 'take-am' || ele.reminder_type === 'take-mid' || ele.reminder_type === 'take-pm')))
    }
  }

  function setActiveState() {
    if (data.length === 0) {
      console.log('waiting for data')
    } else {
      setActive(data[0].active === true || data[1].active === true || data[2].active === true) ? true : false
    }
  }
  console.log(active)

  //===== ON FIELD CHANGE, CAPTURE ENTRY
  const handleChange = (e) => {
    //format our time
    const time = e.target.value.split(':')
    //get the id as a number
    const split = e.target.id.split('_')
    const id = parseInt(split[1])
    //get data to change of that id
    const tempData = [...data]
    const i = tempData.findIndex(item => item.id === id)
    //update the data
    tempData[i].reminder_time = moment().hours(time[0]).minutes(time[1]).seconds(0).format()
    setData(tempData)
  }

  //===== SUBMIT UPDATES
  const handleSubmit = (e) => {
    e.preventDefault()
    updateReminder(data)
    history.push('/prescriptions')
  }

  //===== USE EFFECT
  useEffect(() => setInitialData(), [props])
  useEffect(() => setActiveState(), [data])


  //===== UI
  if (data === []) return <div>loading</div>
  return (
    <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
      <Paper className={classes.reminderFormPaper}>
        <Typography component='h2' variant='h6' className={classes.capitalize}>
          Take Medicine
        </Typography>
        {data.map((ele, i) => {
          return (
            <div key={i}>
              <Typography component="div" variant="caption" color="textSecondary">
                <Grid component="label" container alignItems="center" justify='flex-start' spacing={0}>
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
                  <Grid item>
                    Reminder {ele.active === true ? ' active at ' : ' inactive'}
                  </Grid>
                  <Grid item>
                    {ele.active === true &&
                      <TextField
                        className={classes.reminderInlineField}
                        id={`take_${ele.id}`}
                        name={`take_${ele.id}`}
                        type='time'
                        variant='outlined'
                        value={moment(ele.reminder_time).format('HH:mm')}
                        onChange={(e) => handleChange(e)}
                      />
                    }
                  </Grid>
                </Grid>
              </Typography>
            </div>
          )
        })}
        {active === true &&
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Save reminders to take
          </Button>
        }
      </Paper>
    </form>
  )
}
export default ReminderTake