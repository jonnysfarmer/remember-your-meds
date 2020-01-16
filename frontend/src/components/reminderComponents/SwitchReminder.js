// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

const SwitchReminder = (e, i, data) => {

  //get the id as a number
  const split = e.target.id.split('_')
  const id = parseInt(split[1])

  //change the state to the opposite
  const tempData = [...data]
  tempData[i].active = e.target.checked
  
  //put the status change to the db
  axios.put(`/api/reminders/${id}/`, { 'active': e.target.checked }, {
    headers: { Authorization: `Bearer ${Auth.getToken()}` }
  })
    .catch(error => console.log(error))

  //return the new state
  return tempData
}

export default SwitchReminder