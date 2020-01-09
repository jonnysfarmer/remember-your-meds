import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter } from 'react-router-dom'

import ResponsiveDrawer from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
<<<<<<< HEAD
=======
import Prescriptions from './components/Prescriptions'
>>>>>>> development
import CreatePrescription from './components/CreatePrescription'


//STYLES FOR OVERWRITING MATERIAL UI
import './styles/main.css'

const App = () => {

  return (
    <HashRouter>
      <ResponsiveDrawer />
      <Switch>
<<<<<<< HEAD
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/prescriptions' component={Login} />
=======
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/prescriptions" component={Prescriptions} />
>>>>>>> development
        <Route exact path='/prescriptions/create' component={CreatePrescription} />
      </Switch>
    </HashRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
