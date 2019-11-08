import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Header, Main, Footer } from '.'
import IsAuthContextProvider from '../context/is-auth-context'
import UserProvider from '../context/user-context'

export default function App() {
  return (
    <IsAuthContextProvider>
      <UserProvider>
        <Router>
          <Header />
          <Main />
          <Footer />
        </Router>
      </UserProvider>
    </IsAuthContextProvider>
  )
}
