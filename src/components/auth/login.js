import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { IsAuthContext, UserContext } from '../context'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setIsAuth } = useContext(IsAuthContext)
  const { setUser } = useContext(UserContext)
  const history = useHistory()

  return (
    <fieldset disabled={loading}>
      {error && `${error.message}`}
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
              localStorage.setItem('token', data.token)
              setUser(data.user)
              setIsAuth(true)
              history.push(`/`)
            }
          } catch (error) {
            setError(error)
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
    </fieldset>
  )
}
