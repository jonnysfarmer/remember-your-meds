import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
// import Link from '@material-ui/core/Link'
// import Box from '@material-ui/core/Box'
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { ThemeProvider } from '@material-ui/core/styles'
// import InputAdornment from '@material-ui/core/InputAdornment'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'
// import IconButton from '@material-ui/core/IconButton'

import { useStyles, theme } from '../styles/styles'
import { PrescriptionIcon } from '../styles/icons'

import axios from 'axios'
import { Divider } from '@material-ui/core'


const CreatePrescription = (props) => {

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

  //collecting and calculating medicine
  const formData = {
    //for the dB
    medicine: '',
    number_days_doses: '',
    number_repeats: '',
    //for calculations here
    number_days_doses_remaining: '' //number of days doses you have left at time of filling form
  }

  //standard form stuff
  const handleChange = (e) => {
    if (e.target.id.substring(0, 3) === 'med') {
      if (!e.target.value) {
        const fieldId = e.target.id.split('-')
        const med = (medicine[fieldId[2]].id)
        setData({ ...data, ['medicine']: med })
      } else {
        setData({ ...data, ['medicine']: e.target.value })
      }
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
      setErrors({})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    // axios.post('/api/register/', registerInfo)
    //   .then(() => console.log('registered'))
    //   .catch((err) => {
    //     setErrors(err.response.data)
    //     // console.log(err.response.data.password)
    //   })
  }

  //on mount
  useEffect(() => {
    getMedicines()
  }, [])


  console.log(data)
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PrescriptionIcon />
        </Avatar>
        {/* <Typography component='h1' variant='h4'>
          Prescription
        </Typography> */}

        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
            <Typography component='h2' variant='h5'>
              From your prescription:
            </Typography>
            <Divider />
            <Autocomplete
              freeSolo
              id='medicine'
              options={medicine.map(option => option.name)}
              onChange={(e) => handleChange(e)}
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

            <Typography component='h2' variant='h5'>
              In your cupboard:
            </Typography>
            <Divider />
            <TextField
              id='number_days_doses_remaining'
              label='How many days doses do you have left?'
              name='number_days_doses_remaining'
              type='number'
              required
              error={err.number_presc_doses && true}
              helperText={'do not include today'}
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
              Register
            </Button>

          </ThemeProvider>

        </form>
      </div>
    </Container>
  )
}

export default CreatePrescription