import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import {AuthProvider} from "./Modules/AuthUser";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
