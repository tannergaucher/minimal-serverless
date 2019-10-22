import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { IsAuthContext, UserContext } from '../context'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setIsAuth } = useContext(IsAuthContext)
  const { setUser } = useContext(UserContext)

  const history = useHistory()

  return (
    <fieldset disabled={loading}>
      <form
        onSubmit={async e => {
          e.preventDefault()
          try {
            setLoading(true)
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
              setLoading(false)
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
    </fieldset>
  )
}
