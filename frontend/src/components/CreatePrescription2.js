import React, { useState, useEffect } from 'react'
import axios from 'axios'
//Material UI
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { ThemeProvider } from '@material-ui/core/styles'
//Material UI our styles/icons
import { useStyles, theme } from '../styles/styles'
import { PrescriptionIcon } from '../styles/icons'
//Our Libraries/Components
import Auth from '../lib/auth'
import moment from 'moment'




const CreatePrescription2 = (props) => {

  const classes = useStyles()

  const [medicine, setMedicine] = useState([])
  const [data, setData] = useState()
  const [err, setErrors] = useState({})

  //===== GET THE MEDICINE LIST TO POPULATE AUTOCOMPLETE
  const getMedicines = () => {
    axios.get('/api/medicines/')
      .then(resp => {
        const allmeds = resp.data
        const nhsmeds = allmeds.filter(ele => ele.url)
        setMedicine(nhsmeds)
      })
      .catch(err => setErrors(err))
  }

  // POST 5 reminders for a preset at this specific time

  const postReminders = (presID) => {
    const reminderArray = [
      {
        'prescription': presID,
        'reminder_type': 'take-am',
        'due_time': moment().format(),
        'reminder_time': moment().format()
      },
      {
        'prescription': presID,
        'reminder_type': 'take-mid',
        'due_time': moment().format(),
        'reminder_time': moment().format()
      },
      {
        'prescription': presID,
        'reminder_type': 'take-pm',
        'due_time': moment().format(),
        'reminder_time': moment().format()
      },
      {
        'prescription': presID,
        'reminder_type': 'order prescription',
        'due_time': moment().format(),
        'reminder_time': moment().format()
      },
      {
        'prescription': presID,
        'reminder_type': 'make appointment',
        'due_time': moment().format(),
        'reminder_time': moment().format()
      }
    ]
    reminderArray.map((ele) => {
      axios.post('/api/reminders/', ele, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .catch(err => console.log(err.response.data))
    })

  }


  //===== STORE FORM FIELD VALUES
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({})
  }

  console.log(data)
  //===== SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault()
    // checks if the medicine is currently in our database
    const nhsmed = medicine.filter(ele => ele.name === data.medicine)
    // if it is, then we get the id, and add it as a prescription
    if (nhsmed.length === 1) {
      const updatedData = { 'medicine': nhsmed[0].id, 'number_days_doses': data.number_days_doses, 'number_repeats': data.number_repeats }
      axios.post('/api/prescriptions/', updatedData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        //----- Open the prescription view page for this prescription
        .then((resp) => {
          postReminders(resp.data.id)
          props.history.push(`/prescriptions/${resp.data.id}/`)
        })
        .catch((err) => {
          setErrors(err.response.data)
        })
    } else {
      const newMed = { 'name': data.medicine }
      // this posts new med into the database first
      axios.post('/api/medicines/', newMed, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then((resp) => {
          //gets the resppnse, and posts this to the prescription page using new ID
          const updatedData = { 'medicine': resp.data.id, 'number_days_doses': data.number_days_doses, 'number_repeats': data.number_repeats }
          axios.post('/api/prescriptions/', updatedData, {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
          })
            //----- Open the prescription view page for this prescription
            .then((resp) => {
              postReminders(resp.data.id)
              props.history.push(`/prescriptions/${resp.data.id}/`)
            })
            .catch((err) => {
              setErrors(err.response.data)
            })
        })
        .catch((err) => {
          setErrors(err.response.data)
        })
    }
  }


  //===== LOAD MEDICINE LIST
  useEffect(() => {
    getMedicines()
    //the empty array below ensure this runs only at on mount
  }, [])

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PrescriptionIcon />
        </Avatar>
        <Typography component='h1' variant='h4'>
          Prescription 2
        </Typography>

        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
            <Autocomplete
              freeSolo
              id='medicine'
              options={medicine.map(option => option.name)}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleChange(e)}
              renderInput={params => (
                <TextField {...params}
                  label='Medicine name'
                  type='text'
                  required
                  error={err.medicine && true}
                  helperText={err.medicine}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  name="medicine"
                />
              )}
            />
            <TextField
              id='number_days_doses'
              label='Number of days doses on prescription'
              name='number_days_doses'
              type='number'
              required
              error={err.number_presc_doses && true}
              helperText={'e.g. if you take 3 tablets per day, that is 1 days dose'}
              variant='outlined'
              fullWidth
              margin='normal'
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id='number_repeats'
              label='Number of prescription repeats'
              name='number_repeats'
              type='number'
              required
              error={err.number_presc_doses && true}
              // helperText={}
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
              Add prescription
            </Button>
          </ThemeProvider>
        </form>
      </div>
    </Container>
  )
}

export default CreatePrescription2