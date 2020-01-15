import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter } from 'react-router-dom'

import ResponsiveDrawer from './components/Navbar'
import Home from './components/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Prescriptions from './components/pages/Prescriptions'
import Prescription from './components/pages/Prescription'
import Profile from './components/pages/Profile'
import Logout from './components/Logout'
import EditProfile from './components/pages/EditProfile'
import CreatePrescription from './components/pages/CreatePrescription2'
import EditPrescription from './components/pages/EditPrescription'
import EditReminder from './components/pages/EditReminder'


//STYLES FOR OVERWRITING MATERIAL UI
import './styles/main.css'

const App = () => {


  return (
    <HashRouter>
      <ResponsiveDrawer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/prescriptions" component={Prescriptions} />
        <Route exact path='/prescriptions/create' component={CreatePrescription} />
        <Route exact path="/prescriptions/:id" component={Prescription} />
        <Route exact path="/prescriptions/:id/edit" component={EditPrescription} />
        <Route exact path="/prescriptions/:id/edit-reminders" component={EditReminder} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/profile/edit' component={EditProfile} />
        <Route exact path='/logout' component={Logout} />
      </Switch>
    </HashRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
