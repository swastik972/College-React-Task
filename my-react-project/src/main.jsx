import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx';
import AddStudentForm from './components/AddStudentForm.jsx';
import StudentCard from './components/StudentCard.jsx';
import Badge from './components/Badge.jsx';
import Button from './components/Button.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
