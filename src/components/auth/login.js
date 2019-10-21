import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
            // set data.user to user context
            localStorage.setItem('token', data.token)
          }
          setEmail('')
          setPassword('')
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
