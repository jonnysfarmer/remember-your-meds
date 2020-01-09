import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter } from 'react-router-dom'

import ResponsiveDrawer from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'


//STYLES FOR OVERWRITING MATERIAL UI
import './styles/main.css'

const App = () => {

  return (
    <HashRouter>
      <ResponsiveDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </HashRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
