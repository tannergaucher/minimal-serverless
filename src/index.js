import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './components/elements'
import * as serviceWorker from './serviceWorker'

import UserProvider from './components/context/user-context'

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
