import React, { useState } from 'react'
import moment from 'moment'

//==== CALCULATE REMINDER DUE
const ReminderCalculator = (e, adjustment, doses) => {


  //----- start with today's date for dates, or the time entered for time
  const startdate = moment().format() //'now'
  // const time = e.target.value.split(':')

  //----- set the days to work back to create reminders
  const remOrder = 7 //days
  const remAppt = 14 //days
  const dosesOnPrescription = doses.number

  //--- set the responses
  let dueTime = ''
  let reminderTime = ''

  //---- calculate due & reminder date/time based on type, store in moment format that works for postgres (default moment)
  switch (e.target.name) {
    case 'order prescription': {
      dueTime = moment(startdate).add(adjustment, 'd').format()
      reminderTime = moment(startdate).add(adjustment, 'd').subtract(remOrder, 'd').format()
    }
  } return dueTime
  //   case 'make appointment': {
  //     setData({
  //       ...data,
  //       ['due_time']: moment(startdate).add((adjustment * dosesOnPrescription), 'd').format(),
  //       ['reminder_time']: moment(startdate).add((adjustment * dosesOnPrescription), 'd').subtract(remAppt, 'd').format()
  //     })
  //   } return
  //   case 'take-am': {
  //     setData({
  //       ...data,
  //       ['reminder_time']: moment().hours(time[0]).minutes(time[1]).seconds(0).format()
  //     })
  //   } return
  //   case 'take-mid': {
  //     setData({
  //       ...data,
  //       ['reminder_time']: moment().hours(time[0]).minutes(time[1]).seconds(0).format()
  //     })
  //   } return
  //   case 'take-pm': {
  //     setData({
  //       ...data,
  //       ['reminder_time']: moment().hours(time[0]).minutes(time[1]).seconds(0).format()
  //     })
  //   } return
  // }
  //----- handle if reminder_date is less than today
}

export default ReminderCalculator