import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { IsAuthContext, UserContext } from '../context'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuth } = useContext(IsAuthContext)
  const { setUser } = useContext(UserContext)

  const history = useHistory()

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        try {
          const res = await fetch(`/.netlify/functions/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })

          if (res.ok) {
            const { data } = await res.json()
            localStorage.setItem('token', data.token)
            setIsAuth(true)
            setUser(data.user)
            history.push(`/`)
          }
        } catch (error) {
          // TODO HANDLE ERROR
          console.log(error)
        }
      }}
    >
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  )
}
