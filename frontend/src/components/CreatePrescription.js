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



const CreatePrescription = () => {

  const classes = useStyles()
  const [medicine, setMedicine] = useState([])
  const [data, setData] = useState(formData)
  const [err, setErrors] = useState({})

  // //get the list of medicines so we can fill out the autocomplete field (refactor this out I think)
  const getMedicines = () => {
    axios.get('/api/medicines/')
      .then(resp => setMedicine(resp.data))
      .catch(err => setErrors(err))
  }

  //make a function to create a new medicine if needed (refactor this out)
  const createMedicine = (x) => {
    console.log(x)
    //post it to medicine db
    axios.post('/api/medicines/', x, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      //then update medicine to be the newly created id
      .then((response) => setData({ ...data, ['medicine']: response.data.id }))
      .catch((err) => {
        setErrors(err.response.data)
      })
  }

  //collecting and calculating medicine
  const formData = {
    //for the dB
    user: '',
    medicine: '',
    number_days_doses: '',
    number_repeats: '',
    doctor: ''
  }

  //standard form stuff
  const handleChange = (e) => {
    if (e.target.id.substring(0, 3) === 'med') {
      if (!e.target.value) {
        const fieldId = e.target.id.split('-')
        const med = (medicine[fieldId[2]].id)
        setData({ ...data, ['medicine']: med })
      } else {
        //create medicine on the database
        createMedicine({ ['name']: e.target.value })
        // setNewMedicine({ ['name']: e.target.value })
        setData({ ...data, ['medicine']: e.target.value })
      }
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
      setErrors({})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //add userid to data
    const user = Auth.getUserId()
    setData({ ...data, ['user']: user })

    //POST to prescription
    axios.post('/api/prescriptions/', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => console.log('added'))
      .catch((err) => {
        setErrors(err.response.data)
      })
  }



  //if medicine not in list
  // - POST to medicine
  // - GET id
  // - update data with medicine ID rather than text
  //when medicine has id (originally in list, or added)
  // - POST to prescription


  //on mount
  useEffect(() => {
    getMedicines()
  }, [])

  // console.log(data)


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