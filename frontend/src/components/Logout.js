// eslint-disable-next-line no-unused-vars
import React from 'react'
import Auth from '../lib/auth'
import Home from './Home'

function Logout(props) {
  // console.log(props)
  Auth.logout()
  return (
    <Home />
  )
  
}

export default Logout



