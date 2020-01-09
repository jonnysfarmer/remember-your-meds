import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom'

import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'

const App = () => {


  return (
    <HashRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </HashRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
