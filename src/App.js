import React, { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1>App</h1>
      <h4>Sign up</h4>

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
              console.log(data)
            } else {
              throw new Error(`Network response not ok`)
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
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
