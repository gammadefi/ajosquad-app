import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './Routes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
