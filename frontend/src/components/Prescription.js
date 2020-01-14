import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import { PrescriptionIcon } from '../styles/icons'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'





// import { useStyles, theme } from '../styles/styles'

import axios from 'axios'
import Auth from '../lib/auth'



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
    color: '#000',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  title: {
    color: theme.palette.success.main
  },
  grid: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
    // margin: 'auto'
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    width: '100%'
  },
  centeralign: {
    alignItems: 'center',
    display: 'flex'
  },
  altinput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  altsubmit: {
    margin: theme.spacing(1, 0, 2),
    color: '#000',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  submitgrey: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  },
  submitred: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.secondary
    }
  },
  avatargrey: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.success.main
  },
  noPadding: {
    padding: 0
  }
}))

const Prescription = (props) => {

  const classes = useStyles()
  const history = useHistory()


  const [prescription, setPrescription] = useState({})
  const [medicine, setMedicine] = useState({})
  const [reminders, setReminders] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([])



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
        const threeReminders = specific.filter(ele => ele.reminder_type === 'take-am' || ele.reminder_type === 'order prescription' || ele.reminder_type === 'make appointment')
        setReminders(threeReminders)

      })
      .catch(err => setErrors(err.response.data))
  }

  // got back to original page
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


  //=====NEED TO SORT OUT THE LINK, REACT ROUTER OR MATERIAL UI

  if (medicine === {}) return <div>loading</div>
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PrescriptionIcon />
        </Avatar>
        <Typography component="h1" variant="h4" >
          {medicine.name}
        </Typography>
        <Typography component="h3" variant="subtitle1" className={classes.title}>
          <Link href={medicine.url} color="inherit">
            NHS Information
          </Link>
        </Typography>
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
          Number of doses a day
        </Typography>
        <Typography component="h1" variant="subtitle1" color="textSecondary">
          {prescription.number_days_doses}
        </Typography>
        <Typography component="h2" variant="h6">
          Repeats until appointment
        </Typography>
        <Typography component="h1" variant="subtitle1" color="textSecondary">
          {prescription.number_repeats}
        </Typography>
        <Typography component="h2" variant="h6">
          Reminders
        </Typography>
        <div className={classes.root}>
          {reminders ?
            reminders.map((ele, i) => {
              return (

                <Paper className={classes.grid} key={i}>
                  <Grid container spacing={2} >
                    <Grid item xs={10} className={classes.centeralign} >
                      <Typography component="h3" variant="subtitle2" color="textSecondary" >
                        {(ele.reminder_type === 'order prescription' || ele.reminder_type === 'make appointment') ? `${ele.reminder_type}: ` : 'take medicine: '}
                        {ele.active === false ? ' inactive' : ' '}
                        {((ele.reminder_type === 'order prescription' && ele.active === true) || (ele.reminder_type === 'make appointment' && ele.active === true)) && moment(ele.reminder_time).format('DD/MM/YYYY')}
                        
                        {((ele.reminder_type === 'take-am' && ele.active === true) ||
                        (ele.reminder_type === 'take-mid' && ele.active === true) ||
                        (ele.reminder_type === 'take-pm' && ele.active === true))
                        && ' reminders active' }
                      </Typography>
                    </Grid>
<<<<<<< HEAD
                    <Grid item>
                      <IconButton className={classes.noPadding}>
                      <Avatar className={classes.avatargrey} onClick={()=>editclick()} >
=======
                    <Grid item> 
                      <Avatar className={classes.avatargrey} onClick={() => editclick()} >
>>>>>>> development
                        <EditOutlinedIcon fontSize="small" />
                      </Avatar>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              )
            }) :
            <div className={classes.altinput}>
              <Typography component="h1" variant="subtitle1" color="textSecondary">
                You currently have no reminderes
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.altsubmit}
              // onClick here to edit page
              >
                Add new reminder
              </Button>
            </div>
          }
        </div>
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
              color="secondary"
              className={classes.submitred}
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>

      </div>
    </Container>
  )

}

export default Prescription