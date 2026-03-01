import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppLogin from './AppLogin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppLogin />
  </StrictMode>,
)
