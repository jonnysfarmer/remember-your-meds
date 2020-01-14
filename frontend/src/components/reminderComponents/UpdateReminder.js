// eslint-disable-next-line no-unused-vars
import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

//===== UPDATE REMINDER
function updateReminder(id, data) {
  //format data for PUT
  const putData = {
    id: data.id,
    user: data.user.id,
    prescription: data.prescription.id,
    doctor: data.doctor,
    due_time: data.due_time,
    reminder_time: data.reminder_time,
    reminder_type: data.reminder_type,
    active: data.active,
    edited: true
  }

  axios.put(`/api/reminders/${id}/`, putData, {
    headers: { Authorization: `Bearer ${Auth.getToken()}` }
  })
    .then(alert('updated - do something here'))
    // .then(resp => console.log(resp.data))
    .catch(error => console.log(error.data))
}

export default updateReminder