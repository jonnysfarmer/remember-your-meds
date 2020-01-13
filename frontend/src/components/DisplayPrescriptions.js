import React, { useState, useEffect } from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Avatar from '@material-ui/core/Avatar'
import Switch from '@material-ui/core/Switch'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import { red, green } from '@material-ui/core/colors'




import axios from 'axios'
import Auth from '../lib/auth'

// import { makeStyles } from '../styles/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.success.main
  },
  boxdisplay: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.primary
  }

}))
const SwitchonOFF = withStyles({
  switchBase: {
    color: red[500],
    '&$checked': {
      color: green[500]
    },
    '&$checked + $track': {
      backgroundColor: green[500]
    },
    '& + $track': {
      backgroundColor: red[500]
    }
  },
  checked: {},
  track: {}
})(Switch)


const DisplayPrescriptions = ({ medicine, presID }, props) => {

  const history = useHistory()

  const [reminders, setReminder] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([])


  const dataHook = () => {
    axios.get('/api/reminders/user/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => {
        const data1 = resp.data
        const specific = data1.filter(ele => ele.prescription.id === presID)

        setReminder(specific)

      })
      .catch(err => setErrors(err.response.data))
  }


  const handleChange = (id, i) => (event) => {
    if (reminders[i].edited === false) {
      history.push(`prescriptions/${presID}/edit-reminders`)
    } else {
      const newreminders = [...reminders]
      newreminders[i].active = event.target.checked
      axios.put(`/api/reminders/${id}/`, { 'active': event.target.checked }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })

      setReminder(newreminders)
      setErrors({})
    }
  }



  useEffect(dataHook, [])

  const classes = useStyles()
  console.log(reminders)


  if (medicine === null || reminders === []) return <div>Loading</div>
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {medicine.name}
                </Typography>
                {reminders.map((ele, i) => {
                  return (
                    <Typography component="div" variant="caption" color="textSecondary" key={i}>
                      <Grid component="label" container alignItems="center" spacing={0}>
                        <Grid item>
                          <SwitchonOFF
                            size="small"
                            checked={ele.active || ''}
                            onChange={handleChange(ele.id, i)}
                            value="active"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                        </Grid>
                        <Grid item >
                          <Box className={classes.boxdisplay}>
                            Reminder to {ele.reminder_type}
                          </Box>
                        </Grid>
                      </Grid>
                    </Typography>
                  )
                })}

              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  <Link href={`#/prescriptions/${presID}`} color="inherit">
                    More Information
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar} >
                <EditOutlinedIcon fontSize="small" />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )

}

export default DisplayPrescriptions

