import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Register from './components/Register'

const App = () => {


  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/1" component={Home} />
        <Route exact path="/" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
