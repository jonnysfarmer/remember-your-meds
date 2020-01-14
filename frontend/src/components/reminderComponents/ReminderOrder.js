import React, { useState, useEffect } from 'react'
import moment from 'moment'
//Material UI
import { Container, CssBaseline, Avatar, Typography, Grid, Switch, TextField, Box, Button } from '@material-ui/core'
import { withStyles, ThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
//Material UI our styles/icons
import { useStyles } from '../../styles/styles'
//Our functions
import SwitchReminder from './SwitchReminder'


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

  const [data, setData] = useState([])

  const setInitialData = () => {
    //----- Store just the data for this components reminder type
    if (props.length === 0) {
      console.log('waiting for data')
    } else {
      setData(props.props.filter(ele => ele.reminder_type === 'order prescription'))
    }
  }


  //===== USE EFFECT
  useEffect(() => setInitialData(), [props])
  console.log(data)

  //===== UI
  if (data === []) return <div>loading</div>
  return (
    <>
      <div>{data.map((ele, i) => {
        console.log(ele)
        return (
          <div key={i}>

            <SwitchOnOFF
              id={'switch_' + ele.id}
              checked={ele.active}
              size="small"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              name='active'
              onChange={(e => setData(SwitchReminder(e, i, data)))}
            />


          </div>
        )
      })}
      </div>
    </>
  )
}

export default ReminderTake