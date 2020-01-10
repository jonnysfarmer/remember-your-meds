import React from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

function prescriptionHook(prescriptionId) {

  const prescriptionData =
    axios.get(`/api/prescriptions/${prescriptionId}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => resp.data )
      .catch(err => console.log(err.response.data))

  return prescriptionData
}

export default prescriptionHook