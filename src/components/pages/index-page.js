import React, { useContext } from 'react'

import { StyledPage } from '../styles'
import { UserContext } from '../context'

export default function IndexPage() {
  const { loading, error, user } = useContext(UserContext)

  return (
    <StyledPage>
      <h1>Index Page</h1>
      {loading && `Loading user...`}
      {error && `Error: ${error.message}`}
      {user ? `${user.email}` : `No authed user`}
    </StyledPage>
  )
}
