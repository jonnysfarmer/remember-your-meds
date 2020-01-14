// eslint-disable-next-line no-unused-vars
import React from 'react'
import Auth from '../lib/auth'
import Home from './Home'
import { useHistory } from 'react-router-dom'

function Logout(props) {
  // console.log(props)
  const history = useHistory()
  Auth.logout()
  history.push('/')

  return (
    <div></div>
  )
  
}

export default Logout



