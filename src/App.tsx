import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './Routes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='max-w-[1600px] mx-auto'>
      <BrowserRouter>
        <Toaster />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
