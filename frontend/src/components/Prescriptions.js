import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import LocalPharmacyOutlinedIcon from '@material-ui/icons/LocalPharmacyOutlined'
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles'


import { useStyles, theme } from '../styles/styles'

import axios from 'axios'
import Auth from '../lib/auth'
import DisplayPrescriptions from './DisplayPrescriptions'


const Prescriptions = () => {

  const classes = useStyles()

  const [data, setData] = useState([])
  const [errors, setErrors] = useState([])

  // api/reminders/users/

  const dataHook = () => {
    axios.get('/api/prescriptions/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        setData(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }

  useEffect(dataHook, [])

  // console.log(data)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocalPharmacyOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          My Prescriptions
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create new Prescription
        </Button>
        {data.map((ele, i) => {
          return (
            <DisplayPrescriptions key={i} data={ele} medicine={ele.medicine} presID={ele.id} />
          )
        })}

      </div>
    </Container>
  )

}

export default Prescriptions