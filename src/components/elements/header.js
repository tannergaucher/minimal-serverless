import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Logout } from '../auth'
import { IsAuthContext } from '../context'

const StyledHeader = styled.header`
  margin: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
`

export default function Header() {
  const { isAuth } = useContext(IsAuthContext)

  return (
    <StyledHeader>
      <Link to="/">
        <h3>CRA Lambda Demo</h3>
      </Link>
      {isAuth ? <Logout /> : <AuthLinks />}
    </StyledHeader>
  )
}

const StyledAuthLinks = styled.nav`
  display: flex;
  .nav-link {
    margin-left: 1rem;
  }
`

function AuthLinks() {
  return (
    <StyledAuthLinks>
      <Link to="/login">
        <h3 className="nav-link">Login</h3>
      </Link>
      <Link to="/signup">
        <h3 className="nav-link">Signup</h3>
      </Link>
    </StyledAuthLinks>
  )
}
