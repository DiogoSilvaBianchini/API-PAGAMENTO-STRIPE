import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import userContext from './context/userContext'
import { useState } from 'react'
function App() {
  const [token, setToken] = useState("")

  return (
    <>
      <userContext.Provider value={{token, setToken}}>
        <BrowserRouter>
          <Header auth={token}/>
          <Routes>
            <Route path="/" element={<Home />}/>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App
