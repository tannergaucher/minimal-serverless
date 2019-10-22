import React, { useContext } from 'react'

import { IsAuthContext, UserContext } from '../context'

export default function Logout() {
  const { setIsAuth } = useContext(IsAuthContext)
  const { setUser } = useContext(UserContext)

  return (
    <button
      onClick={() => {
        localStorage.removeItem('token')
        setIsAuth(false)
        setUser(null)
      }}
    >
      Logout
    </button>
  )
}
