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

const CreatePrescription = (props) => {

  const classes = useStyles()

  const [medicine, setMedicine] = useState([])
  const [data, setData] = useState()
  const [err, setErrors] = useState({})

  //===== GET THE MEDICINE LIST TO POPULATE AUTOCOMPLETE
  const getMedicines = () => {
    axios.get('/api/medicines/')
      .then(resp => setMedicine(resp.data))
      .catch(err => setErrors(err))
  }

  //===== CREATE A CUSTOM MEDICINE IN OUR DB
  const createMedicine = (x) => {
    console.log(x)
    //----- Post to medicine table
    axios.post('/api/medicines/', x, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      //----- Receive it's ID and update our data to hold id rather than name
      .then((response) => setData({ ...data, ['medicine']: response.data.id }))
      .catch((err) => {
        setErrors(err.response.data)
      })
  }

  //===== STORE FORM FIELD VALUES
  const handleChange = (e) => {
    //----- Check if data is from medicine field
    if (e.target.id.substring(0, 3) === 'med') {
      //----- If it DOES NOT have a value, then the user has selected a medicine from our list
      if (!e.target.value) {
        //----- splits the ID :: MaterialUI appends our id with the index number of the option created (in the select dropdown)
        const fieldId = e.target.id.split('-')
        //----- the value in position 2 of the split ID contains the index, we use that to get the medicine.id from our list
        const med = (medicine[fieldId[2]].id)
        //----- set our form data grab to be our medicine.id
        setData({ ...data, ['medicine']: med })
      } else {
      //----- If it HAS a value then it is not from our NHS list and we must create it
        createMedicine({ ['name']: e.target.value })
      }
    } else {
    //----- If it is not the medicine field, we catch what the user wrote and add it to our form data as normal
      setData({ ...data, [e.target.name]: e.target.value })
      setErrors({})
    }
  }

  //===== SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault()
    //----- Add the user.id to our form data
    const user = Auth.getUserId()
    setData({ ...data, ['user']: user })
    //----- POST to /prescription
    axios.post('/api/prescriptions/', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      //----- Open the prescription view page for this prescription
      .then((resp) => props.history.push(`/prescriptions/${resp.data.id}/`))
      .catch((err) => {
        setErrors(err.response.data)
      })
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
          Prescription
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

export default CreatePrescription