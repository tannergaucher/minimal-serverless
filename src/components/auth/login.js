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
      {error && `Error! ${error.message}`}
      <form
        onSubmit={async e => {
          e.preventDefault()
          try {
            setLoading(true)
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
              setLoading(false)
              setIsAuth(true)
              history.push(`/`)
            } else {
              // 400 CLIENT SIDE ERROR
              const { error } = await res.json()
              setError(error)
              setPassword('')
            }
          } catch (error) {
            // 500 SERVER ERROR
            console.log(error)
            setError(error)
            setPassword('')
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
