import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { IsAuthContext } from '../context'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuth } = useContext(IsAuthContext)
  const history = useHistory()

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        try {
          const res = await fetch(`/.netlify/functions/login`, {
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
            console.log(data)
            localStorage.setItem('token', data.token)
            // set data.user to user context
            setIsAuth(true)
            history.push(`/`)
          }
        } catch (error) {
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

      <button type="submit">Login</button>
    </form>
  )
}
