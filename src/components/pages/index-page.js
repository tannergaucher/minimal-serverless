import React, { useContext } from 'react'

import { StyledPage } from '../styles'
import { UserContext } from '../context'

export default function IndexPage() {
  const { user } = useContext(UserContext)

  return (
    <StyledPage>
      <h1>Index Page</h1>
      {user ? `${user.email}` : `No authed user`}
    </StyledPage>
  )
}
