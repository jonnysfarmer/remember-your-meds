import React, { useState, useEffect } from 'react'
import axios from 'axios'
//Material UI Styling
import { Button, CssBaseline, Typography, Container, Avatar } from '@material-ui/core'
//Material UI our styles/icons
import { useStyles } from '../../styles/styles'
import { PrescriptionIcon } from '../../styles/icons'
//Our components
import Auth from '../../lib/auth'
import DisplayPrescriptions from '../DisplayPrescriptions'

const Prescriptions = (props) => {

  const classes = useStyles()

  const [data, setData] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([])

  //===== API get user information
  const dataHook = () => {
    axios.get('/api/prescriptions/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        setData(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }
  //===== API create prescription
  const handleCreate = (e) => {
    e.preventDefault()
    props.history.push('/prescriptions/create/')
  }

  //===== USE EFFECTS
  useEffect(dataHook, [])

  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PrescriptionIcon />
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
          onClick = {(e)=>handleCreate(e)}
        >
          New Prescription
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