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
  const [data, setData] = useState(formData)
  const [err, setErrors] = useState({})

  // //get the list of medicines so we can fill out the autocomplete field (refactor this out I think)
  
  const medicineList = () => {
    
  }
  const getMedicines = () => {
    const [medicine, setMedicine] = useState([])
    axios.get('/api/medicines/')
      .then(resp => setMedicine(resp.data))
      .catch(err => setErrors(err))
  }

  const formData = {
    number_doses: '',
    doses_per_day: '',
    number_repeats: ''
  }


  

  

  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value })
  //   setErrors({})
  //   console.log(data)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    // axios.post('/api/register/', registerInfo)
    //   .then(() => console.log('registered'))
    //   .catch((err) => {
    //     setErrors(err.response.data)
    //     // console.log(err.response.data.password)
    //   })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PrescriptionIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Prescription
        </Typography>

        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
          

            <Autocomplete
              id="medicine"
              options={getMedicines()}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <TextField {...params}
                  error={err.medicine && true}
                  variant="outlined"
                  required
                  fullWidth
                  label={err.username ? 'Error' : 'Medicine name'}
                  name="medicine"
                  helperText={err.medicine}
                // onChange={(e) => handleChange(e)}
                />
              )}
            />




            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
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