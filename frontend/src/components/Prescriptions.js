import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { green } from '@material-ui/core/colors'
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles'

import axios from 'axios'
import Auth from '../lib/auth'


const Prescriptions = () => {

  const [data, setData] = useState([])
  const [errors, setErrors] = useState([])

  const dataHook = () => {
    axios.get('/api/reminder/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => setData(resp.data))
      .catch(err => setErrors(err.response.data))
  }

  useEffect(dataHook, [])

  console.log(data)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h4">
        My Prescriptions
      </Typography>


    </Container>
  )

}

export default Prescriptions