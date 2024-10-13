import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import userContext from './context/userContext'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react'

function App() {
  const [token, setToken] = useState("")
  const [bodyTemp, setBodyTemp] = useState("")

  return (
    <>
      <userContext.Provider value={{token, setToken, bodyTemp, setBodyTemp}}>
        <GoogleOAuthProvider clientId='1008356340177-4l66g4ee122vig6cn0bms7g6k5kp88rl.apps.googleusercontent.com'>
          <BrowserRouter>
            <Header auth={token}/>
            <Routes>
              <Route path="/" element={<Home />}/>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </userContext.Provider>
    </>
  )
}

export default App
