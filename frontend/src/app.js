import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ResponsiveDrawer from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'

const App = () => {

  return (
    <BrowserRouter>
      <ResponsiveDrawer />
      <Switch>
        <Route exact path="/1" component={Home} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
