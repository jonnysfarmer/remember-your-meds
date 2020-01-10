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
    medicine: '',
    number_doses: '',
    number_presc_doses: '',
    doses_per_day: '',
    number_repeats: ''
  }

  //get number of days remaining now
  //use that to calculate when repeat reminder is due (doses left = 0 minus 7 days)

  //DONE get number of tablets (or doses) on prescription 
  //get the number of tablets (or doses) to take per day
  //store that in db for calculating next repeat reminder



  //standard form stuff
  const handleChange = (e) => {
    console.log('handling change')
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
        <Typography component='h1' variant='h4'>
          Prescription
        </Typography>

        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
            <Autocomplete
              freeSolo
              options={medicine.map(option => option.name)}
              renderInput={params => (
                <TextField {...params}
                  id='medicine'
                  label='Medicine name'
                  name='medicine'
                  type='text'
                  required
                  error={err.medicine && true}
                  helperText={err.medicine}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  onChange={(e) => handleChange(e)}
                />
              )}
            />

            <TextField
              id='dosesOnPresc'
              label='Number of days doses on prescription'
              name='dosesOnPresc'
              type='number'
              required
              error={err.number_presc_doses && true}
              helperText={'e.g. if you take 3 tablets per day, that is 1 days dose'}
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