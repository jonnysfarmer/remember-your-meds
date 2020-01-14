import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { PrescriptionIcon } from '../styles/icons'

import axios from 'axios'
import Auth from '../lib/auth'
import DisplayPrescriptions from './DisplayPrescriptions'


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

const Prescriptions = (props) => {

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
  
  const handleCreate = (e) => {
    e.preventDefault()
    props.history.push('/prescriptions/create/')
  }

  useEffect(dataHook, [])

  console.log(errors)
  return (
    <Container component="main" maxWidth="xs">
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