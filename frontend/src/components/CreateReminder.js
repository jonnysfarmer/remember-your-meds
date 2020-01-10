import React from 'react'
import axios from 'axios'

const CreateReminder = () => {

  // ORDER PRESCRIPTION
  // user turns on
  // user needs to enter number of days doses left in their cupboard
  // user needs to confirm how many repeats they have left
  // we calc TODAY - number_days_doses_left - 7 
    // if that is <= today, alert user to order prescription now & update their repeats
    // if that is >today, we set that as reminder_time: date 09:00:00 and reminder_type: order prescription (this type is sent daily at 9am)

  //NOTE when we remind user to order a prescription we need to update the calc, so make sure that's a seperate component
  //that component will take number_days_doses from dB




  return (
    <>
    </>
  )

}

export default CreateReminder



  // MAKE DOCTORS APPT
  //similar to order prescription, do that first


  // TAKE YOUR MED
  // user needs to enter the times to take it
  // we store that in our database

