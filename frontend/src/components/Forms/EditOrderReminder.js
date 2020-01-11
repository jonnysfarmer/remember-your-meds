import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'

import Box from '@material-ui/core/Box'
import { red, green } from '@material-ui/core/colors'

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
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }

  }
}))
const SwitchOnOFF = withStyles({
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



const EditOrderReminder = (props) => {

  const classes = useStyles()

  const [propsData, setPropsData] = useState({})
  const [data, setData] = useState()
  const [errors, setErrors] = useState()

  //===== INITIATE DATA FROM PROPS
  const setDataFromProps = () => {
    // setPropsData(props.props.propsData)
    setData(props.props.propsData)
  }


  //===== STORE FORM FIELD VALUES
  const handleChange = (e) => {
    if (e.target.name === 'active') {
      const remState = (data.active = !data.active)
      setData({ ...data, [e.target.name]: remState })

      if (remState === true) {
        calcReminderDue()
      }
    }
    setErrors({})
  }

  //==== CALCULATE REMINDER DUE
  const calcReminderDue = () => {
    const startdate = moment()
    const t = moment(startdate, "DD-MM-YYYY").add(5, 'days').format('DD/MM/YYYY')
    console.log(t)
  }


  //===== USE EFFECT
  useEffect(() => {
    setDataFromProps()
  }, [props])


  if (!data) return <div>loading</div>
  console.log(data)
  return (
    <form className={classes.form}>
      <Typography component='h2' variant='h6'>
        Order a prescription
      </Typography>

      <Typography component="div" variant="caption" color="textSecondary">
        <Grid component="label" container alignItems="center" spacing={0}>
          <Grid item>
            <SwitchOnOFF
              size="small"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              name='active'
              value={data.active}
              onChange={e => handleChange(e)}
            />
          </Grid>
          <Grid item>
            <Box className={classes.boxdisplay}>
              Reminder to order medicine {data.active === false && 'inactive'}
              {data.active === true && ' will be sent on'}
            </Box>
          </Grid>
        </Grid>
      </Typography>

    </form>

  )
}

export default EditOrderReminder