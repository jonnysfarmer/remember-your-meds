// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

const SwitchReminder = (e, i, data) => {

  //get the id as a number
  const split = e.target.id.split('_')
  const id = parseInt(split[1])

  //change the state to the opposite
  const state = e.target.active = !e.target.active
  const tempData = [...data]
  tempData[i].active = state
  
  //put the status change to the db
  axios.put(`/api/reminders/${id}/`, { 'active': state }, {
    headers: { Authorization: `Bearer ${Auth.getToken()}` }
  })
    //return our new data
    .then(resp => console.log(resp.data))
    .catch(error => console.log(error))

  //return the new state
  console.log(tempData)
  return tempData
}

export default SwitchReminder