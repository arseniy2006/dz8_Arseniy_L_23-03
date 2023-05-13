import React, { useState } from 'react'
import { Routes, Route } from 'react-router'
import { MainPage } from './pages/MainPage/MainPage'
import { PokeInfo } from "./pages/PokeInfo/PokeInfo"
import './App.css'

export default function App() {
  const [ theme, setTheme ] = useState('dark')

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return (
      <div className={`app ${theme}`}>

        <div className='btnBox'>
          <button className='themeBtn' onClick={toggleTheme}>Change Theme</button>
        </div>

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/PokeInfo/:id' element={<PokeInfo />} />
        </Routes>

      </div>
  )
}
