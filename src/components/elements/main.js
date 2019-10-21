import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginPage, SignupPage, IndexPage } from '../pages'

export default function Main() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/">
            <IndexPage />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}
