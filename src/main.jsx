import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './lib/i18n'; // Initialize i18n
import { LingoProvider } from '@lingo.dev/compiler/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LingoProvider>
      <App />
    </LingoProvider>
  </React.StrictMode>,
)
