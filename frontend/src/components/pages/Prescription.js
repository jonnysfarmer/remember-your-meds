import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
//Material UI
import { Button, CssBaseline, Typography, Container, Avatar, Grid, Paper, Link, Box, ThemeProvider } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import IconButton from '@material-ui/core/IconButton'
//Material UI our styles/icons
import { useStyles, theme } from '../../styles/styles'
import { PrescriptionIcon } from '../../styles/icons'
//Our Libraries/Components
import Auth from '../../lib/auth'

const Prescription = (props) => {

  const classes = useStyles()
  const history = useHistory()

  const [prescription, setPrescription] = useState({})
  const [medicine, setMedicine] = useState({})
  const [reminders, setReminders] = useState('')
  const [errors, setErrors] = useState([])
  const [takeReminder, setTakeReminder] = useState([])

  // PULLS THE INFO, seperates out the medicine and prescription info
  const prescriptionHook = () => {
    const id = props.match.params.id
    axios.get(`/api/prescriptions/${id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        const data = resp.data
        setMedicine(data.medicine)
        setPrescription(resp.data)
      })
      .catch(err => setErrors(err.response.data))
  }
  // pulls out all the reminders, and filters them for the specific prescription
  const reminderHook = () => {
    const id = parseInt(props.match.params.id)
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        const data1 = resp.data
        const specific = data1.filter(ele => ele.prescription.id === id)
        const takeReminderActive = specific.filter(ele => (ele.reminder_type === 'take-am' && ele.active === true) ||
        (ele.reminder_type === 'take-mid' && ele.active === true) ||
        (ele.reminder_type === 'take-pm' && ele.active === true))
        console.log(takeReminderActive)
        setTakeReminder(takeReminderActive)
        const threeReminders = specific.filter(ele => ele.reminder_type === 'take-am' || ele.reminder_type === 'order prescription' || ele.reminder_type === 'make appointment')
        setReminders(threeReminders)

      })
      .catch(err => setErrors(err.response.data))
  }

  //===== Send to right page
  const handleReturn = (e) => {
    e.preventDefault()
    history.push('/prescriptions/')
  }
  const editclick = () => {
    const id = parseInt(props.match.params.id)
    history.push(`/prescriptions/${id}/edit-reminders`)
  }
  // deletes prescription and pushes you back
  const handleDelete = (e) => {
    e.preventDefault()
    const id = props.match.params.id
    axios.delete(`/api/prescriptions/${id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => props.history.push('/prescriptions/'))
  }
  const pushEdit = () => {
    const id = parseInt(props.match.params.id)
    history.push(`/prescriptions/${id}/edit`)
  }

  useEffect(prescriptionHook, [])
  useEffect(reminderHook, [])

  if (medicine === {}) return <div>loading</div>
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ThemeProvider theme={theme}>
          <Avatar className={classes.avatar}>
            <PrescriptionIcon />
          </Avatar>
          <Typography component="h1" variant="h4" >
            {medicine.name}
          </Typography>
          {medicine.url && <Typography component="h3" variant="subtitle1" className={classes.inlineLink}>
            <Link href={medicine.url} color="inherit">
              NHS Information
          </Link>
          </Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => pushEdit()}
          >
            Edit Prescription
        </Button>
          <Typography component="h2" variant="h6" >
            Medication supply (days)
        </Typography>
          <Typography className={classes.inlineText}>
            {prescription.number_days_doses}
          </Typography>
          <Typography variant="h6" className={classes.inlineTitle}>
            Repeats until appointment
        </Typography>
          <Typography className={classes.inlineText}>
            {prescription.number_repeats}
          </Typography>
          <Typography variant="h6" className={classes.inlineTitle}>
            Reminders
        </Typography>
          <div className={classes.root}>
            {reminders ?
              reminders.map((ele, i) => {
                return (

                  <Paper className={classes.paperCard} key={i}>
                    <Grid container spacing={2} >
                      <Grid item xs={10} className={classes.centeralign} >
                        <Typography component="h2" variant="subtitle2" color="textSecondary"  >
                          {(ele.reminder_type === 'order prescription' || ele.reminder_type === 'make appointment') ? `${ele.reminder_type}: ` : 'take medicine: '}
                          {((ele.reminder_type === 'order prescription' && ele.active === false) || 
                          (ele.reminder_type === 'make appointment' && ele.active  === false ) ||
                          ele.active === false ||
                          takeReminder.length < 1 ) ? <Box component="span" className={classes.false} > inactive</Box> : ' '}
                          {((ele.reminder_type === 'order prescription' && ele.active === true) || (ele.reminder_type === 'make appointment' && ele.active === true)) && <Box component="span" className={ele.active === true ? classes.active : classes.false} > {moment(ele.reminder_time).format('DD/MM/YYYY')} </Box>}

                          {((ele.reminder_type === 'take-am' && ele.active === true) ||
                            (ele.reminder_type === 'take-am' && ele.active === false && takeReminder.length >= 1))
                            && <Box component="span" className={classes.active} >  reminders active </Box>}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton edge="end" className={classes.noPadding} onClick={() => editclick()}>
                          <Avatar className={classes.avatargrey}  >
                            <EditOutlinedIcon fontSize="small" />
                          </Avatar>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                )
              }) :
              <div className={classes.altinput}>

              </div>
            }
          </div>
          <Grid container spacing={2} >
            <Grid item xs={6} className={classes.centeralign} >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // color="primary"
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
                color="secondary"
                className={classes.submitred}
                onClick={(e) => handleDelete(e)}
              >
                Delete
            </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </Container>
  )

}

export default Prescription