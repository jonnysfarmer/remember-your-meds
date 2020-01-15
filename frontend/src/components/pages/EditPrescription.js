import React, { useState, useEffect } from 'react'
import axios from 'axios'
//Material UI
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Grid } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ThemeProvider } from '@material-ui/core/styles'
//Material UI our styles/icons
import { useStyles, theme } from '../../styles/styles'
import { PrescriptionIcon } from '../../styles/icons'
//Our Libraries/Components
import Auth from '../../lib/auth'

const EditPrescription = (props) => {

  const classes = useStyles()

  const [medicine, setMedicine] = useState([])
  const [data, setData] = useState({})
  const [currentMed, setCurrentMed] = useState({})
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

  //== Get current prescription info
  const getPrescriptionInfo = () => {
    const id = props.match.params.id
    axios.get(`/api/prescriptions/${id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        const data = resp.data
        setCurrentMed(data.medicine)
        setData(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }

  //===== STORE FORM FIELD VALUES
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({})
  }

  //===== SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault()
    const id = props.match.params.id
    // checks if the medicine is currently in our database
    const nhsmed = medicine.filter(ele => ele.name === data.medicine)
    // if it is, then we get the id, and add it as a prescription
    if (nhsmed.length === 1) {
      const updatedData = { 'medicine': nhsmed[0].id, 'number_days_doses': data.number_days_doses, 'number_repeats': data.number_repeats }
      axios.put(`/api/prescriptions/${id}/`, updatedData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        //----- Open the prescription view page for this prescription
        .then((resp) => {
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
          axios.post(`/api/prescriptions/${id}/`, updatedData, {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
          })
            //----- Open the prescription view page for this prescription
            .then((resp) => {
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
  const handleReturn = (e) => {
    e.preventDefault()
    const id = props.match.params.id
    props.history.push(`/prescriptions/${id}`)
  }


  //===== LOAD MEDICINE LIST
  useEffect(() => {
    getMedicines()
    getPrescriptionInfo()
  }, [])

  if (data === {} || currentMed === {}) return <div>loading</div>
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PrescriptionIcon />
        </Avatar>
        <Typography component='h1' variant='h4'>
          Edit Prescription
        </Typography>

        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <ThemeProvider theme={theme}>
            <Autocomplete
              freeSolo
              id='medicine'
              options={medicine.map(option => option.name)}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleChange(e)}
              value={currentMed.name || ''}
              renderInput={params => (
                <TextField {...params}
                  label='Medicine name'
                  type='text'
                  required
                  error={err.name && true}
                  helperText={err.name}
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
              value={data.number_days_doses || ''}
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
              value={data.number_repeats || ''}
            />
          </ThemeProvider>
          <Grid container spacing={2} >
            <Grid item xs={6} className={classes.centeralign} >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitgrey}
                onClick={(e) => handleReturn(e)}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitsmall}
              >
                Save
              </Button>
            </Grid>
          </Grid>

        </form>
      </div>
    </Container>
  )
}

export default EditPrescription