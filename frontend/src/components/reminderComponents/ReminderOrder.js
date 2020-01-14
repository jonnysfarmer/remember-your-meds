import React, { useState, useEffect } from 'react'
import moment from 'moment'
//Material UI
import { Container, CssBaseline, Avatar, Typography, Grid, Switch, TextField, Box, Button } from '@material-ui/core'
import { withStyles, ThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
//Material UI our styles/icons
import { useStyles } from '../../styles/styles'





const ReminderTake = (props) => {

  const [data, setData] = useState([])

  const setInitialData = () => {
    //----- Store it by reminder type
    if (props.length === 0) {
      console.log('waiting for data')
    } else {
      setData(props.props.filter(ele => ele.reminder_type === 'order prescription'))
    }
  }


  //===== USE EFFECT
  useEffect(() => setInitialData(), [props])

  //===== UI
  if (data === []) return <div>loading</div>
  return (
    <>
      <div>{data.map((ele, i) => {
        console.log(ele)
        return (
          <p key={i}>{ele.id}</p>
        )
      })}</div>
    </>
  )
}

export default ReminderTake