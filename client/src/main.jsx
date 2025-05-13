import { initThemeMode } from 'flowbite-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '../node_modules/flowbite/dist/flowbite.min.js';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

initThemeMode();