import React, { useState, useEffect } from 'react'

//Material UI
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
//Material UI our styles/icons
import { useStyles, theme } from '../../styles/styles'
import { ReminderIcon } from '../../styles/icons'
//Our Components
import getPrescriptionHook from '../getPrescriptionHook'

const AddReminder = (props) => {
  //=====================================
  // This component handles the form fields for creating a reminder
  //=====================================

  const classes = useStyles()

  const [propsData, setPropsData] = useState({})

  //===== INITIATE DATA FROM PROPS
  const setDataFromProps = () => {
    console.log('settingdata')
    //----- check params for reminderType and set to null if there is none
    const remType = !props.location.state ? null : props.location.state.reminderType
    //----- set user id from url, and reminder type as mull or reminderType as above
    setPropsData({
      ['prescriptionId']: props.match.params.id,
      ['reminderType']: remType
    })
  }

  //===== PRESCRIPTION INFO
  // can I call getPrescriptionHook here?

  //===== USE EFFECT
  useEffect(() => {
    setDataFromProps()
  }, [props])
  console.log(propsData.reminderType)

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

            <form className={classes.form}>

              <Typography component='h2' variant='h6'>
                Create reminders for 
              </Typography>
              {!propsData.reminderType &&
                <div>
                  <ButtonGroup
                    fullWidth
                    color="primary"
                    aria-label="small outlined primary button group"
                  >
                    Create a reminder to
                    <Button>Take medicine</Button>
                    <Button>Order prescription</Button>
                    <Button>Visit doctor</Button>
                  </ButtonGroup>
                </div>
              }
            </form>
          </div>

        </ThemeProvider>
      </Container>
    </div>
  )
}


export default AddReminder