import React from 'react'

import { Login } from '../auth'
import { StyledPage } from '../styles'

export default function LoginPage() {
  return (
    <StyledPage>
      <h1>Login Page</h1>
      <Login />
    </StyledPage>
  )
}
