import React, { useState, useEffect } from 'react'
import axios from 'axios'
//Material UI
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider } from '@material-ui/core/styles'
//Material UI our styles/icons
import { useStyles, theme } from '../../styles/styles'
import { ReminderIcon } from '../../styles/icons'
//Our Components
import EditOrderReminder from './EditOrderReminder'
import Auth from '../../lib/auth'


const AddReminder = (props) => {
  //=====================================
  // This component handles the form fields for creating a reminder
  //=====================================

  const classes = useStyles()

  const [propsData, setPropsData] = useState({})
  const [prescription, setPrescription] = useState({})
  const [medicine, setMedicine] = useState({})
  const [errors, setErrors] = useState({})

  //===== INITIATE DATA FROM PROPS
  const setDataFromProps = () => {
    //----- check params for reminderId & reminderType & reminderStatus and set to null if there is none
    const remId = !props.location.state ? null : props.location.state.id
    const remType = !props.location.state ? null : props.location.state.reminder_type
    const remStatus = !props.location.state ? false : props.location.state.active
    //----- set user id from url, and reminder type as mull or reminderType as above
    setPropsData({
      id: remId,
      reminder_type: remType,
      active: remStatus
    })
  }

  //===== PRESCRIPTION INFO
  // can I call getPrescriptionHook here?
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

  

  //===== USE EFFECT
  useEffect(() => {
    setDataFromProps()
    prescriptionHook()
  }, [props])

  // console.log(propsData.reminderType)

  //===== UI
  if (propsData === []) return <div>loading</div>
  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />

        <ThemeProvider theme={theme}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ReminderIcon />
            </Avatar>
            <Typography component='h1' variant='h4'>
              Reminders
            </Typography>
            <p>for {medicine.name}</p>


            <EditOrderReminder props={{ propsData }} />


          </div>

        </ThemeProvider>
      </Container>
    </div>
  )
}


export default AddReminder