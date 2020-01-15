// eslint-disable-next-line no-unused-vars
import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

//===== UPDATE REMINDER
function updateReminder(data) {
  //data may come in as a single object, or as an array of objects so we have to handle both scenarios

  if (!Array.isArray(data)) {
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
    axios.put(`/api/reminders/${putData.id}/`, putData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => console.log(resp.data))
      .catch(error => console.log(error.data))
  } else {
    data.map(e => {
      const putData = {
        id: e.id,
        user: e.user.id,
        prescription: e.prescription.id,
        doctor: e.doctor,
        due_time: e.due_time,
        reminder_time: e.reminder_time,
        reminder_type: e.reminder_type,
        active: e.active,
        edited: true
      }
      axios.put(`/api/reminders/${putData.id}/`, putData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(resp => console.log(resp.data))
        .catch(error => console.log(error.data))
    })
    return 'update done'
  }
}

export default updateReminder